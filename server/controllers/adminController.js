const router = require("express").Router();
const adminService = require("../services/adminService");
const sellerService = require("../services/sellerService");
const imageService = require("../services/imageService");
const categorieService = require("../services/categorieService");
const orderService = require("../services/orderService");
const initProdsService = require("../services/initProdsService");
const productService = require("../services/productService");
const cartService = require("../services/cartService");
const userService = require("../services/userService");
const employeeService = require("../services/employeeService");
const reviewService = require("../services/reviewService");
const transactionService = require("../services/transactionService");
const Product = require("../models/Product");
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
router.get("/sellers/:id/verify", async (req, res) => {
  try {
    let status = await sellerService.isSellerVerified(req.params.id);
    res.status(200).json(status);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Not Found" });
  }
});
router.post("/sellers/:id/verify", async (req, res) => {
  try {
    let seller = await sellerService.verifySeller(req.params.id);
    res.status(200).json(seller);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Not Found" });
  }
});
router.delete('/sellers/:id/delete', async (req, res) => {
  try {
      await sellerService.deleteSeller(req.params.id)
      .then((rslt)=>{
        res.status(200).json(rslt)
      }).catch((e)=>{
        throw e.message;
      })
  } catch (error) {
      res.status(500).json(error)
  }
})
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
    res.status(404).json({ message: "Not Found" });
  }
});
router.get("/transactions", async (req, res) => {
  try {
    let transactions = await transactionService.getTransactionsBySeller();
    res.status(200).json(transactions);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Not Found" });
  }
});
router.post("/transactions/:id/confirm", async (req, res) => {
  try {
    await transactionService.confirmWithdrawl(req.params.id)
    .then((transaction)=>{
      res.status(200).json(transaction);
    })
    .catch((err)=>{
      res.status(400).json(err.message);
    })
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Not Found" });
  }
});

router.get("/orders", async (req, res) => {
  try {
    let orders = await orderService.getAll();
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Not Found" });
  }
});

router.get("/mp/products", async (req, res) => {
  try {
    let ret = [];
    let products = await initProdsService.getAll();
    let i=0;
    if(products.length>0){
    products.forEach(async function(prod){
      await Product.aggregate([
        { $match: { initialProduct:prod._id }},
        {
          $group: {
            _id: '$initialProduct',
            count: { $sum: 1 },
            avgPrice: { $avg: "$newPrice" },
          }
        }
      ]).then(function(rslt){
        ret.push({
          reference: prod.ref,
          img: prod.images[0],
          name: prod.name,
          sellersCount: rslt[0]?.count || 0,
          avgPrice: rslt[0]?.avgPrice || 0,
          active: prod.isActive
        })
      })
      if(i==products.length-1){
        res.status(200).json(ret);
      }
      i++;
    })
    }else{
      res.status(200).json([]);
    }     
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Not Found" });
  }
});

router.get("/mp/orders", async (req, res) => {
  try {
    await sellerService.getSellers().then(async function(sellers){
      let rslt = []
      let i = 0;
      if(sellers.length>0){
        for(let seller of sellers){
          let orderCount = await orderService.getOrdersById(seller.idStore);
          rslt.push({
            _id: seller._id,
            userId:seller.userId,
            storeName:seller.storeName,
            sellerName:seller.name,
            sellerEmail:seller.email,
            totalOrders: orderCount.length,
          })
          if(i==sellers.length-1){
            res.status(200).json(rslt);
          }
          i++;
        }
      }else{
        res.status(200).json([]);
      }
    });
    
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Not Found" });
  }
});
router.get("/mp/orders/:id", async (req, res) => {
  try {
      let idStore = await sellerService.getSellerStoreById(req.params.id);
      await orderService.getOrdersById(idStore).then(async function (orders) {
        if(orders.length==0){
          res.status(200).json([]);
        }
        let rslt = []
        let i = 0;
        for(let order of orders){
          let client = await userService.getUserById(order.clientId);
          rslt.push( {
            userId: client.userId,
            customerName:client.name,
            totalPrice:order.prices.sellerTotalPrice,
            adminCommission:0,
            supplierTax:0,
            sellerAmount:order.prices.sellerTotalPrice,
            status:order.status,
            orderdOn:order.date,
            products:[{
                productRef:"",
            }]
          })
          if(i==orders.length-1){
            res.status(200).json(rslt);
          }
          i++;
        }
      })
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

router.post("/orders/:id/status", async (req, res) => {
  try {
    let rslt = await orderService.updateOrderStatus(req.params.id,req.body.data);
    res.status(200).json(rslt);
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
router.get('/order/:id/invoice', async (req, res) => {
  try {
      let orin = await orderService.generateInvoice(req.params.id,req.query.lang);
      res.status(200).json({msg:"done"});
  } catch (error) {
      res.status(500).json({ message: error.message })
  }
})


router.post('/orders/invoices', async (req, res) => {
  try {
      let invoices = await orderService.getInvoices(req.body.data);
      res.status(200).json(invoices);
  } catch (error) {
      res.status(500).json({ message: error.message })
  }
})

router.get('/carts', async (req, res) => {
  try {
      let carts = await cartService.getAll();
      res.status(200).json(carts);
  } catch (error) {
      res.status(500).json({ message: error.message })
  }
})

router.get('/customers', async (req, res) => {
  try {
      let customers = await userService.getCustomers();
      res.status(200).json(customers);
  } catch (error) {
      res.status(500).json({ message: error.message })
  }
})
router.get('/customers/:id', async (req, res) => {
  try {
      let customer = await userService.getUserById(req.params.id);
      res.status(200).json(customer);
  } catch (error) {
      res.status(500).json({ message: error.message })
  }
})
router.put('/customers/:id', async (req, res) => {
  try {
      let customer = await userService.updateProfile(req.params.id,req.body.data);
      res.status(200).json(customer);
  } catch (error) {
      res.status(500).json({ message: error.message })
  }
})
router.post('/customers/:id/active', async (req, res) => {
  try {
      await userService.changeUserActive(req.params.id)
      .then((rslt)=>{
        res.status(200).json(rslt)
      }).catch((e)=>{
        throw e.message;
      })
  } catch (error) {
      res.status(500).json(error)
  }
})
router.delete('/customers/:id/delete', async (req, res) => {
  try {
      await userService.deleteCustomer(req.params.id)
      .then((rslt)=>{
        res.status(200).json(rslt)
      }).catch((e)=>{
        throw e.message;
      })
  } catch (error) {
      res.status(500).json(error)
  }
})
router.get('/employees', async (req, res) => {
  try {
      let employees = await employeeService.getEmployees();
      res.status(200).json(employees);
  } catch (error) {
      res.status(500).json({ message: error.message })
  }
})
router.get('/employees/:id', async (req, res) => {
  try {
      await employeeService.getEmployeeById(req.params.id).then((employee)=>{
        res.status(200).json(employee);
      }).catch((err)=>{
        res.status(400).json(err.message);
      })
  } catch (error) {
      res.status(500).json({ message: error.message })
  }
})
router.delete('/employees/:id/delete', async (req, res) => {
  try {
      await employeeService.deleteEmployee(req.params.id)
      .then((rslt)=>{
        res.status(200).json(rslt)
      }).catch((e)=>{
        throw e.message;
      })
  } catch (error) {
      res.status(500).json(error)
  }
})
router.post('/employees/:id', async (req, res) => {
  try {
      await employeeService.updateEmployee(req.params.id,req.body).then((rslt)=>{
        res.status(200).json(rslt);
      }).catch((err)=>{
        res.status(400).json(err.message);
      })
  } catch (error) {
      res.status(500).json({ message: error.message })
  }
})
router.put('/employees', async (req, res) => {
  try {
      console.log(req.body);
      await employeeService.addEmployee(req.body.name,req.body.email,req.body.password,req.body.phoneNumber).then((rslt)=>{
        res.status(200).json(rslt);
      }).catch((err)=>{
        res.status(400).json(err.message);
      })
  } catch (error) {
      res.status(500).json({ message: error.message })
  }
})
router.get('/reviews', async (req, res) => {
  try {
      await reviewService.getAllProdsReviews().then((rslt)=>{
        res.status(200).json(rslt);
      }).catch((err)=>{
        res.status(400).json(err.message);
      })
  } catch (error) {
      res.status(500).json({ message: error.message })
  }
})
router.delete('/reviews/:pId', async (req, res) => {
  try {
      await reviewService.removeReviewById(req.params.pId).then((rslt)=>{
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
