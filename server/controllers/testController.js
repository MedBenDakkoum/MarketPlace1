const { Router } = require('express');
const router = Router();
const axios = require('axios'); 
const parseString = require('xml2js').parseString;
const Categorie = require('../models/Categorie');
const categorieService = require('../services/categorieService');
router.get('/getCategories', async (req, res) => {
    try {
        axios.get('https://ettajer.com.tn/ws?action=getCategories&u=admin@ettajer.com&p=123456789&s=crrjqukql6np42i710aii22woyxga89n')
        .then(function (response) {
            parseString(response.data, function (err, result) {
                let i=0;
                let cats = [];
                result.categories.category.forEach((cat)=>{
                    cats.push({
                        reference:cat.reference[0],
                        name:cat.name[0]._,
                        parent:cat.parent[0],
                        level: parseInt(cat.level[0]),
                        description:cat.description[0]._,
                        link_rewrite:cat.link_rewrite[0]._
                    })
                    if(i==result.categories.category.length-1){
                        res.status(200).json(cats);
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

router.get('/setCategories', async (req, res) => {
    try {
        axios.get('https://ettajer.com.tn/ws?action=getCategories&u=admin@ettajer.com&p=123456789&s=crrjqukql6np42i710aii22woyxga89n')
        .then(function (response) {
            parseString(response.data, function (err, result) {
                let i=0;
                let cats = [];
                result.categories.category.forEach(async(cat)=>{
                    cats.push({
                        reference:cat.reference[0],
                        name:cat.name[0]._,
                        parent:cat.parent[0],
                        level: parseInt(cat.level[0]),
                        description:cat.description[0]._,
                        link_rewrite:cat.link_rewrite[0]._
                    })
                    await Categorie.findOneAndUpdate(
                        { reference: cat.reference[0] },
                        {
                            name:cat.name[0]._,
                            parent:cat.parent[0],
                            level: parseInt(cat.level[0]),
                            description:cat.description[0]._,
                            link_rewrite:cat.link_rewrite[0]._
                        },
                        { upsert: true }
                    );
                    if(i==result.categories.category.length-1){
                        res.status(200).json(cats);
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
router.get('/categories', async (req, res) => {
    try {
        let cats = await categorieService.getAll();
        res.status(200).json(cats);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

router.get('/getCategories', async (req, res) => {
    try {
        axios.get('https://ettajer.com.tn/ws?action=getCategories&u=admin@ettajer.com&p=123456789&s=crrjqukql6np42i710aii22woyxga89n')
        .then(function (response) {
            parseString(response.data, function (err, result) {
                let i=0;
                let cats = [];
                result.categories.category.forEach((cat)=>{
                    cats.push({
                        reference:cat.reference[0],
                        name:cat.name[0]._,
                        parent:cat.parent[0],
                        level: parseInt(cat.level[0]),
                        description:cat.description[0]._,
                        link_rewrite:cat.link_rewrite[0]._
                    })
                    if(i==result.categories.category.length-1){
                        res.status(200).json(cats);
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
})

router.get('/getProducts', async (req, res) => {
    try {
        axios.get('https://ettajer.com.tn/ws?action=getProducts&u=admin@ettajer.com&p=123456789&s=crrjqukql6np42i710aii22woyxga89n&categoryid='+req.query.cat)
        .then(function (response) {
            console.log(response.data);
            parseString(response.data, function (err, result) {
                res.status(200).send(result);
            });
        })
        .catch(function (error) {
            res.status(200).json({err:error});
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;