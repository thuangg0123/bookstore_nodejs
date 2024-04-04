const BOOK = require('../models/Book');

const getAllBooks = async (req, res) => {
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
        const { bookIDParams } = req.params;
        const response = await BOOK.findById(bookIDParams).select("-__v");
        return res.status(200).json({
            success: response ? true : false,
            message: response ? `Successfully retrieved book with id: ${bookIDParams}` : `Error while retrieving book with id: ${bookIDParams}`,
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
    const { bookIDParams } = req.params;
    try {
        const response = await BOOK.findByIdAndDelete(bookIDParams);
        return res.status(200).json({
            success: response ? true : false,
            data: response ? `Successfully deleted book with id: ${bookIDParams}` : `Unable to delete book with id: ${bookIDParams}`
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
    const { bookIDParams } = req.params;
    const { bookID, bookName, bookImage, bookAuthor, bookPublisher, bookPrice, bookSold, bookStock, bookWeight, bookSize, bookIntroducion } = req.body;

    try {
        if (!bookIDParams) {
            return res.status(404).json({
                success: false,
                message: `Book with id: ${bookIDParams} not found`
            });
        }

        if (!bookID || !bookName || !bookImage || !bookAuthor || !bookPrice || !bookStock) {
            return res.status(400).json({ success: false, message: 'Please provide complete book information for updating' });
        }

        const response = await BOOK.findByIdAndUpdate(bookIDParams, {
            bookID, bookName, bookImage, bookAuthor, bookPublisher, bookPrice, bookSold, bookStock, bookWeight, bookSize, bookIntroducion
        }, { new: true });

        return res.status(200).json({
            success: true,
            data: response ? response : [],
            message: `Successfully updated book information with id: ${bookIDParams}`
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
        if (Object.keys(req.body).length === 0) {
            throw new Error("Body cannot be empty")
        }

        const existingBook = await BOOK.findOne({ bookID: req.body.bookID });
        if (existingBook) {
            throw new Error("ID already exists in the data");
        }

        const newBook = await BOOK.create(req.body);

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
        const { bookIDParams } = req.params;
        if (!req.files || req.files.length === 0) {
            throw new Error("No images uploaded");
        }

        const imagesPaths = req.files.map(file => file.path.replace(/\\/g, '/'));
        const response = await BOOK.findByIdAndUpdate(bookIDParams, {
            $push: { images: { $each: imagesPaths } },
            bookImage: imagesPaths[0]
        }, { new: true });

        return res.status(200).json({
            success: true,
            message: `Successfully updated images for book with id: ${bookIDParams}`,
            data: response
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while uploading book images",
            error: error.message
        });
    }
};

module.exports = {
    getAllBooks, getBook, deleteBook, updateBook, addBook, uploadBookImage
};
