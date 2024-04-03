const mongoose = require('mongoose');
const { Schema } = mongoose;

const chiTietDonHangSchema = new mongoose.Schema({
    maDonHang: { type: mongoose.Schema.Types.ObjectId, ref: 'DonHang', required: true },
    idSach: { type: mongoose.Schema.Types.ObjectId, ref: 'Sach', required: true },
    soLuong: Number
},
    {
        timestamps: true,
    }
);

//Export the model
module.exports = mongoose.model('ChiTietDonHang', chiTietDonHangSchema);