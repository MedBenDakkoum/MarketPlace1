const { Router } = require('express');
const router = Router();
const employeeService = require("../services/employeeService")
const orderService = require("../services/orderService")
const { EMPLOYEE_COOKIE_NAME } = require("../config/config");

router.get("/", async (req, res) => {
    try {
      if (req.employeeUser) {
        let employeeUser = await employeeService.getEmployeeById(req.employeeUser._id);
        res.status(200).json({
          user: {
            _id: employeeUser._id,
            name: employeeUser.name,
            email: employeeUser.email,
            isActive: employeeUser.isActive,
          },
        });
      } else {
        res.status(200).json({ user: { isActive: false } });
      }
    } catch (err) {
      console.error(err);
      res.status(404).json({ message: "Not Found" });
    }
  });
router.get("/orders", async (req, res) => {
    try {
        let orders = await orderService.getUnVerified();
        res.status(200).json(orders);
    } catch (err) {
        console.error(err);
        res.status(404).json({ message: "Not Found" });
    }
});
router.get("/orders/:id", async (req, res) => {
  try {
    let orders = await orderService.getSingleOrder(req.params.id);
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Not Found" });
  }
});
router.post("/orders/:id/messages", async (req, res) => {
  try {
    let rslt = await orderService.addOrderMessage(req.params.id,req.body.data);
    res.status(200).json(rslt);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Not Found" });
  }
});
router.post("/orders/:id/verify", async (req, res) => {
  try {
    let rslt = await orderService.verifyOrder(req.params.id);
    res.status(200).json(rslt);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Not Found" });
  }
});
router.get("/basicInfo", async (req, res) => {
    try {
        if (req.adminUser) {
        let basicInfo = await employeeService.getBasicInfo();
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
    res.clearCookie(EMPLOYEE_COOKIE_NAME);
    res.status(200).json({ message: "Successfully logged out" });
} catch (err) {
    console.log(err);
    res.status(404).json({ message: "Not Found" });
}
});
module.exports = router;