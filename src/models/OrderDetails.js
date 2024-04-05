const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderDetailSchema = new Schema({
    _id: false,
    orderID: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    orderItem: [{
        bookID: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
        quantiy: { type: Number, required: true },
    }]
},
    {
        timestamps: true,
    });

module.exports = mongoose.model('OrderDetail', orderDetailSchema);
