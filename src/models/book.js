const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookSchema = new mongoose.Schema({
    bookID: { type: String, required: true },
    bookName: { type: String, required: true },
    bookImage: { type: String, required: true },
    bookAuthor: { type: String, required: true },
    bookPublisher: { type: String },
    bookPrice: { type: Number, required: true, min: 0 },
    bookSold: { type: Number, default: 0 },
    bookStock: { type: Number, required: true, min: 0 },
    bookWeight: { type: Number },
    bookSize: { type: String },
    bookIntroducion: { type: String }
}, {
    timestamps: true,
});


//Export the model
module.exports = mongoose.model('Book', BookSchema);
