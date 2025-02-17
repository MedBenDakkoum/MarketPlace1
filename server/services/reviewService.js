const Review = require("../models/Review");
const User = require("../models/User");
const Product = require("../models/Product");

const productService = require("../services/productService");

async function getReviewsByProductId(productId) {
    try {
        return new Promise(async(resolve,reject)=>{
            await Review.find({productId:productId})
            .populate('userId', '_id name avatar nbrReviews') // Assuming 'name' is a field in your User model
            .exec(function (err, reviews) {
                if (err) {
                    console.error(err);
                    return;
                }
                resolve(reviews);
            });
        });
    } catch (err) {
      console.log(err);
      throw err.message;
    }
}
async function getReviewsByUserId(userId) {
    try {
        return new Promise(async(resolve,reject)=>{
            await nR.find({userId:userId}).then((rslt)=>{
                resolve(rslt);
            }).catch((err)=>{
                reject(err.message);
            })
        })
    } catch (err) {
      console.log(err);
      throw err.message;
    }
}

async function calculateProductReviews(productIdParam){
    return new Promise(async(resolve,reject)=>{
        await Review.find({productId:productIdParam})
        .then((reviews)=>{
            let reviewSum = 0;
            let i =0;
            if(reviews.length>0){
                reviews.forEach((review)=>{
                    reviewSum+=review.stars;
                    if(i==reviews.length-1){
                        resolve((reviewSum/reviews.length).toFixed(2))
                    }
                    i++;
                })
            }else{
                resolve(0);
            }
        })
    })
}

async function addReview(userId,productId,review) {
    try {
        return new Promise(async(resolve,reject)=>{
            let nR = new Review({
                userId: userId,
                productId: productId,
                stars: review.stars,
                text: review.text
            });
            let user = await User.findById(userId);
            await nR.save().then(async (rslt)=>{
                await User.findOneAndUpdate({_id:userId},{nbrReviews:user.nbrReviews+1})
                .then(async (rslt2)=>{
                    await Product.findOneAndUpdate({_id:productId},{review:await calculateProductReviews(productId)})
                    .then((rslt3)=>{
                        resolve(rslt);
                    })
                    .catch((err)=>{
                        reject(err.message);
                    })
                })
            }).catch((err)=>{
                reject(err.message);
            })
        })
    } catch (err) {
      console.log(err);
      throw err.message
    }
}
async function removeReviewById(reviewId) {
    try {
        return new Promise(async(resolve,reject)=>{
            await Review.findByIdAndDelete(reviewId).then(async (rslt)=>{
                let user = await User.findById(rslt.userId);
                await User.findOneAndUpdate({_id:rslt.userId},{nbrReviews:user.nbrReviews-1})
                .then(async (rslt2)=>{
                    let newReviewsNum = await calculateProductReviews(rslt.productId);
                    console.log("newReviewsNum: ",newReviewsNum);
                    await Product.findOneAndUpdate({_id:rslt.productId},{review:newReviewsNum})
                    .then((rslt3)=>{
                        console.log("rslt3",rslt3);
                        resolve(rslt);
                    })
                    .catch((err)=>{
                        console.log(err);
                        reject(err.message);
                    })
                })
            }).catch((err)=>{
                console.log(err);
                reject(err.message);
            })
        })
    } catch (err) {
      console.log(err);
      throw err.message
    }
}
async function getAllProdsReviews() {
    try {
        return new Promise(async(resolve,reject)=>{
            await Review.aggregate(
                [
                    { 
                        "$group": { 
                            "_id": "$productId",
                            "nbrReviews": { $sum: 1 },
                            "productId": { "$first": "$productId" },
                        }
                    }
                ],
                function(err,results) {
                    if (err) reject(err.message);
                    let i = 0;
                    let newResult = [];
                    console.log(results);
                    if(results.length>0){
                        results.forEach(async (prod)=>{
                            let prod1 = await productService.getFullProd(prod.productId);
                            newResult.push({...prod,prod:prod1})
                            if(i==results.length-1){
                                resolve(newResult);
                            }
                            i++;
                        })
                    }else{
                        resolve(newResult)
                    }
                }
            )
        })
    } catch (err) {
      console.log(err);
      throw err.message
    }
}

module.exports = {
    addReview,
    getReviewsByProductId,
    getReviewsByUserId,
    removeReviewById,
    getAllProdsReviews
};
  