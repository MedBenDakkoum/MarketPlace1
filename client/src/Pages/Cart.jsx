import React,{useState,useEffect} from "react";
import "../components/Cart/Cart.css"
import { useParams,useNavigate, useNavigationType } from "react-router-dom";
import {getCart,deleteFromCart,makeOrder,getAddress} from "../services/userData";
import { MDBDataTable } from 'mdbreact';
import { BsTrash, BsTrash2Fill, BsXCircleFill } from "react-icons/bs";
import { CButton,CFormCheck} from '@coreui/react';
import Alert from '../components/Alert/Alert';

const Store = () => {
  const navigate = useNavigate();
  const [data,setData] = useState([]);
  const [address,setAddress] = useState([]);
  const [totalPrice,setTotalPrice] = useState(0);
  const [refresh,setRefresh] = useState(false);
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
  const handleDeleteFromCart = async (e)=>{
    let id="";
    if(e.target==e.currentTarget){
        id=e.target.getAttribute("id");
    }else{
        id=e.target.parentNode.getAttribute("id");
    }
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
  const handleCheckOut = (e)=>{

    setConfirmOrder(true);
  }
  const handleExitChekout = (e)=>{
    setConfirmOrder(false);
  }
  useEffect(function(){
    async function init(){
        let cart = await getCart();
        setData(cart);
        let addressInfo = await getAddress();
        setAddress(addressInfo)
    }
    init();
  },[refresh,setRefresh])
  const getTotal = async ()=> {
    return new Promise(async (resolve, reject) => {
        let s=0
        let i=0
        data.forEach((e)=>{
            s+=parseInt(e.total.slice(0, e.total.length-4));
            if(i==data.length-1){
                resolve(s);
            } 
            i++;
        })
    })
  }
  const handleBuyNow = async (e)=>{
    if(paymentMethod!==""){
      await makeOrder({paymentMethod:paymentMethod}).then(function(e){
        setAlert({msg:"Order done successfully!",type:"success",refresh:!alert.refresh})
      }).catch(function(e){
        setAlert({msg:"Error passing order!",type:"fail",refresh:!alert.refresh});
      });
    }else{
      setAlert({msg:"Please select a payment method!",type:"fail",refresh:!alert.refresh})
    }
  }
  const handleChangePaymentMethod = (e)=>{
    e.target.checked=true;
    setPaymentMethod(e.target.value);
  }
  useEffect(function(){
    let newRows =[...data]
        newRows.map(async (item)=>{
            let pInfo = item.info;
            item.item = (
                <div className="item-cart-info">
                    <img src={pInfo.img} className="cart-item-img"/>
                    <div className="item-info">
                        <h3>
                            {pInfo.name}
                        </h3>
                        <ul>
                            {Object.keys(item.attributes).map((e)=>(
                                <li key={e}>{e} : {item.attributes[e]}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
            let prodPrice = pInfo.price;
            item.price = (
                prodPrice+" TND"
            )
            item.total = (
                prodPrice*item.quantity+" TND"
            )
            item.delete = (
                <BsTrash onClick={handleDeleteFromCart} id={item.itemId} style={{fontSize:"25px",cursor:"pointer"}}/>
            )
        })
      setDataRows([...newRows])
      getTotal().then((total)=>{
        setTotalPrice(total);
      })
  },[data,setData]);

  return (
    <main className="store-container">
      <Alert msg={alert.msg} type={alert.type} refresh={alert.refresh}/>
      {
        confirmOrder?
          <div className="confirm-order-container">
            <div className="confirm-order">
            {/* <div className="cart-total-data-container"> */}
            <div className="cart-total-data confirm-section">
                <div className="exit-check-out">
                  <BsXCircleFill onClick={handleExitChekout} style={{color:"red",fontSize:"24px",cursor:"pointer"}}/>
                </div> 
                <p style={{maxWidth:"100%"}}><span>Total:</span> {totalPrice} TND</p>
                <div className="cart-address-info confirm-section">
                    <p><span>Address 1:</span> {address?.line1}</p>
                    <p><span>Address 2:</span> {address?.line2}</p>
                    <p><span>Country:</span> {address?.country}</p>
                    <p><span>State:</span> {address?.state}</p>
                    <p><span>City:</span> {address?.city}</p>
                    <p><span>Zip Code:</span> {address?.zipCode}</p>
                    <a onClick={(e)=>{navigate("/cd")}} style={{color:"#007bff",cursor:"pointer"}}>Change address</a>
                </div>
                <div className="confirm-section-payment">
                  <h3>Payment Method:</h3>
                  <div className="single-payment-method">
                    <CFormCheck type="radio" onChange={handleChangePaymentMethod} value="onDelivery" id="paymentMethodCash" name="paymentMethod" label="Cash on delivery" />
                    <span>Pay with cash upon delivery ( + 7 TND )</span>
                  </div>
                </div>
                <CButton type="button" onClick={handleBuyNow}>Buy Now</CButton>
            {/* </div> */}
               </div>
            </div>
          </div> 
        :
        ""
      }
      {dataRows.length>0?
      <>
        <h1>Shopping Cart:</h1>
        <MDBDataTable
            striped
            small
            className="cart-table"
            noBottomColumns={true}
            style={{color:"white"}}
            data={cartProds}
        />
        
        <div className="cart-total-data-container">
            <div className="cart-total-data">
                <p><span>Total:</span> {totalPrice} TND</p>
                <div className="cart-address-info">
                    <p><span>Address 1:</span> {address?.line1}</p>
                    <p><span>Address 2:</span> {address?.line2}</p>
                    <p><span>Country:</span> {address?.country}</p>
                    <p><span>State:</span> {address?.state}</p>
                    <p><span>City:</span> {address?.city}</p>
                    <p><span>Zip Code:</span> {address?.zipCode}</p>
                    <a onClick={(e)=>{navigate("/cd")}} style={{color:"#007bff",cursor:"pointer"}}>Change address</a>
                </div>
                <CButton type="button" onClick={handleCheckOut}>Check Out</CButton>
            </div>
        </div>
        </>
        :
        <h1>Shopping Cart is empty</h1>
        }
    </main>
  );
};

export default Store;