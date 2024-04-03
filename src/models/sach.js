const mongoose = require('mongoose');
const { Schema } = mongoose;

const sachSchema = new mongoose.Schema({
    ID: { type: String, required: true },
    ten: { type: String, required: true },
    hinhAnh: { type: String, required: true },
    tacGia: { type: String, required: true },
    nhaXuatBan: { type: String },
    gia: { type: Number, required: true },
    daBan: Number,
    tonKho: { type: Number, required: true },
    trongLuong: Number,
    kichThuoc: String,
    gioiThieu: String
}, {
    timestamps: true,
});

//Export the model
module.exports = mongoose.model('Sach', sachSchema);
