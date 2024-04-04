const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new mongoose.Schema({
    orderID: { type: String, required: true, unique: true },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
    orderTime: { type: Date, default: Date.now },
    orderStatus: { type: Number, default: 0 },
    books: [
        {
            bookID: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
            quantiy: { type: Number, required: true },
        }
    ],
    orderTotal: { type: Number, required: true },
    orderItemQuantity: { type: Number, required: true },
    orderPhone: { type: String, required: true },
    orderAddress: { type: String, required: true }
}, {
    timestamps: true,
});

// Export the model
module.exports = mongoose.model('Order', OrderSchema);
