const jwt = require('jsonwebtoken');
const { pool } = require('../config/db');

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Verify user still exists and is active
        const [users] = await pool.query(
            'SELECT id, username, email, role FROM users WHERE id = ? AND is_active = 1',
            [decoded.id]
        );

        if (users.length === 0) {
            return res.status(401).json({ message: 'User no longer exists or is inactive' });
        }

        req.user = { ...decoded, ...users[0] };
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Requires admin privileges' });
    }
};

module.exports = {
    verifyToken,
    isAdmin
};