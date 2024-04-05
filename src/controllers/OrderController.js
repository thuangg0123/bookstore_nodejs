const ORDER = require('../models/Order');
const BOOK = require('../models/Book');

const getAllOrders = async (req, res) => {
    try {
        let query = {};

        const { userId, role } = req;
        if (role === 'admin') {
            query = {};
        } else {
            query = { userID: userId };
        }

        let response = await ORDER.find(query)
            .populate({
                path: "userID",
                select: "-isAdmin -userPassword -createdAt -updatedAt -__v"
            })
            .populate({
                path: "orderFirstBook",
                select: "-bookAuthor -bookPublisher -bookSold -bookStock -bookWeight -bookSize -bookIntroduction -__v -createdAt -updatedAt"
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

const getOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const { userId, role } = req;

        let query = { _id: orderId };

        if (role !== 'admin') {
            query.userID = userId;
        }

        const response = await ORDER.findOne(query)
            .populate({
                path: "userID",
                select: "-isAdmin -userPassword -createdAt -updatedAt -__v"
            })
            .populate({
                path: "orderFirstBook",
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
        if (!data.orderFirstBook) {
            throw new Error("Product list cannot be empty");
        }

        const newOrder = await ORDER.create({
            // orderID: generateOrderID(),
            orderID: data.orderID,
            userID: req.userId,
            orderTime: new Date(),
            orderStatus: 0,
            orderFirstBook: data.orderFirstBook,
            orderTotal: data.orderTotal,
            orderItemQuantity: data.orderItemQuantity,
            orderPhone: data.orderPhone,
            orderAddress: data.orderAddress
        });

        const populatedOrder = await ORDER.findById(newOrder._id)
            .populate({
                path: "orderFirstBook",
                select: "-bookAuthor -bookPublisher -bookSold -bookStock -bookWeight -bookSize -bookIntroduction -__v -createdAt -updatedAt"
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

        let order = await ORDER.findById(orderId);

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
    getAllOrders, getOrder, createOrder, updateOrderStatus
};
