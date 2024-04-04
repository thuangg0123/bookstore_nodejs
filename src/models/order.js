const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    orderID: { type: String, required: true, unique: true },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
    orderTime: { type: Date, default: Date.now },
    orderStatus: { type: Number, default: 0 },
    orderFirstBookID: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    orderTotal: { type: Number, required: true },
    orderItemQuantity: { type: Number, required: true },
    orderPhone: { type: String, required: true },
    orderAddress: { type: String, required: true }
}, {
    timestamps: true,
});

// Export the model
module.exports = mongoose.model('Order', orderSchema);
