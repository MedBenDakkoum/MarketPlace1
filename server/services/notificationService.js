const axios = require('axios'); 
const Notification = require("../models/Notification");

async function sendNotification(id,type,text){
    return new Promise( async(resolve,reject)=>{
        let not = new Notification({
            recipientType:type,
            recipient:id,
            message:text
        })
        await not.save()
        .then((rslt)=>{
            resolve(rslt);
        })
        .catch((err)=>{
            reject(err);
        })
    })
}
async function sendMultipleNotifications(ids,type,text){
    return new Promise( async(resolve,reject)=>{
        let listNots = [];
        let i = 0;
        if(ids.length>0){
            ids.forEach(async (id) => {
                listNots.push({
                    recipientType:type,
                    recipient:id,
                    message:text
                })
                if(i==ids.length-1){
                    await Notification.insertMany(listNots)
                    .then((rslt)=>{
                        resolve(rslt);
                    })
                    .catch((err)=>{
                        reject(err.message);
                    })
                }
                i++;
            });
        }else{
            resolve([])
        }
    })
}
async function getNotificationsById(id,limit=0){
    return new Promise( async(resolve,reject)=>{
        await Notification.find({recipient:id})
        .limit(parseInt(limit))
        .sort({createdAt:-1})
        .then((nots)=>{
            resolve(nots)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}
async function setNotificationsToRead(id){
    return new Promise( async(resolve,reject)=>{
        await Notification.updateMany({recipient:id},{read:true})
        .then((nots)=>{
            resolve(nots)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}
module.exports = {
    sendNotification,
    setNotificationsToRead,
    getNotificationsById,
    sendMultipleNotifications
}