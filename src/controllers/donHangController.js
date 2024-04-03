const DonHang = require('../models/donhang');

const getAllDonHangs = async (req, res) => {
    try {
        let query = {};

        const { userId, role } = req;
        if (role === 'admin') {
            query = {};
        } else {
            query = { idNguoiDat: userId };
        }

        let response = await DonHang.find(query);

        return res.status(200).json({
            success: response ? true : false,
            data: response ? response : []
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Có lỗi, vui lòng thử lại sau ...",
            error: error.message
        });
    }
};

const getOneDonHang = async (req, res) => {
    try {
        const idDonHang = req.params.idDonHang;
        const { userId, role } = req;

        let query = { _id: idDonHang };

        if (role !== 'admin') {
            query.idNguoiDat = userId;
        }

        const response = await DonHang.findOne(query);

        if (!response) {
            return res.status(404).json({
                success: false, message: 'Không tìm thấy đơn hàng'
            });
        }

        return res.status(200).json({
            success: true,
            data: response
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Có lỗi, vui lòng thử lại sau...',
            error: error.message
        });
    }
};

const createDonHang = async (req, res) => {
    try {
        const data = req.body;
        if (Object.keys(data).length === 0) {
            throw new Error("Không được để trống")
        }

        let thanhTien = 0;
        data.sanPham.forEach(item => {
            thanhTien += item.soLuong * item.gia;
        });

        data.thanhTien = thanhTien;

        const soSanPham = data.sanPham.reduce((total, item) => total + item.soLuong, 0);
        data.soSanPham = soSanPham;

        data.idNguoiDat = req.userId;

        const newDonHang = await DonHang.create(data);

        return res.status(200).json({
            success: newDonHang ? true : false,
            dataProduct: newDonHang ? newDonHang : 'Không thể khởi tạo đơn hàng'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Có lỗi, vui lòng thử lại sau...',
            error: error.message
        });
    }
}


module.exports = {
    getAllDonHangs, getOneDonHang, createDonHang
};
