const Review = require("../models/Review");
const User = require("../models/User");
const productService = require("../services/productService");
const { writeFileSync,readFileSync } = require('fs');
const { dirname } = require('path');
const appDir = dirname(require.main.filename);

async function getSettings() {
    try {
        var obj = JSON.parse(
            readFileSync(`${appDir}/config/settings.json`,
            'utf8'));
        return obj
    } catch (err) {
      console.log(err);
      throw err.message;
    }
}
module.exports = {
    getSettings
};