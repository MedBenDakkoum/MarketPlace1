const TABLE_NAME = 'novina';
const config = {
    PORT: process.env.PORT || 5000,
    DB_CONNECTION: `mongodb://localhost/${TABLE_NAME}`,
    SECRET: 'badumts',
    SALT: 10,
    COOKIE_NAME: 'USER_SESSION',
    CLOUDINARY_NAME: 'deux8ft6s',
    CLOUDINARY_API_KEY: 712152923343979,
    CLOUDINARY_API_SECRET: 'k7eBPRzkzeJxoeLYCuwSo3iA5NA',
    CLOUDINARY_STORAGE: 'pza5zln6'
}

module.exports = config;