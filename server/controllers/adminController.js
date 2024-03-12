const router = require("express").Router();
const adminService = require("../services/adminService");
const sellerService = require("../services/sellerService");
const imageService = require("../services/imageService");
const categorieService = require("../services/categorieService");
// const isAuth = require('../middlewares/isAuth');
// const isGuest = require('../middlewares/isGuest');
const { ADMIN_COOKIE_NAME } = require("../config/config");

router.get("/", async (req, res) => {
  try {
    if (req.adminUser) {
      let adminUser = await adminService.getAdmin(req.adminUser._id);
      res.status(200).json({
        user: {
          _id: adminUser._id,
          adminUser: adminUser.name,
          email: adminUser.email,
          isAdmin: adminUser.isAdmin,
        },
      });
    } else {
      res.status(200).json({ user: { isAdmin: false } });
    }
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Not Found" });
  }
});
router.get("/basicInfo", async (req, res) => {
  try {
    if (req.adminUser) {
      let basicInfo = await adminService.getBasicInfo();
      res.status(200).json(basicInfo);
    } else {
      res.status(200).json({ user: { isAdmin: false } });
    }
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Not Found" });
  }
});
router.post("/logout", (req, res) => {
  try {
    res.clearCookie(ADMIN_COOKIE_NAME);
    res.status(200).json({ message: "Successfully logged out" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Not Found" });
  }
});

router.get("/sellers", async (req, res) => {
  try {
    let sellers = await sellerService.getSellers();
    res.status(200).json(sellers);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Not Found" });
  }
});
router.post("/sellers", async (req, res) => {
  try {
    let newSeller = await sellerService.addSeller(req.body.data);
    res.status(200).json(newSeller);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Not Found" });
  }
});
router.get("/sellers/:id", async (req, res) => {
  try {
    let seller = await sellerService.getSellerById(req.params.id);
    res.status(200).json(seller);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Not Found" });
  }
});
router.put("/sellers/:id", async (req, res) => {
  try {
    let rslt = await sellerService.updateSeller(req.params.id, req.body.data);
    res.status(200).json({ seller: rslt.rslt2, store: rslt.rslt1 });
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Not Found" });
  }
});
router.post("/image/upload", async (req, res) => {
  try {
    let rslt = await imageService.uploadImage(req.body.data);
    res.status(200).json({ url: rslt });
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Not Found" });
  }
});
router.get("/categories", async (req, res) => {
  try {
    let cats = await categorieService.getAll();
    res.status(200).json(cats);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Not tFound" });
  }
});
module.exports = router;
