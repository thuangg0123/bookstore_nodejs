const ACCOUNT = require('../models/AccountModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'mySecretKey123!@#';

const getAllAccount = async (req, res) => {
    try {
        const accountData = await ACCOUNT.find();
        const response = accountData.filter(account => !account.isAdmin);

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

const getAccount = async (req, res) => {
    const { accountID } = req.params;

    const response = await ACCOUNT.findOne({userID: accountID});

    if (!response) {
        return res.status(404).json({
            success: false, message: 'Account not found'
        });
    }

    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : 'Unable to retrieve this user'
    });
};

const getCurrentAccount = async (req, res) => {
    const userID = req.userID;

    const response = await ACCOUNT.findById(userID);

    if (!response) {
        return res.status(401).json({
            success: false, message: 'Not logged in yet'
        });
    }

    return res.status(200).json({
        success: response ? true : false,
        data: response ? response : 'Unable to retrieve this user'
    });
};

const register = async (req, res) => {
    const { userID, userPassword } = req.body;

    try {
        const existingUser = await ACCOUNT.findOne({ userID });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Account already exists" });
        }
        const newUser = new ACCOUNT({
            userID,
            userName: "",
            userPhone: "",
            userAddress: "",
            userPassword
        });
        await newUser.save();

        return res.status(201).json({ success: true, message: "Successfully created new account", data: newUser });
    } catch (error) {
        return res.status(500).json({ success: false, message: "An error occurred while creating new account", error: error.message });
    }
};

const deleteAccount = async (req, res) => {
    const { accountID } = req.params;
    try {
        const response = await ACCOUNT.findOneAndDelete({userID: accountID});
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
    const { userID, userPassword } = req.body;
    try {
        const user = await ACCOUNT.findOne({ userID });
        if (!user) {
            return res.status(404).json({ success: false, message: 'Account does not exist' });
        }
        const isCorrectPassword = await bcrypt.compare(userPassword, user.userPassword);
        if (!isCorrectPassword) {
            return res.status(401).json({ success: false, message: 'Incorrect password' });
        }
        const token = jwt.sign(
            { userID: user._id, role: user.isAdmin ? 'admin' : 'user' },
            secretKey,
            { expiresIn: '24h' }
        );
        res.cookie('jwt', token, { httpOnly: true, maxAge: 86400000 });
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
    const { accountID } = req.params;
    const { userName, userPhone, userAddress } = req.body;
    const { userID, role } = req;

    try {
        let user; 
        if(role === "user") {
            user = await ACCOUNT.findById(userID);
        } else{
            user = await ACCOUNT.findOne({userID: accountID});
        }

        user.userName = userName;
        user.userPhone = userPhone;
        user.userAddress = userAddress;

        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Successfully updated user information',
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An error occurred while updating user information',
            error: error.message
        });
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
    getAllAccount, getAccount, register, deleteAccount, login, updateAccount, logout, getCurrentAccount
};
