const ORDER_DETAILS = require('../models/OrderDetailsModel');
const BOOK = require('../models/BookModel');

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
        const data = req.body;
        const orderItemTemp = data.orderItem;

        let orderItemList = [];

        for (const item of orderItemTemp) {
            const bookID = item.bookID;
            const bookResponse = await BOOK.findOne({ bookID });

            const orderItem = {
                bookID: bookResponse._id,
                quantity: parseInt(item.quantity)
            };

            orderItemList.push(orderItem);
        }


        const orderDetails = {
            orderID: data.orderID,
            orderItem: orderItemList
        }

        const response = await ORDER_DETAILS.create(orderDetails);

        return res.status(200).json({
            success: true,
            data: response
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
    createOrderDetails, getOrderDetails
};
