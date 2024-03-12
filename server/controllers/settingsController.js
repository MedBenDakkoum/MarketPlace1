const { Router } = require('express');
const router = Router();
const { writeFileSync } = require('fs');
const path = '../config/settings.json';
const User = require('../models/User');
const parseString = require('xml2js').parseString;
const axios = require('axios'); 
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
        res.status(200).json(global.settings);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
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