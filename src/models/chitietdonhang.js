const mongoose = require('mongoose');
const { Schema } = mongoose;

const chiTietDonHangSchema = new mongoose.Schema({
    maDonHang: { type: mongoose.Schema.Types.ObjectId, ref: 'DonHang', required: true },
    idNguoiDat: { type: mongoose.Schema.Types.ObjectId, ref: 'TaiKhoan', required: true }, // Thêm trường để lưu trữ userId
},
    {
        timestamps: true,
    });

module.exports = mongoose.model('ChiTietDonHang', chiTietDonHangSchema);
