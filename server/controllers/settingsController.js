const { Router } = require('express');
const router = Router();
const { writeFileSync } = require('fs');
const path = '../config/settings.json';


router.get('/', async (req, res) => {
    try {
        res.status(200).json(global.settings);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    try {
        let changes = req.body.data;
        let config = global.settings;
        for (const [keyy, value] of Object.entries(changes)) {
            config={...config,[`${keyy}`]:value};
        }
        writeFileSync("/home/yami/projects/Marketplace-ReactJS-Project/server/config/settings.json", JSON.stringify(config, null, 2), 'utf8');
        res.status(200).json(config);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;