const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const taiKhoanSchema = new Schema({
    tenTaiKhoan: { type: String, required: true, unique: true },
    hoTen: { type: String, required: true },
    soDienThoai: String,
    diaChi: String,
    isAdmin: Boolean,
    matKhau: { type: String, required: true },
},
    {
        timestamps: true,
    }
);

taiKhoanSchema.pre('save', async function (next) {
    if (!this.isModified('matKhau')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.matKhau, salt);
        this.matKhau = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

taiKhoanSchema.methods.isCorrectPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.matKhau);
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = mongoose.model('TaiKhoan', taiKhoanSchema);
