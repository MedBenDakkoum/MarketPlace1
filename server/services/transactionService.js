const User = require("../models/User");
const Transaction = require("../models/Transaction");
const settingsService = require("../services/settingsService");
const notificationService = require("../services/notificationService");
const adminService = require("../services/adminService");

async function getTransactionsBySeller() {
  //return info transaction's schema + info about seller
  try {
    return new Promise(async (resolve, reject) => {
      let tt = await Transaction.aggregate([
        {
          $group: {
            _id: "$userId",
            transactions: { $push: "$$ROOT" },
            hasPending: {
              $max: {
                $cond: {
                  if: { $eq: ["$status", "PENDING"] },
                  then: true,
                  else: false,
                },
              },
            },
            numT: { $sum: 1 },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $project: {
            userId: "$_id",
            user: {
              $arrayElemAt: [
                {
                  $map: {
                    input: "$user",
                    as: "user",
                    in: {
                      name: "$$user.name",
                      email: "$$user.email",
                      paymentMethod: "$$user.paymentMethod",
                      balance: "$$user.balance",
                    },
                  },
                },
                0,
              ],
            },
            transactions: 1,
            hasPending: 1,
            numT: 1,
          },
        },
      ]);
      resolve(tt);
      //   aggregate(
      //     [
      //         {
      //             "$group": {
      //                 "_id": "$userId",
      //                 "numberTransactions": { $sum: 1 },
      //                 "status": {}
      //             }
      //         }
      //     ],
      //     function(err,results) {
      //         resolve(results);
      //     }
      // )
    });
  } catch (e) {
    console.log("Error in getting transactions");
    throw e;
  }
}
async function getTransactions(id) {
  //return History
  try {
    return new Promise(async (resolve, reject) => {
      await Transaction.find({ userId: id }).then((transactions) => {
        resolve(transactions);
      });
    });
  } catch (e) {
    console.log("Error in getiing transactions");
    throw e;
  }
}
async function requestTransaction(id) {
  try {
    return new Promise(async (resolve, reject) => {
      let user = await User.findById(id);
      if (!user) {
        reject("no user");
      } else {
        if (user.balance >= 100) {
          let pendingTransactions = await Transaction.find({
            userId: id,
            status: "PENDING",
          });
          if (!pendingTransactions.length > 0) {
            let settings = await settingsService.getSettings();
            let adminAmount = 0;
            if (settings.Commision.type == "percentage") {
              adminAmount =
                (user.balance * parseFloat(settings.Commision.details)) / 100;
            } else {
              adminAmount =
                user.balance - parseFloat(settings.Commision.details);
            }
            let transaction = new Transaction({
              userId: id,
              status: "PENDING",
              fullAmount: user.balance,
              adminCommision: adminAmount.toFixed(2),
              sellerAmount: user.balance - adminAmount.toFixed(2),
            });
            await transaction
              .save()
              .then(async (rslt) => {
                await adminService.getAdmins().
                then(async (admins)=>{
                  let listOfAdminIds = admins.map(ad=>ad._id);
                  await notificationService.sendMultipleNotifications(listOfAdminIds,"Admin","A new withdrawl request has been made!")
                  .then((rstlNot)=>{
                    resolve("done");
                  })
                  .catch((err)=>{
                    reject(err.message);
                  })
                })
              })
              .catch((err) => {
                reject(err);
              });
          } else {
            reject("You already have a transaction pending");
          }
        } else {
          reject("Minimum amount to withdrawl is 100 TND");
        }
      }
    });
  } catch (e) {
    console.log("Error in getiing transactions");
    throw e;
  }
}
async function confirmWithdrawl(id) {
  try {
    return new Promise(async (resolve, reject) => {
      await Transaction.find({ userId: id, status: "PENDING" }).then(
        async (transactions) => {
          let pendingTransaction = transactions[0];
          let user = await User.findById(pendingTransaction.userId);
          await user
            .update({
              balance: (user.balance - pendingTransaction.fullAmount).toFixed(
                2
              ),
            })
            .then(async (rslt) => {
              await Transaction.findOneAndUpdate(
                { userId: id, status: "PENDING" },
                { status: "ACCEPTED" }
              )
                .then(async (r) => {
                  await notificationService.sendNotification(id,"User","Your withdrawl request is accepted !")
                  .then((rsltNot)=>{
                    resolve("done");
                  })
                  .catch((err)=>{
                    reject(err.message)
                  })
                })
                .catch((e) => {
                  reject(e.message);
                });
            })
            .catch((err) => {
              reject(err.message);
            });
        }
      );
    });
  } catch (e) {
    console.log("Error in getting transactions");
    throw e;
  }
}
module.exports = {
  getTransactions,
  requestTransaction,
  getTransactionsBySeller,
  confirmWithdrawl,
};
