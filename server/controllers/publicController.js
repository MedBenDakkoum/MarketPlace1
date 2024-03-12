const router = require('express').Router();
const categorieService = require( '../services/categorieService');

router.get("/categories", async (req, res) => {
    try {
      let cats = await categorieService.getAll();
      res.status(200).json(cats);
    } catch (err) {
      console.error(err);
      res.status(404).json({ message: "Not Found" });
    }
});

module.exports = router;