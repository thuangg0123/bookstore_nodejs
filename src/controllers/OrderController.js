const Order = require('../models/order');
const Book = require('../models/book');

const getAllOrders = async (req, res) => {
    try {
        let query = {};

        const { userId, role } = req;
        if (role === 'admin') {
            query = {};
        } else {
            query = { userID: userId };
        }

        let response = await Order.find(query)
            .populate({
                path: "userID",
                select: "-isAdmin -userPassword -createdAt -updatedAt -__v"
            })
            .populate({
                path: "books.bookID",
                select: "-tacGia -bookPublisher -bookSold -bookStock -bookWeight -bookSize -bookIntroduction -__v -createdAt -updatedAt"
            });

        return res.status(200).json({
            success: response ? true : false,
            data: response ? response : []
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred, please try again later...",
            error: error.message
        });
    }
};

const getOneOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const { userId, role } = req;

        let query = { _id: orderId };

        if (role !== 'admin') {
            query.userID = userId;
        }

        const response = await Order.findOne(query)
            .populate({
                path: "userID",
                select: "-isAdmin -userPassword -createdAt -updatedAt -__v"
            })
            .populate({
                path: "books.bookID",
                select: "-bookAuthor -bookPublisher -bookSold -bookStock -bookWeight -bookSize -bookIntroduction -__v -createdAt -updatedAt"
            });

        if (!response) {
            return res.status(404).json({
                success: false, message: 'Order not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: response
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An error occurred, please try again later...',
            error: error.message
        });
    }
};

const createOrder = async (req, res) => {
    try {
        const data = req.body;
        if (!data.books || data.books.length === 0) {
            throw new Error("Product list cannot be empty");
        }

        let totalPrice = 0;
        let totalItems = 0;
        for (const item of data.books) {
            const book = await Book.findById(item.bookID);
            if (!book) {
                throw new Error(`Book with ID: ${item.bookID} not found`);
            }
            totalPrice += item.quantity * book.price;
            totalItems += item.quantity;
        }

        const newOrder = await Order.create({
            ...data,
            orderTotal: totalPrice,
            orderItemQuantity: totalItems,
            userID: req.userId
        });

        const populatedOrder = await Order.findById(newOrder._id)
            .populate({
                path: "books.bookID",
                select: "-bookAuthor -bookPublisher -bookSold -bookStock -bookWeight -bookSize -bookIntroducion -__v -createdAt -updatedAt"
            });

        return res.status(200).json({
            success: true,
            data: populatedOrder
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An error occurred, please try again later...',
            error: error.message
        });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const { orderStatus } = req.body;

        if (!orderStatus) {
            throw new Error("Please provide a new status for the order");
        }

        let order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        order.orderStatus = orderStatus;
        await order.save();

        return res.status(200).json({
            success: true,
            message: "Order status updated successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred, please try again later...",
            error: error.message
        });
    }
};

module.exports = {
    getAllOrders, getOneOrder, createOrder, updateOrderStatus
};
