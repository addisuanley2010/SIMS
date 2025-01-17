const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const user = jwt.verify(token, "your-secret-key");
        req.user = user
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token', details: error.message });
    }
};

module.exports = { verifyToken };