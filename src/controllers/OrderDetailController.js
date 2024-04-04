const OrderDetail = require('../models/orderDetail');

const getAllOrderDetail = async (req, res) => {
    try {
        let query = {};

        const { userId, role } = req;
        if (role === 'admin') {
            query = {};
        } else {
            query = { userID: userId };
        }

        let response = await OrderDetail.find(query).populate('orderID');

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

const getOneOrderDetail = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { userId, role } = req;

        let query = { orderID: orderId };

        if (role !== 'admin') {
            query.userID = userId;
        }

        let response = await OrderDetail.findOne(query).populate('orderID');

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

const createOrderDetail = async (req, res) => {
    try {
        const { userId } = req;
        if (!userId) {
            return res.status(403).json({
                success: false,
                message: "You need to login to perform this action"
            });
        }

        const data = req.body;
        data.userID = userId;

        const response = await OrderDetail.create(data);

        const populatedResponse = await OrderDetail.findById(response._id)
            .populate({
                path: 'orderID',
                select: '-__v -createdAt -updatedAt -userID'
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
    getAllOrderDetail, createOrderDetail, getOneOrderDetail
};
