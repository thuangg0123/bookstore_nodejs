const jwt = require('jsonwebtoken');
const secretKey = 'mySecretKey123!@#';

const authenticateJWT = (req, res, next) => {
    // const token = req.headers?.authorization?.split(' ')[1];
    let token;
    req.headers?.cookie?.split('; ').forEach((cookie) => {
        const [name, value] = cookie.split('=');
        if (name === "jwt") {
            token = value;
        }
    });

    if (!token) {
        return res.status(401).json({ success: false, message: 'Token is not provided' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ success: false, message: 'JWT authentication failed' });
        } else {
            res.cookie('jwt', token, { httpOnly: true, maxAge: 86400000 });
            req.userID = decoded.userID;
            req.role = decoded.role;
            next();
        }
    });
};

const isAdmin = (req, res, next) => {
    if (req.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'You do not have permission to perform this action' });
    }
    next();
};

module.exports = { authenticateJWT, isAdmin };
