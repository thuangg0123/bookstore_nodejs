const ORDER = require('../models/OrderModel');
const BOOK = require('../models/BookModel');
const ID_GENERATOR = require('../services/IDGenerator');

const getAllOrder = async (req, res) => {
    try {
        const { userID, role } = req;

        let orderData = await ORDER.find()
            .populate({
                path: "userID",
                select: "-isAdmin -userPassword -userID -userPhone -userAddress -createdAt -updatedAt -__v"
            })
            .populate({
                path: "orderFirstBook",
                select: "-bookAuthor -bookPublisher -bookSold -bookStock -bookWeight -bookSize -bookIntroduction -bookPrice -bookID -__v -createdAt -updatedAt"
            });

        const response = [];
        orderData.forEach(order => {
            if (role === 'user') {
                if (order.userID._id.toString() === userID) {
                    response.push(order);
                }
            } else {
                response.push(order);
            }
        });
        response.sort((a, b) => b.orderTime - a.orderTime);

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

const createOrder = async (req, res) => {
    try {
        const orderData = req.body;

        let orderID = ID_GENERATOR.IDOrder();
        while (await ORDER.findOne({ orderID })) {
            orderID = ID_GENERATOR.IDOrder();
        }

        const bookID = orderData.orderFirstBook;
        const bookResponse = await BOOK.findOne({ bookID });

        let orderStatus = 0;
        if (orderData.orderStatus != "cod") {
            orderStatus = 1
        }

        const newOrder = await ORDER.create({
            orderID: orderID,
            userID: req.userID,
            orderTime: new Date(),
            orderStatus: orderStatus,
            orderFirstBook: bookResponse._id,
            orderTotal: orderData.orderTotal,
            orderItemQuantity: orderData.orderItemQuantity,
            orderPhone: orderData.orderPhone,
            orderAddress: orderData.orderAddress
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
        const orderID = req.params;
        const { orderStatus } = req.body;

        let order = await ORDER.findOne(orderID);

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
    getAllOrder, createOrder, updateOrderStatus
};
