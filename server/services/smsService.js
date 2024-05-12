const axios = require('axios'); 

async function sendSms(number,text){
    return new Promise( async(resolve,reject)=>{

        let url = `http://smsmee.atwebpages.com/services/send.php?key=3cfcc35aab7d0610a1c4b0d8459393cf5cf9ed55&number=${encodeURIComponent(number)}&message=${encodeURIComponent(text)}&devices=2|0&type=sms&prioritize=0`
        const response = await axios.get(url);
        if(response.data.success){
            resolve(true);
        }else{
            console.log(response.data)
            reject(false);
        }
        
    })
}
//http://smsmee.atwebpages.com/services/send.php?key=3cfcc35aab7d0610a1c4b0d8459393cf5cf9ed55&number[]=%2B21627552973&number[]=%2B21627552972&message=test+sms&devices=2|0&type=sms&prioritize=0
async function sendMultipleSms(numbers,text){
    return new Promise( async(resolve,reject)=>{
        let numberList = "";
        numbers.forEach((num)=>{
            numberList = numberList+"&number[]="+encodeURIComponent(num)
        })
        let url = `http://smsmee.atwebpages.com/services/send.php?key=3cfcc35aab7d0610a1c4b0d8459393cf5cf9ed55${numberList}&message=${encodeURIComponent(text)}&devices=2|0&type=sms&prioritize=0`
        const response = await axios.get(url);
        if(response.data.success){
            resolve(true);
        }else{
            console.log(response.data)
            reject(false);
        }
        
    })
}
module.exports = {
    sendSms,
    sendMultipleSms
}