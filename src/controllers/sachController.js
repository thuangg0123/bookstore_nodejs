const Sach = require('../models/sach')

const getAllSachs = async (req, res) => {
    try {
        const response = await Sach.find().select("-__v")
        return res.status(200).json({
            success: response ? true : false,
            message: response ? "Lấy ra tất cả sách thành công" : "Lỗi khi lấy ra tất cả sách",
            data: response ? response : []
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Có lỗi, vui lòng thử lại sau ...",
            error: error.message
        });
    }
}

const getOneSach = async (req, res) => {
    try {
        const { idSach } = req.params
        const response = await Sach.findById(idSach).select("-__v")
        return res.status(200).json({
            success: response ? true : false,
            message: response ? `Lấy ra sách có id: ${idSach} thành công` : `Lỗi khi lấy ra sách có id: ${idSach}`,
            data: response ? response : []
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Có lỗi, vui lòng thử lại sau ...",
            error: error.message
        });
    }
}

const deleteSach = async (req, res) => {
    const { idSach } = req.params;
    try {
        const response = await Sach.findByIdAndDelete(idSach);
        return res.status(200).json({
            success: response ? true : false,
            data: response ? `Xóa sách id: ${idSach} thành công` : `Không thể xóa sách id: ${idSach} tài khoản`
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Đã xảy ra lỗi khi xóa sách",
            error: error.message
        });
    }
}

const updateSach = async (req, res) => {
    const { idSach } = req.params;
    const { ID, ten, hinhAnh, tacGia, nhaXuatBan, gia, daBan, tonKho, trongLuong, kichThuoc, gioiThieu } = req.body;

    try {
        if (!idSach) {
            return res.status(404).json({
                success: false,
                message: `Không tìm thấy sách có id: ${idSach}`
            });
        }

        if (!ID || !ten || !hinhAnh || !tacGia || !gia || !tonKho) {
            return res.status(400).json({ success: false, message: 'Vui lòng cung cấp đầy đủ thông tin sách để cập nhật' });
        }

        const response = await Sach.findByIdAndUpdate(idSach, {
            ID, ten, hinhAnh, tacGia, nhaXuatBan, gia, daBan, tonKho, trongLuong, kichThuoc, gioiThieu
        }, { new: true });

        return res.status(200).json({
            success: true,
            data: response ? response : [],
            message: `Cập nhật thông tin sách có id: ${idSach} thành công`
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Đã xảy ra lỗi khi cập nhật sách",
            error: error.message
        });
    }
};

const createSach = async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            throw new Error("Không được để trống")
        }

        const existingSach = await Sach.findOne({ ID: req.body.ID });
        if (existingSach) {
            throw new Error("ID đã tồn tại trong dữ liệu");
        }

        const newSach = await Sach.create(req.body);

        return res.status(200).json({
            success: newSach ? true : false,
            dataProduct: newSach ? newSach : 'Không thể thêm sách'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Đã xảy ra lỗi khi thêm sách",
            error: error.message
        });
    }
};

const uploadImageSach = async (req, res) => {
    try {
        const { idSach } = req.params;
        if (!req.files || req.files.length === 0) {
            throw new Error("Không có hình ảnh được tải lên");
        }

        const imagesPaths = req.files.map(file => file.path.replace(/\\/g, '/'));
        const response = await Sach.findByIdAndUpdate(idSach, {
            $push: { images: { $each: imagesPaths } },
            hinhAnh: imagesPaths[0]
        }, { new: true });

        return res.status(200).json({
            success: true,
            message: `Cập nhật hình ảnh cho sách có id: ${idSach} thành công`,
            data: response
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Đã xảy ra lỗi khi tải lên hình ảnh sách",
            error: error.message
        });
    }
};


module.exports = {
    getAllSachs, getOneSach, deleteSach, updateSach, createSach, uploadImageSach
}