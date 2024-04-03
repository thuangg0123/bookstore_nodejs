const mongoose = require('mongoose');
const { Schema } = mongoose;

const sachSchema = new mongoose.Schema({
    ID: { type: String, required: true },
    ten: { type: String, required: true },
    hinhAnh: { type: String, required: true },
    tacGia: { type: String, required: true },
    nhaXuatBan: { type: String },
    gia: { type: Number, required: true, min: 0 },
    daBan: { type: Number, default: 0 },
    tonKho: { type: Number, required: true, min: 0 },
    trongLuong: { type: Number },
    kichThuoc: { type: String },
    gioiThieu: { type: String }
}, {
    timestamps: true,
});


//Export the model
module.exports = mongoose.model('Sach', sachSchema);
