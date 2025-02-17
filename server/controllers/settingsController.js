const { Router } = require('express');
const router = Router();
const fs = require('fs');
const path = '../config/settings.json';
const User = require('../models/User');
const parseString = require('xml2js').parseString;
const axios = require('axios'); 
const settingsService = require("../services/settingsService");
const notificationService = require("../services/notificationService");
const { dirname } = require('path');
const appDir = dirname(require.main.filename);

router.get('/test', async (req, res) => {
    try {
        axios.get('https://ettajer.com.tn/api/products?ws_key=CZ2LXXFDRAZPFP3AU8J5EC5QDKQRQKJ9')
        .then(function (response) {
            parseString(response.data, function (err, result) {
                let i=0;
                prods = []
                result.prestashop.products[0].product.forEach((product)=>{
                    console.log(product)
                    prods.push({
                        id:product['$'].id,
                        link:product['$']["xlink:href"]
                    })
                    if(i==result.prestashop.products[0].product.length-1){
                        res.status(200).json(prods);
                    }
                    i++;
                })
                
            });
        })
        .catch(function (error) {
            res.status(200).json({err:error});
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.get('/', async (req, res) => {
    try {
        var settings = await settingsService.getSettings();
        res.status(200).json(settings);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.get('/check-sessions', (req, res) => {
    const aCookie = req.cookies['ADMIN_SESSION'];
    const eCookie = req.cookies['EMPLOYEE_SESSION'];
    res.send({ aExists: aCookie? true : false,eExists:eCookie? true : false });
});
router.get('/email/:email', async (req, res) => {
    try {
        let emailAvail = await User.find({email: req.params.email}).exec()
        if (emailAvail.length > 0) {
            res.status(200).json({available:false});
        }
        else {
            res.status(200).json({available:true});
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.get('/location/country', async (req, res) => {
    try {
        res.status(200).json({Country:global.location.Country});
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.get('/location/states', async (req, res) => {
    try {
        res.status(200).json(Object.keys(global.location.States));
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.get('/location/states/:state', async (req, res) => {
    try {
        let stateName = req.params.state;
        res.status(200).json(global.location.States[stateName]);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.post('/', async (req, res) => {
    try {
        let changes = req.body.data;
        let config = require('../config/settings.json');
        for (const [keyy, value] of Object.entries(changes)) {
            config[keyy] = value
        }
        fs.writeFile(`${appDir}/config/settings.json`, JSON.stringify(config, null, 2), function writeJSON(err) {
            if (err) return console.log(err);
            res.status(200).json(config);
          });        
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;