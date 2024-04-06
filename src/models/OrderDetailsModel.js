const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderDetailSchema = new Schema({
    orderID: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    orderItem: [{
        bookID: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
        quantity: { type: Number, required: true },
    }]
},
{
    timestamps: true,
});

module.exports = mongoose.model('OrderDetail', orderDetailSchema);
