const TaiKhoan = require('../models/taikhoan')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'mySecretKey123!@#';

const getAllTaiKhoans = async (req, res) => {
    try {
        const response = await TaiKhoan.find();
        return res.status(200).json({
            success: true,
            message: "Lấy ra toàn bộ người dùng thành công",
            data: response
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Có lỗi, vui lòng thử lại sau ...",
            error: error.message
        });
    }
}

const getOneTaiKhoan = async (req, res) => {
    const { idTaiKhoan } = req.params
    const response = await TaiKhoan.findById(idTaiKhoan)
    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : 'Không thể lấy ra người dùng này'
    })
}

const register = async (req, res) => {
    const { tenTaiKhoan, hoTen, soDienThoai, diaChi, matKhau } = req.body;

    try {
        const existingUser = await TaiKhoan.findOne({ tenTaiKhoan });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Tài khoản đã tồn tại" });
        }
        const newUser = new TaiKhoan({
            tenTaiKhoan,
            hoTen,
            soDienThoai,
            diaChi,
            isAdmin: false,
            matKhau
        });
        await newUser.save();

        return res.status(201).json({ success: true, message: "Tạo tài khoản mới thành công", data: newUser });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Đã xảy ra lỗi khi tạo tài khoản mới", error: error.message });
    }
};

const deleteTaiKhoan = async (req, res) => {
    const { idTaiKhoan } = req.params;
    try {
        if (req.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Bạn không có quyền thực hiện thao tác này' });
        }
        const response = await TaiKhoan.findByIdAndDelete(idTaiKhoan);
        return res.status(200).json({
            success: response ? true : false,
            data: response ? 'Xóa tài khoản thành công' : 'Không thể xóa tài khoản'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Đã xảy ra lỗi khi xóa tài khoản",
            error: error.message
        });
    }
};

const login = async (req, res) => {
    const { tenTaiKhoan, matKhau } = req.body;
    try {
        const user = await TaiKhoan.findOne({ tenTaiKhoan })
        if (!user) {
            return res.status(404).json({ success: false, message: 'Tài khoản không tồn tại' });
        }
        const isCorrectPassword = await bcrypt.compare(matKhau, user.matKhau);
        if (!isCorrectPassword) {
            return res.status(401).json({ success: false, message: 'Sai mật khẩu' });
        }
        const token = jwt.sign(
            { userId: user._id, role: user.isAdmin ? 'admin' : 'user' },
            secretKey,
            { expiresIn: '1h' }
        );
        res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });
        return res.status(200).json({
            success: true,
            message: 'Đăng nhập thành công',
            token
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi đăng nhập', error: error.message });
    }
}

const updateTaiKhoan = async (req, res) => {
    const { idTaiKhoan } = req.params;
    const { hoTen, soDienThoai, diaChi, matKhau } = req.body;

    try {
        const user = await TaiKhoan.findById(idTaiKhoan);
        if (!user) {
            return res.status(404).json({ success: false, message: 'Người dùng không tồn tại' });
        }

        Object.assign(user, { hoTen, soDienThoai, diaChi, matKhau });

        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Cập nhật thông tin người dùng thành công',
            data: user
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi cập nhật thông tin người dùng', error: error.message });
    }
};

const logout = async (req, res) => {
    try {
        // Lấy cookie từ request
        const jwtCookie = req.cookies && req.cookies.jwt;

        // Kiểm tra xem cookie "jwt" có tồn tại không
        if (!jwtCookie) {
            throw new Error("Không có Token trong Cookies");
        }

        // Xóa cookie "jwt" bằng cách đặt thời gian hết hạn trước đó
        res.clearCookie("jwt", { httpOnly: true, secure: true });

        return res.status(200).json({
            success: true,
            message: "Đăng xuất thành công"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Đã xảy ra lỗi khi đăng xuất",
            error: error.message
        });
    }
};

module.exports = {
    getAllTaiKhoans, getOneTaiKhoan, register, deleteTaiKhoan, login, updateTaiKhoan,
    logout
}
