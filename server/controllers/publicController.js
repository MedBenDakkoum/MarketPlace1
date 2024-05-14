const router = require('express').Router();
const categorieService = require( '../services/categorieService');
const reviewService = require('../services/reviewService');
const productService = require('../services/productService');
const layoutService = require("../services/layoutService");

router.get("/categories", async (req, res) => {
    try {
      let cats = await categorieService.getAll();
      res.status(200).json(cats);
    } catch (err) {
      console.error(err);
      res.status(404).json({ message: "Not Found" });
    }
});
router.get("/home/layout", async (req, res) => {
    try {
      let layouts = await layoutService.getAllLayouts();
      res.status(200).json(layouts);
    } catch (err) {
      console.error(err);
      res.status(404).json({ message: "Not Found" });
    }
});
router.post("/categories", async (req, res) => {
  try {
    let cats = await categorieService.getCatsFromRefs(req.body.refs);
    res.status(200).json(cats);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Not Found" });
  }
});
router.post("/search", async (req, res) => {
  try {
    await productService.searchByKeyword(req.body.keyword).then((rslt)=>{
      console.log(rslt.length);
      res.status(200).json(rslt);
    })
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Not Found" });
  }
});
router.get('/reviews/:pId', async (req, res) => {
  try {
      await reviewService.getReviewsByProductId(req.params.pId).then((rslt)=>{
          res.status(200).json(rslt);
      }).catch((err)=>{
          res.status(400).json(err.message);
      })
  } catch (error) {
      console.log(error);
      res.status(500).json({ error :error});
  }
})
module.exports = router;