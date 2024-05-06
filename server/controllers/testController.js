const { Router } = require('express');
const router = Router();
const axios = require('axios'); 
const parseString = require('xml2js').parseString;
const Categorie = require('../models/Categorie');
const initialProduct = require('../models/initialProduct');
const categorieService = require('../services/categorieService');
const orderService = require('../services/orderService');
const moment = require('moment');
const EntityDecoder = require('html-entities');
const url = require('url');
const nodemailer = require('nodemailer');
const ModelTest = require("../models/ModelTest")
router.get('/getCategories', async (req, res) => {
    try {
        axios.get('https://ettajer.com.tn/ws?action=getCategories&u=admin@ettajer.com&p=123456789&s=crrjqukql6np42i710aii22woyxga89n')
        .then(function (response) {
            parseString(response.data, function (err, result) {
                let i=0;
                let cats = [];
                res.status(200).json(result);
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
                        //res.status(200).json(cats);
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
                    let catName = {};
                    let catDesc = {};
                    let catLink = {};
                    cat.name.forEach(function(singleCatName){
                        catName[singleCatName["$"].lang] = singleCatName["_"]; 
                    })
                    cat.description.forEach(function(singleCatDesc){
                        catDesc[singleCatDesc["$"].lang] = singleCatDesc["_"]; 
                    })
                    cat.link_rewrite.forEach(function(singleCatLink){
                        catLink[singleCatLink["$"].lang] = singleCatLink["_"]; 
                    })
                    await Categorie.findOneAndUpdate(
                        { reference: cat.reference[0] },
                        {
                            name:catName,
                            parent:cat.parent[0],
                            level: parseInt(cat.level[0]),
                            description:catDesc,
                            link_rewrite:catLink
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

        res.status(200).json(cats);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.get('/sendEmail', async (req, res) => {
    try {
        let resetCode = "123456";
        let transporter = nodemailer.createTransport({
            host: "smtp-relay.brevo.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: "adghalshop@gmail.com", // generated ethereal user
              pass: "xsmtpsib-9d2cc69afef80a28d4e3e66f3e749a0c6c78215f0e9c27edd3d2a2455080ffa6-VSq5NYrcQKv7wZ3h", // generated ethereal password
            },
          });
          
          var mailOptions = {
            from: '"Adghal" contact@adghal.com', // sender address
            to: "ziedsebai20@gmail.com", // list of receivers
            subject: "Need to reset your password?", // Subject line
            html: "Need to reset your password?<br><br>Use your secret code: <b>"+resetCode+"</b><br><br>If you did not forget your password, you can ignore this email.", // plain text body
          };
          //html: "Need to reset your password?<br>Use your secret code!<br> {{ resetCode }}If you did not forget your password, you can ignore this email.",
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                res.status(200).json("err");
            } else {
                res.status(200).json("done");
            }
          });          
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
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

function arrangeAttributeData(input_data){
    let output_data = [];
    
    let grouped_values = {};
    
    input_data.forEach(item => {
        let name = JSON.stringify(item.name);
        let value = JSON.stringify(item.values);
        
        if (!(name in grouped_values)) {
            grouped_values[name] = new Set();
        }
        
        grouped_values[name].add(value);
    });
    
    for (let name in grouped_values) {
        let nameObj = JSON.parse(name);
        let valuesArray = [...grouped_values[name]].map(value => JSON.parse(value));
        output_data.push({ name: nameObj, values: valuesArray });
    }
    
    return output_data;
    
}
router.get('/getProducts', async (req, res) => {
    try {
        let catsObjects = await categorieService.getAll();
        let prods = [];
        let i = 0;
        catsObjects.forEach(async function(catObject){
            await axios.get('https://ettajer.com.tn/ws?action=getProducts&u=admin@ettajer.com&p=123456789&s=crrjqukql6np42i710aii22woyxga89n&categoryid='+catObject.reference)
            .then(function (response) {
                parseString(response.data, function (err, result) {
                    let j = 0;
                    if(result.products!==undefined){
                        if(result.products.product!==undefined){
                            result.products.product.forEach(async function(singleProduct){
                                prods.push(singleProduct);
                                let imagesUrls = [];
                                let singleProductName = {};
                                let singleProductDescription = {};
                                let singleProductFeatures = [];
                                let singleProductMetaTitle = {};
                                let singleProductMetaDescription = {};
                                let singleProductDescriptionShort = {};
                                let singleProductAccessories = [];
                                let singleProductAttributes = [];
                                if(singleProduct.accessories[0].references!==undefined){
                                    singleProductAccessories = singleProduct.accessories[0].references[0].split(",");
                                }
                                singleProduct.images[0].image.forEach(function(imageUrl){
                                    imagesUrls.push(imageUrl.url[0]);
                                })
                                singleProduct.name.forEach(function(singleName){
                                    singleProductName[singleName["$"].lang] = EntityDecoder.decode(singleName["_"]) || "";
                                })
                                singleProduct.description.forEach(function(singleDescription){
                                    if(singleDescription["_"]==undefined){
                                        singleProductDescription[singleDescription["$"].lang] = "";
                                    }else{
                                        singleProductDescription[singleDescription["$"].lang] = EntityDecoder.decode(singleDescription["_"]).replace("<p>","").replace("</p>","")
                                    }
                                })
                                if(singleProduct.attributes[0]!==""){
                                    let attrValues=[];
                                        singleProduct.attributes[0].attribute.forEach(function(singleAttribute){
                                            let attrName = {}
                                            let attrValue={}
                                            singleAttribute.attribute_values[0].attribute_value[0].group_name.forEach(function(singleName){
                                                attrName[singleName["$"].lang] = singleName["_"] || ""; 
                                            })
                                            singleAttribute.attribute_values[0].attribute_value[0].attribute_name.forEach(function(singleAttrName){
                                                attrValue[singleAttrName["$"].lang] = singleAttrName["_"] || ""; 
                                            })
                                            attrValues.push({name:attrName,values:attrValue});
                                        })
                                        singleProductAttributes = arrangeAttributeData(attrValues);
                                }
                                if(singleProduct.features[0].feature!==undefined){
                                    singleProduct.features[0].feature.forEach(function(singleProductFeature){
                                        let singleProductFeaturesNames = {};
                                        let singleProductFeaturesValues = {};
                                        singleProductFeature.name.forEach(function(singleProductFeatureName){
                                            singleProductFeaturesNames[singleProductFeatureName['$'].lang] = singleProductFeatureName["_"] || "";
                                        })
                                        singleProductFeature.value.forEach(function(singleProductFeatureValue){
                                            singleProductFeaturesValues[singleProductFeatureValue['$'].lang] = singleProductFeatureValue["_"] || "";
                                        })
                                        singleProductFeatures.push({name:singleProductFeaturesNames,value:singleProductFeaturesValues});
                                    })
                                }
                                singleProduct.meta_title.forEach(function(singleMetaTitle){
                                    singleProductMetaTitle[singleMetaTitle["$"].lang] = singleMetaTitle["_"] || "";
                                })
                                singleProduct.meta_description.forEach(function(singleMetaDescription){
                                    singleProductMetaDescription[singleMetaDescription["$"].lang] = singleMetaDescription["_"] || "";
                                })
                                singleProduct.description_short.forEach(function(singleDescriptionShort){
                                    singleProductDescriptionShort[singleDescriptionShort["$"].lang] = singleDescriptionShort["_"] || "";
                                })
                                let toAdd = {
                                    category: singleProduct.category[0],
                                    name: singleProductName,
                                    description: singleProductDescription,
                                    images: imagesUrls,
                                    accessories: singleProductAccessories,
                                    features: singleProductFeatures,
                                    quantity: singleProduct.quantity[0],
                                    price: singleProduct.price[0],
                                    width: singleProduct.width[0],
                                    height:singleProduct.height[0],
                                    depth:singleProduct.depth[0],
                                    weight:singleProduct.weight[0],
                                    isActive:singleProduct.active[0],
                                    isAvailable:singleProduct.available_for_order[0],
                                    lastUpdated: new Date(),
                                    meta_title:singleProductMetaTitle,
                                    meta_description:singleProductMetaDescription,
                                    description_short:singleProductDescriptionShort,
                                    additional_categories:singleProduct.additional_categories[0].split(","),
                                    attributes: singleProductAttributes
                                }
                                await initialProduct.findOneAndUpdate(
                                    { ref: singleProduct.reference[0] },
                                    toAdd,
                                    { upsert: true }
                                );
                            })
                        }  
                    }
                });
            })
            .catch(function (error) {
                console.log(error);
                res.status(200).json({err:error.message});
            })
            if(i==catsObjects.length-1){
                res.status(200).json(prods);
            }
            i++;
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.get('/orderInvoice/:id', async (req, res) => {
    try {
        let orin = await orderService.generateInvoice(req.params.id,req.query.lang);
        res.status(200).json({msg:"done"});
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.get('/runAfter', async (req, res) => {
    try {
        const n = new ModelTest({attr1:"tttt"});
        await n.save({attr1:"test"}).then((rslt)=>{
            res.status(200).json(rslt);
        }).catch((err)=>{
            console.log(err);
            res.status(200).json({msg:"not done"});
        })
        
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
module.exports = router;