const ORDER = require('../models/OrderModel');
const ID_GENERATOR = require('../services/IDGenerator');
var ObjectId = require('mongoose').Types.ObjectId;

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
            } else{
                response.push(order);
            }
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
        const orderID = req.params.orderID;
        const { userID, role } = req;

        let query = { orderID: orderID };

        if (role !== 'admin') {
            query.userID = userID;
        }

        const response = await ORDER.findOne(query)
            .populate({
                path: "userID",
                select: "-isAdmin -userPassword -userID -userPhone -userAddress -createdAt -updatedAt -__v"
            })
            .populate({
                path: "orderFirstBook",
                select: "-bookAuthor -bookPublisher -bookSold -bookStock -bookWeight -bookSize -bookIntroduction -bookkPrice -booID -__v -createdAt -updatedAt"
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
        console.log(req);
        let orderID = ID_GENERATOR.IDOrder();
        while (await ORDER.findOne({ orderID })) {
            orderID = ID_GENERATOR.IDOrder();
        }

        const newOrder = await ORDER.create({
            orderID: orderID,
            userID: req.userID,
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
        const orderID = req.params;
        const { orderStatus } = req.body;

        let order = await ORDER.findOne(orderID);

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
    getAllOrder, getOrder, createOrder, updateOrderStatus
};
