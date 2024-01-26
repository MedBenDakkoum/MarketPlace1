const { SECRET, ADMIN_COOKIE_NAME } = require('../config/config');
const jwt = require('jsonwebtoken');

const isAdmin = (req, res, next) => {
    try {
        const adminToken = req.cookies[ADMIN_COOKIE_NAME];

        if (!adminToken) {
            return res.status(403).json({"message":'Forbidden: token missing'});
        }

        jwt.verify(adminToken, SECRET, (err, decoded) => {
            if (err) {
                res.clearCookie(ADMIN_COOKIE_NAME);
                return res.status(403).json('Forbidden: Invalid token');
            }
            if (decoded) {
                next();
            } else {
                res.status(403).json({"message":'Forbidden'});
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({"message":'Internal Server Error'});
    }
};

module.exports = isAdmin;