import React,{useState,useEffect} from "react";
import { useParams,useNavigate, useNavigationType } from "react-router-dom";
import {getStoreByLink} from "../services/storeData"
const Store = () => {
  const lang = localStorage.getItem("lang");
  const [storeAvailable,setStoreAvailable] = useState(false);
  const [data,setData] = useState({
    info: {
            description: "",
            _id: "",
            title: "",
            banner: "",
            logo: ""
        },
    products: [
        {
            img: "",
            name: "",
            price: 0
        }
    ]
})
const [storeProds,setStoreProds] = useState([])
  const  navigate = useNavigate()
  const  params = useParams()
  useEffect(function(){
    async function init(){
      let store = await getStoreByLink(params.link);
      if(store.msg == "Not found"){
        setStoreAvailable(false);
      }else{
        setStoreAvailable(true);
        setData({
          info: {
                  description: store.info.description,
                  _id: store.info._id,
                  title: store.info.title,
                  banner: store.info.banner,
                  logo: store.info.logo
              },
          products: store.products
        });
      }
    }
    init();
  },[])
  useEffect(function(){
    let storeProds1 = data.products.map((e)=>(
      <div className="single-store-product">
          <img src={e.img} alt="" />
          <p>{e.name}</p>
          <span>{e.price} TND</span>
      </div>
    ))
    setStoreProds(storeProds1);
  },[data,setData])
  return (
    <main className="store-container">
      {storeAvailable?  <>
      <div className="store-header">
        <div className="store-banner">
          <div className="store-banner-shadow-overlay"></div>
          <img src={data.info.banner} alt="" />
        </div>
        <div className="store-info">
            <img src={data.info.logo}></img>
            <div className="store-title-description">
              <h1>{data.info.title}</h1>
              <p>{data.info.description}</p>
            </div>
        </div>
      </div>
      <div className="store-products">
        {data?.products?.map(prod=>(
          <div onClick={(e)=>{navigate("/products/"+prod._id)}} className="store-single-prod">
            <img src={prod?.img} alt="" />
            <div className="store-single-prod-info">
              <h4>{prod?.name[lang]}</h4>
              <span>{prod?.price?.toFixed(2)} TND</span>
              </div>
          </div>
        ))}
      </div> </>
      : <h1>Store not found</h1> }
    </main>
  );
};

export default Store;