const mongoose = require('mongoose');
const { Schema } = mongoose;

const donHangSchema = new mongoose.Schema({
    maDonHang: { type: String, required: true, unique: true },
    idNguoiDat: { type: mongoose.Schema.Types.ObjectId, ref: 'TaiKhoan', required: true },
    thoiGianDat: { type: Date, default: Date.now },
    trangThai: { type: Number, default: 0 },
    sanPham: [
        {
            idSach: { type: mongoose.Schema.Types.ObjectId, ref: 'Sach', required: true },
            soLuong: { type: Number, required: true },
            gia: { type: Number, required: true }
        }
    ],
    thanhTien: { type: Number, required: true },
    soSanPham: { type: Number, required: true },
    soDienThoai: { type: String, required: true },
    diaChi: { type: String, required: true }
}, {
    timestamps: true,
});

// Export the model
module.exports = mongoose.model('DonHang', donHangSchema);
