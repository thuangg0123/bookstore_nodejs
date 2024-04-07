const ORDER_DETAILS = require('../models/OrderDetailsModel');

const getAllOrderDetails = async (req, res) => {
    try {
        const { userID, role } = req;

        let orderData = await ORDER_DETAILS.find().populate('orderID');

        const response = [];

        if (role === 'user') {
            orderData.forEach(order => {
                if (order.orderID.userID.toString() === userID) {
                    response.push(order);
                }
            });
        }

        return res.status(200).json({
            success: true,
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

const getOrderDetails = async (req, res) => {
    try {
        const { orderID } = req.params;

        let orderData = await ORDER_DETAILS.find()
        .populate({
            path: 'orderID',
            populate: {
                path: 'userID'
            }
        })
        .populate({
            path: "orderItem.bookID",
            select: "-bookID -bookStock -bookAuthor -bookPublisher -bookIntroduction -bookSold -bookWeight -bookSize -createdAt -updatedAt -__v"
        });

        let response;

        orderData.forEach(order => {
            if (order.orderID.orderID.toString() === orderID) {
                response = order;
                return;
            }
        });

        if (!response) {
            return res.status(404).json({
                success: false,
                message: 'Detail order not found'
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


const createOrderDetails = async (req, res) => {
    try {
        const { userID } = req;
        if (!userID) {
            return res.status(403).json({
                success: false,
                message: "You need to login to perform this action"
            });
        }

        const data = req.body;
        console.log(data)

        const response = await ORDER_DETAILS.create(data);
        console.log(response)

        const populatedResponse = await ORDER_DETAILS.findById(response._id)
            .populate({
                path: 'orderItem.bookID',
                select: '-__v -createdAt -updatedAt'
            });

        return res.status(200).json({
            success: true,
            data: populatedResponse
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
    getAllOrderDetails, createOrderDetails, getOrderDetails
};
