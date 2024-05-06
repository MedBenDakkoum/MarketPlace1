module.exports = (req, res, next) => {
    if(!req.user) {
        return res.status(200).json({notLoggedIn:true})
    }
    next();
}