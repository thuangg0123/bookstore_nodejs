const BOOK = require('../models/BookModel');
const ID_GENERATOR = require('../services/IDGenerator');

const getAllBook = async (req, res) => {
    try {
        const response = await BOOK.find().select("-__v");
        return res.status(200).json({
            success: response ? true : false,
            message: response ? "Successfully retrieved all books" : "Error while retrieving all books",
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

const getBook = async (req, res) => {
    try {
        const { bookID } = req.params;
        const response = await BOOK.findOne({ bookID }).select("-__v");
        return res.status(200).json({
            success: response ? true : false,
            message: response ? `Successfully retrieved book with id: ${bookID}` : `Error while retrieving book with id: ${bookID}`,
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

const deleteBook = async (req, res) => {
    const { bookID } = req.params;
    try {
        const response = await BOOK.findOneAndDelete({ bookID });
        return res.status(200).json({
            success: response ? true : false,
            data: response ? `Successfully deleted book with id: ${bookID}` : `Unable to delete book with id: ${bookID}`
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the book",
            error: error.message
        });
    }
};

const updateBook = async (req, res) => {
    const { bookID } = req.params;
    const { bookName, bookImage, bookAuthor, bookPublisher, bookPrice, bookSold, bookStock, bookWeight, bookSize, bookIntroduction } = req.body;

    try {
        const response = await BOOK.findOneAndUpdate(
            { bookID: bookID },
            { bookID, bookName, bookImage, bookAuthor, bookPublisher, bookPrice, bookSold, bookStock, bookWeight, bookSize, bookIntroduction },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            data: response ? response : [],
            message: `Successfully updated book information with id: ${bookID}`
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the book",
            error: error.message
        });
    }
};

const addBook = async (req, res) => {
    try {
        let bookID = ID_GENERATOR.IDBook();
        while (await BOOK.findOne({ bookID })) {
            bookID = ID_GENERATOR.IDBook();
        }

        req.body.bookID = bookID;

        if (!req.body.bookPublisher) req.body.bookPublisher = "Không rõ";
        if (!req.body.bookWeight) req.body.bookWeight = 0.0;
        if (!req.body.bookSize) req.body.bookSize = "0x0cm";

        const newBook = new BOOK({
            bookID: req.body.bookID,
            bookName: req.body.bookName,
            bookImage: "/img/product/Image_not_available.png",
            bookAuthor: req.body.bookAuthor,
            bookPrice: req.body.bookPrice,
            bookStock: req.body.bookStock,
            bookIntroduction: req.body.bookIntroduction,
            bookPublisher: req.body.bookPublisher,
            bookSold: 0,
            bookWeight: req.body.bookWeight,
            bookSize: req.body.bookSize,
        });

        await newBook.save();

        return res.status(200).json({
            success: newBook ? true : false,
            dataProduct: newBook ? newBook : 'Unable to add book'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while adding the book",
            error: error.message
        });
    }
};

const uploadBookImage = async (req, res) => {
    try {
        const { bookID } = req.params;
        const fileName = req.files[0].filename;
        const imagesPaths = `/img/product/${fileName}`;

        const book = await BOOK.findById(bookID);
        book.bookImage = imagesPaths;
        await book.save();

        return res.status(200).json({
            success: true,
            message: `Successfully updated images for book with id: ${bookID}`,
            data: book
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while uploading book images",
            error: error.message
        });
    }
};

const searchBooks = async (req, res) => {
    try {
        const { query } = req.query;

        const regex = new RegExp(query, 'i')

        const response = await BOOK.find({
            $or: [
                { bookName: regex }
            ]
        })

        res.json(response);
    } catch (error) {
        console.error('Error searching books:', error);
        res.status(500).json({ error: 'Error searching books' });
    }
}

module.exports = {
    getAllBook, getBook, deleteBook, updateBook, addBook, uploadBookImage, searchBooks
};
