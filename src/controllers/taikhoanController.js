const TaiKhoan = require('../models/taikhoan');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'mySecretKey123!@#';

const getAllAccounts = async (req, res) => {
    try {
        const response = await TaiKhoan.find();
        return res.status(200).json({
            success: true,
            message: "Successfully retrieved all users",
            data: response
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred, please try again later...",
            error: error.message
        });
    }
};

const getOneAccount = async (req, res) => {
    const { idTaiKhoan } = req.params;
    const response = await TaiKhoan.findById(idTaiKhoan);
    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : 'Unable to retrieve this user'
    });
};

const register = async (req, res) => {
    const { tenTaiKhoan, hoTen, soDienThoai, diaChi, matKhau } = req.body;

    try {
        const existingUser = await TaiKhoan.findOne({ tenTaiKhoan });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Account already exists" });
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

        return res.status(201).json({ success: true, message: "Successfully created new account", data: newUser });
    } catch (error) {
        return res.status(500).json({ success: false, message: "An error occurred while creating new account", error: error.message });
    }
};

const deleteAccount = async (req, res) => {
    const { idTaiKhoan } = req.params;
    try {
        const response = await TaiKhoan.findByIdAndDelete(idTaiKhoan);
        return res.status(200).json({
            success: response ? true : false,
            data: response ? 'Successfully deleted account' : 'Unable to delete account'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the account",
            error: error.message
        });
    }
};

const login = async (req, res) => {
    const { tenTaiKhoan, matKhau } = req.body;
    try {
        const user = await TaiKhoan.findOne({ tenTaiKhoan });
        if (!user) {
            return res.status(404).json({ success: false, message: 'Account does not exist' });
        }
        const isCorrectPassword = await bcrypt.compare(matKhau, user.matKhau);
        if (!isCorrectPassword) {
            return res.status(401).json({ success: false, message: 'Incorrect password' });
        }
        const token = jwt.sign(
            { userId: user._id, role: user.isAdmin ? 'admin' : 'user' },
            secretKey,
            { expiresIn: '1h' }
        );
        res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'An error occurred while logging in', error: error.message });
    }
};

const updateAccount = async (req, res) => {
    const { idTaiKhoan } = req.params;
    const { hoTen, soDienThoai, diaChi, matKhau } = req.body;

    try {
        const user = await TaiKhoan.findById(idTaiKhoan);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        Object.assign(user, { hoTen, soDienThoai, diaChi, matKhau });

        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Successfully updated user information',
            data: user
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'An error occurred while updating user information', error: error.message });
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie("jwt", { httpOnly: true, secure: true });

        return res.status(200).json({
            success: true,
            message: "Logout successful"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while logging out",
            error: error.message
        });
    }
};

module.exports = {
    getAllAccounts, getOneAccount, register, deleteAccount, login, updateAccount,
    logout
};
