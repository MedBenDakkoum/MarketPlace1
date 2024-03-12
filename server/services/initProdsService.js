const initialProduct = require('../models/initialProduct');

async function getInitProds(cats){
    try{
        return new Promise(async (resolve, reject) => {
            const products = async (cat) =>{  
                return new Promise(async (resolve2, reject) => {
                    let ip = await initialProduct.find({"category":cat})
                    resolve2(ip)
                })
            }
            const getingProds = new Promise((resolve1, reject) => {
                let newProds =[]
                i=0
                cats.forEach(function(singleCat){
                    products(singleCat).then((ips)=>{
                        if(ips.length>0){
                            newProds = [...newProds,...ips];
                        }
                        if(i==cats.length-1){
                            resolve1(newProds);
                        }
                        i++
                    });
                        
                })
            });
            getingProds.then((NP)=>{
                resolve(NP);
            })
        })
    }catch(err){
        console.error(err);
    }
}

async function getInitProdById(id){
    return await initialProduct.findById(id);
}

module.exports ={
    getInitProdById,
    getInitProds
}