const ChiTietDonHang = require('../models/chitietdonhang')

const getAllChiTietDonHangs = async (req, res) => {
    try {
        let query = {};

        const { userId, role } = req;
        if (role === 'admin') {
            query = {};
        } else {
            query = { idNguoiDat: userId };
        }

        let response = await ChiTietDonHang.find(query).populate('maDonHang')

        return res.status(200).json({
            success: true,
            data: response ? response : []
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Có lỗi, vui lòng thử lại sau ...",
            error: error.message
        });
    }
}

const getOneChiTietDonHang = async (req, res) => {
    try {
        const { idDonHang } = req.params;
        const { userId, role } = req;

        let query = { maDonHang: idDonHang };

        if (role !== 'admin') {
            query.idNguoiDat = userId;
        }

        let response = await ChiTietDonHang.findOne(query).populate('maDonHang');

        if (!response) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy chi tiết đơn hàng'
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
}

const createChiTietDonHang = async (req, res) => {
    try {
        const { userId } = req;
        if (!userId) {
            return res.status(403).json({
                success: false,
                message: "Bạn cần đăng nhập để thực hiện hành động này"
            });
        }

        const data = req.body;
        data.idNguoiDat = userId; // Gán userId cho trường idNguoiDat

        const response = await ChiTietDonHang.create(data);

        const populatedResponse = await ChiTietDonHang.findById(response._id)
            .populate({
                path: 'maDonHang',
                select: '-__v -createdAt -updatedAt -idNguoiDat'
            });

        return res.status(200).json({
            success: true,
            data: populatedResponse
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Có lỗi, vui lòng thử lại sau ...",
            error: error.message
        });
    }
}

module.exports = {
    getAllChiTietDonHangs, createChiTietDonHang, getOneChiTietDonHang
}