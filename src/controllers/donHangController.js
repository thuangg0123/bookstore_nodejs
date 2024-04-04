const DonHang = require('../models/donhang');
const Sach = require('../models/sach')

const getAllDonHangs = async (req, res) => {
    try {
        let query = {};

        const { userId, role } = req;
        if (role === 'admin') {
            query = {};
        } else {
            query = { idNguoiDat: userId };
        }

        let response = await DonHang.find(query)
            .populate({
                path: "idNguoiDat",
                select: "-isAdmin -matKhau -createdAt -updatedAt -__v"
            })
            .populate({
                path: "sanPham.idSach",
                select: "-tacGia -nhaXuatBan -daBan -tonKho -trongLuong -kichThuoc -gioiThieu -__v -createdAt -updatedAt"
            });

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

        const response = await DonHang.findOne(query)
            .populate({
                path: "idNguoiDat",
                select: "-isAdmin -matKhau -createdAt -updatedAt -__v"
            })
            .populate({
                path: "sanPham.idSach",
                select: "-tacGia -nhaXuatBan -daBan -tonKho -trongLuong -kichThuoc -gioiThieu -__v -createdAt -updatedAt"
            });

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
        if (!data.sanPham || data.sanPham.length === 0) {
            throw new Error("Danh sách sản phẩm không được để trống");
        }

        let thanhTien = 0;
        let soSanPham = 0;
        for (const item of data.sanPham) {
            const sach = await Sach.findById(item.idSach);
            if (!sach) {
                throw new Error(`Không tìm thấy sách với ID: ${item.idSach}`);
            }
            thanhTien += item.soLuong * sach.gia;
            soSanPham += item.soLuong;
        }

        const newDonHang = await DonHang.create({
            ...data,
            thanhTien: thanhTien,
            soSanPham: soSanPham,
            idNguoiDat: req.userId
        });

        // Lấy lại đơn hàng đã tạo và populate thông tin sách
        const populatedDonHang = await DonHang.findById(newDonHang._id)
            .populate({
                path: "sanPham.idSach",
                select: "-tacGia -nhaXuatBan -daBan -tonKho -trongLuong -gioiThieu -kichThuoc -__v -createdAt -updatedAt" // Bỏ các trường không mong muốn
            });

        return res.status(200).json({
            success: true,
            dataProduct: populatedDonHang
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Có lỗi, vui lòng thử lại sau...',
            error: error.message
        });
    }
}

const updateStateDonHang = async (req, res) => {
    try {
        const idDonHang = req.params.idDonHang;
        const { trangThai } = req.body;

        if (trangThai === undefined) {
            throw new Error("Vui lòng cung cấp trạng thái mới cho đơn hàng");
        }

        let donHang = await DonHang.findById(idDonHang);

        if (!donHang) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy đơn hàng"
            });
        }

        donHang.trangThai = trangThai;
        await donHang.save();

        return res.status(200).json({
            success: true,
            message: "Cập nhật trạng thái đơn hàng thành công"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Có lỗi, vui lòng thử lại sau...",
            error: error.message
        });
    }
};

module.exports = {
    getAllDonHangs, getOneDonHang, createDonHang, updateStateDonHang
};
