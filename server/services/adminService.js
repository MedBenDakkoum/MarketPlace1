const User = require("../models/User");
const Admin = require("../models/Admin");
const Product = require("../models/Product");
const Categorie = require("../models/Categorie");
const Order = require("../models/Order");
var moment = require('moment'); 

async function getAdmin(id) {
  try {
    let a = await Admin.findById(id);
    if (a) {
      return a;
    } else {
      throw { statusCode: 404, message: "No user with this id found" };
    }
  } catch {
    throw { statusCode: 404, message: "No user with this id found" };
  }
}

async function getBasicInfo(){
  try{
    return new Promise(async (resolve,reject)=>{
      let numProds = await Product.count({isActive:true});
      let numCats = await Categorie.count();
      let numCustomers = await User.count();
      let numOrders = await Order.count();
      let salesRevenue= []
      let daysToSub = 7;
      let startDate = moment().add(1,"days").format("YYYY-MM-DD");
      for(let i=0;i<4;i++){
          let sales = await Order.aggregate([
          {
            $match: {
              createdAt: {
                $gte: new Date(moment().subtract(daysToSub, 'days').format("YYYY-MM-DD")),
                $lt: new Date(startDate)
              }
            }
          },
          {
            $group: {
              _id: null,
              count: { $sum: 1 },
              totalSales: { $sum: "$totalPrice" },
              totalRevenue: { $sum: "$totalPrice" }
            }
          }
        ]);
          startDate =moment().subtract(daysToSub, 'days').format("YYYY-MM-DD")
          daysToSub+=7
          salesRevenue.push({
            name: 'Week '+(i+1).toString(),
            sales: sales,
            revenue: 2400,
            amt: 2400,
          })
      }
      Promise.all([numProds, numCats, numCustomers,numOrders]).then((values) => {
        let resJson = {
          numProds:values[0], 
          numCats:values[1], 
          numCustomers:values[2],
          numOrders:values[3]
        }
        resolve(resJson);
      });
    })
  }catch(err){
    console.log(err)
  }
}
module.exports = {
  getAdmin,
  getBasicInfo
};
