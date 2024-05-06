import React,{useState,useEffect,useContext} from "react";
import { Context } from '../ContextStore';
import styles from "../components/Cart/Cart.module.css"
import { useParams,useNavigate, useNavigationType } from "react-router-dom";
import {getCart,deleteFromCart,makeOrder,getAddress} from "../services/userData";
import { MDBDataTable } from 'mdbreact';
import { BsTrash, BsTrash2Fill, BsXCircleFill, BsXSquareFill } from "react-icons/bs";
import { CButton,CFormCheck} from '@coreui/react';
import { Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';

const Store = () => {
  const lang = localStorage.getItem("lang");
  const navigate = useNavigate();
  const [data,setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [address,setAddress] = useState([]);
  const [totalPrice,setTotalPrice] = useState(0);
  const [subTotalPrice,setSubTotalPrice] = useState(0);
  const [refresh,setRefresh] = useState(false);
  const { userData, setUserData } = useContext(Context);
  const [alert, setAlert]= useState({
    msg:"",
    type:"",
    refresh:true
})
  const [dataRows,setDataRows] = useState([]);
  const [confirmOrder, setConfirmOrder] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const cartProds = {
    columns: [
      {
        label: 'Item',
        field: 'item',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Price',
        field: 'price',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Quantity',
        field: 'quantity',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Total',
        field: 'total',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Delete',
        field: 'delete',
        sort: 'asc',
        width: 100
      }
    ],
    rows:dataRows
  };

  const handleDeleteAllFromCart = async (e)=>{
    Swal.fire({
      title: "Do you want to remove all items?",
      showCancelButton: true,
      confirmButtonText: "Remove",
    }).then(async (result) => {
      if (result.isConfirmed) {
          await deleteFromCart({cartItemId:"all"})
          .then(function(e){
              if(data.length!==1){
                setRefresh(!refresh);
              }else{
                setDataRows(new Array());
              }
              setAlert({msg:"Items deleted from cart!",type:"success",refresh:!alert.refresh});
          }).catch(function(err){
            setAlert({msg:"Error deleting item from cart!",type:"fail",refresh:!alert.refresh});
          });
      }
    });

  }
  const handleDeleteFromCart = async (e)=>{
    let id="";
    if(e.target==e.currentTarget){
        id=e.target.getAttribute("id");
    }else{
        id=e.target.parentNode.getAttribute("id");
    }
    Swal.fire({
      title: "Do you want to remove this item?",
      showCancelButton: true,
      confirmButtonText: "Remove",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteFromCart({cartItemId:id})
        .then(function(e){
            if(data.length!==1){
              setRefresh(!refresh);
            }else{
              setDataRows(new Array());
            }
            setAlert({msg:"Item deleted from cart!",type:"success",refresh:!alert.refresh});
        }).catch(function(err){
          setAlert({msg:"Error deleting item from cart!",type:"fail",refresh:!alert.refresh});
        });
      }
    });
  }
  const handleCheckOut = (e)=>{
    setConfirmOrder(true);
  }
  const handleExitChekout = (e)=>{
    setConfirmOrder(false);
  }
  useEffect(function(){
    async function init(){
        setLoading(true);
        await getCart().then((cart)=>{
          if(cart.notLoggedIn){
            Swal.fire({
              title: "Please Login first",
              showCancelButton: true,
              confirmButtonText: "Login",
            }).then(async (result) => {
              if (result.isConfirmed) {
                  navigate("/auth/login")
              }else{
                navigate("/")
              }
            });
          }else{
            setData(cart);
          }
        })
        await getAddress().then((addressInfo)=>{
          setAddress(addressInfo)
        });
        
    }
    init();
    setPaymentMethod("onDelivery");
    setLoading(false);
  },[refresh,setRefresh])
  const getTotal = async ()=> {
    return new Promise(async (resolve, reject) => {
        let s=0
        let i=0
        data.forEach((e)=>{
            s+=parseFloat(e.info.price*e.quantity);
            if(i==data.length-1){
                resolve(s);
            } 
            i++;
        })
    })
  }
  const handleBuyNow = async (e)=>{
    setLoading(true);
    if(paymentMethod!==""){
      await makeOrder({paymentMethod:paymentMethod},lang).then(function(e){
        setLoading(false);
        setDataRows([]);
        setConfirmOrder(false);
        setAlert({msg:"Order done successfully!",type:"success",refresh:!alert.refresh})
      }).catch(function(e){
        setLoading(false);
        setAlert({msg:"Error passing order!",type:"fail",refresh:!alert.refresh});
      });
    }else{
      setLoading(false);
      setAlert({msg:"Please select a payment method!",type:"fail",refresh:!alert.refresh})
    }
  }
  const handleChangePaymentMethod = (e)=>{
    e.target.checked=true;
    setPaymentMethod(e.target.value);
  }
  useEffect(function(){
  //   let newRows =[...data]
  //       newRows.map(async (item)=>{
  //           let pInfo = item.info;
  //           item.item = (
  //               <div className="item-cart-info">
  //                   <img src={pInfo.img} className="cart-item-img"/>
  //                   <div className="item-info">
  //                       <h3>
  //                         {pInfo.name[lang]}
  //                       </h3>
  //                       <ul>
  //                         {
  //                           item.attributes!==undefined?
  //                           Object.keys(item.attributes).map((e)=>(
  //                             <li key={e}>{e} : {item.attributes[e]}</li>
  //                           ))
  //                           : ""
  //                         }
  //                       </ul>
  //                   </div>
  //               </div>
  //           )
  //           let prodPrice = pInfo.price;
  //           item.price = (
  //               prodPrice+" TND"
  //           )
  //           item.total = (
  //               prodPrice*item.quantity+" TND"
  //           )
  //           item.delete = (
  //               <BsTrash onClick={handleDeleteFromCart} id={item.itemId} style={{fontSize:"25px",cursor:"pointer"}}/>
  //           )
  //       })
  //     setDataRows([...newRows])
      getTotal().then((total)=>{
        setSubTotalPrice(parseFloat(total).toFixed(2));
        setTotalPrice(parseFloat(total).toFixed(2))
      })
  },[data,setData]);

  return (
    <main className={styles["section-cart-container"]}>
      {!loading? 
        <>
                {confirmOrder?
          <div className={styles["confirm-order-container"]}>
            <div className={styles["confirm-order"]}>
            {/* <div className="cart-total-data-container"> */}
            <div className={styles["cart-total-data"]}>
                <div className={styles["exit-check-out"]}>
                  <BsXSquareFill onClick={handleExitChekout} style={{color:"#FA3434",fontSize:"24px",cursor:"pointer"}}/>
                </div> 
                <p style={{maxWidth:"100%"}}><span>Total:</span> {totalPrice} TND</p>
                <div className={styles["cart-address-info"]}>
                    <p><span>Address 1:</span> {address?.line1}</p>
                    <p><span>Address 2:</span> {address?.line2}</p>
                    <p><span>Country:</span> {address?.country}</p>
                    <p><span>State:</span> {address?.state}</p>
                    <p><span>City:</span> {address?.city}</p>
                    <p><span>Zip Code:</span> {address?.zipCode}</p>
                    <a onClick={(e)=>{navigate("/cd")}} style={{color:"#007bff",cursor:"pointer"}}>Change address</a>
                </div>
                <CButton type="button" onClick={handleBuyNow}>Buy Now</CButton>
            {/* </div> */}
               </div>
            </div>
          </div> 
        :
        ""
        }
        {data?.length>0? 
        <>
        <h1>My cart ({data.length})</h1>
        <div className={styles["cart-container"]}>
          <div className={styles["cart-items"]}>
            {data.map((item)=>(
              <div className={styles["single-cart-item"]}>
                <div className={styles["item-img-info"]}>
                  <img src={item.info.img} alt="" />
                  <div className={styles["single-cart-item-info"]}>
                    <h5>{item.info.name[lang]}</h5>
                    <p>
                  { item?.attributes?
                    Object.keys(item?.attributes).map((attr)=>(
                      attr+" : "+item.attributes[attr]+", "
                    ))
                    :""}
                    </p>
                    <button id={item.itemId} onClick={handleDeleteFromCart}>Remove</button>
                  </div>
                </div>
                <div className={styles["item-price-quantity"]}>
                    <h5>{item?.info?.price} TND</h5>
                    <p><span>Quantity</span> <span>{item.quantity}</span></p>
                </div>
              </div>
            ))}
            <div className={styles["single-cart-item"]}>
              <button>Back to shop</button>
              <button onClick={handleDeleteAllFromCart}>Remove all</button>
            </div>
          </div>
          <div className={styles["cart-checkout"]}>
              <div className={styles["cart-checkout-info"]}>
                  <p><span>Subtotal:</span><span>{subTotalPrice} TND</span></p>
                  <p><span>Delivery:</span><span>7 TND</span></p>
                  <p><span>Tax:</span><span>0 TND</span></p>
                  <div className={styles["cart-checkout-total-line"]}></div>
                  <p className={styles["total"]}><span>Total:</span><span>{totalPrice} TND</span></p>
                  <button onClick={handleCheckOut}>Checkout</button>
              </div>
          </div>
        </div>
        </>
        : 
        <div className={styles["empty-cart"]}>
          <img src="/assets/images/emptycart.png" alt="" />
          <h4>Your cart is empty</h4>
          <p>Looks like you have not added anything to your cart. Go ahead & explore top categories</p>
        </div>
        }
        <div className={styles["free-delivery-banner"]}>
          <div className={styles["top-free-del"]}>
            <p>Free delivery on more than 300 TND</p>
          </div>
          <button onClick={(e)=>{navigate("/")}} className={styles["shop-now"]}>
            Shop now
          </button>
        </div>
        </>
      : 
        <div className="spinner">
            <Spinner animation="border" />
        </div>   
      }
    </main>
  );
};

export default Store;