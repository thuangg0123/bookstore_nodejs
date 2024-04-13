// test.js
const mongoose = require('mongoose');
const dbConnect = require('./dbConnect');
const Order = require('../models/OrderModel');

const addData = async () => {
    try {
        await dbConnect();

        const newOrder = new Order({
            orderID: "123456789",
            userID: "60b514d31234567890abcdef",
            orderTime: new Date(),
            orderStatus: 0,
            orderFirstBook: "60b514d31234567890abcdef",
            orderTotal: 100000,
            orderItemQuantity: 2,
            orderPhone: "0123456789",
            orderAddress: "123 Đường ABC, Quận XYZ, Thành phố HCM"
        });

        const savedOrder = await newOrder.save();
        console.log("Đã thêm đơn hàng mới:");
        console.log(savedOrder);
    } catch (error) {
        console.error("Lỗi khi thêm dữ liệu:");
        console.error(error);
    } finally {
        mongoose.connection.close();
    }
};

addData();
