const ORDER_DETAILS = require('../models/OrderDetailsModel');

const getAllOrderDetails = async (req, res) => {
    try {
        let query = {};

        const { userID, role } = req;
        if (role === 'admin') {
            query = {};
        } else {
            query = { userID: userID };
        }

        let response = await ORDER_DETAILS.find(query).populate('orderID');

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
        const { userID, role } = req;

        let query = { orderID: orderID };

        if (role !== 'admin') {
            query.userID = userID;
        }

        console.log(query)
        let response = await ORDER_DETAILS.findOne(query).populate('orderID');
        console.log(response)

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
