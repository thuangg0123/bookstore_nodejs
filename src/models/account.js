const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const accountSchema = new Schema({
    userID: { type: String, required: true, unique: true },
    userName: { type: String, required: true },
    userPhone: String,
    userAddress: String,
    isAdmin: Boolean,
    userPassword: { type: String, required: true },
},
    {
        timestamps: true,
    }
);

accountSchema.pre('save', async function (next) {
    if (!this.isModified('userPassword')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.userPassword, salt);
        this.userPassword = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

accountSchema.methods.isCorrectPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.userPassword);
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = mongoose.model('Account', accountSchema);
