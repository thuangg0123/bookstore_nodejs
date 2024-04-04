const Sach = require('../models/sach');

const getAllBooks = async (req, res) => {
    try {
        const response = await Sach.find().select("-__v");
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

const getOneBook = async (req, res) => {
    try {
        const { idSach } = req.params;
        const response = await Sach.findById(idSach).select("-__v");
        return res.status(200).json({
            success: response ? true : false,
            message: response ? `Successfully retrieved book with id: ${idSach}` : `Error while retrieving book with id: ${idSach}`,
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
    const { idSach } = req.params;
    try {
        const response = await Sach.findByIdAndDelete(idSach);
        return res.status(200).json({
            success: response ? true : false,
            data: response ? `Successfully deleted book with id: ${idSach}` : `Unable to delete book with id: ${idSach}`
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
    const { idSach } = req.params;
    const { ID, ten, hinhAnh, tacGia, nhaXuatBan, gia, daBan, tonKho, trongLuong, kichThuoc, gioiThieu } = req.body;

    try {
        if (!idSach) {
            return res.status(404).json({
                success: false,
                message: `Book with id: ${idSach} not found`
            });
        }

        if (!ID || !ten || !hinhAnh || !tacGia || !gia || !tonKho) {
            return res.status(400).json({ success: false, message: 'Please provide complete book information for updating' });
        }

        const response = await Sach.findByIdAndUpdate(idSach, {
            ID, ten, hinhAnh, tacGia, nhaXuatBan, gia, daBan, tonKho, trongLuong, kichThuoc, gioiThieu
        }, { new: true });

        return res.status(200).json({
            success: true,
            data: response ? response : [],
            message: `Successfully updated book information with id: ${idSach}`
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the book",
            error: error.message
        });
    }
};

const createBook = async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            throw new Error("Body cannot be empty")
        }

        const existingBook = await Sach.findOne({ ID: req.body.ID });
        if (existingBook) {
            throw new Error("ID already exists in the data");
        }

        const newBook = await Sach.create(req.body);

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
        const { idSach } = req.params;
        if (!req.files || req.files.length === 0) {
            throw new Error("No images uploaded");
        }

        const imagesPaths = req.files.map(file => file.path.replace(/\\/g, '/'));
        const response = await Sach.findByIdAndUpdate(idSach, {
            $push: { images: { $each: imagesPaths } },
            hinhAnh: imagesPaths[0]
        }, { new: true });

        return res.status(200).json({
            success: true,
            message: `Successfully updated images for book with id: ${idSach}`,
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
    getAllBooks, getOneBook, deleteBook, updateBook, createBook, uploadBookImage
};
