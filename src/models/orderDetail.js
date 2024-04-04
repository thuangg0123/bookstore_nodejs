const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderDetailSchema = new mongoose.Schema({
    orderID: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
},
    {
        timestamps: true,
    });

module.exports = mongoose.model('OrderDetail', OrderDetailSchema);
