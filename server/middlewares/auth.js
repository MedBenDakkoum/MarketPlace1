const { SECRET, COOKIE_NAME, ADMIN_COOKIE_NAME } = require('../config/config');
const jwt = require('jsonwebtoken');

const auth = () => {
    return (req, res, next) => {
        let token = req.cookies[COOKIE_NAME];
        let adminToken = req.cookies[ADMIN_COOKIE_NAME];
        if (token) {
            jwt.verify(token, SECRET, (err, decoded) => {
                if (err) {
                    res.clearCookie(COOKIE_NAME);
                } else {
                    req.user = decoded;
                }
            })
        }
        if(adminToken){
            jwt.verify(adminToken, SECRET, (err, decoded) => {
                if (err) {
                    res.clearCookie(ADMIN_COOKIE_NAME);
                } else {
                    req.adminUser = decoded;
                }
            })
        }
        next();
    }
}

module.exports = auth;