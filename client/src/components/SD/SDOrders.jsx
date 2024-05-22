import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { CButton} from '@coreui/react';
import { MDBDataTable } from 'mdbreact';
import {getOrders,passOrderToSupplier} from '../../services/storeData';
import SDClientCard from './SDClientCard';
import Swal from 'sweetalert2';
import { ThreeDots } from 'react-loader-spinner'

function SDOrders() {
    const navigate= useNavigate();
    const [refresh,setRefresh]=useState(false);
    const [loading,setLoading]=useState(false);
    const [orderData,setOrderData] = useState([]);
    const [orderDataRows,setOrderDataRows] = useState([]);
    const [clientView,setClientView] = useState({
      active:false,
      clientViewId:""
    });
    useEffect(function(){
      async function init(){
        let ods = await getOrders();
        setOrderData(ods);
      }
      init()
    },[refresh,setRefresh]);
    const handleViewClient = async (e)=>{
      setClientView({active: true, clientViewId: e.target.id.toString()})
    }
    const handlePassOrderToSupplier = (e)=>{
      let id=""
      if(e.target==e.currentTarget){
        id = e.target.getAttribute("id");
      }else{
        id = e.target.parentNode.getAttribute("id");
      }
      Swal.fire({
        title: "Do you want to send this order to the supplier?",
        showCancelButton: true,
        cancelButtonText:"Cancel",
        confirmButtonText: "Send",
      }).then(async (result) => {
        if (result.isConfirmed) {
            await passOrderToSupplier(id)
            .then(function(e){
                Swal.fire({
                    icon: "success",
                    title: "Order sent !",
                    showConfirmButton: false,
                    timer: 1000
                });
                setRefresh(!refresh);
                setLoading(false);
            }).catch(function(err){
              
                Swal.fire({
                    icon: "error",
                    title: "Oops !",
                    text: err.response.data.msg,
                });
                setLoading(false);
                });
        }
      });
    }
    useEffect(function(){
      console.log(clientView.clientViewId);
    },[clientView,setClientView])
    useEffect(function(){
      let newOrders =[...orderData]
      newOrders.map((item)=>{
        item.ref = item.ref || <p style={{color:"rgb(255, 71, 71)"}}>#</p>;
        if(item.prices.sellerTotalPrice == "0#"){
          item.sellerTotalPrice = "DELETED"
          item.clientTotalPrice = "DELETED"
          item.sellerEarnings = "DELETED"
        }else{
          item.sellerTotalPrice = item.prices.sellerTotalPrice.toFixed(2) +" TND";
          item.clientTotalPrice = item.prices.clientTotalPrice.toFixed(2) +" TND";
          item.sellerEarnings = item.prices.sellerEarnings.toFixed(2)+" TND";
        }
        if(!item.passedToSupplier){
          item.actions = <CButton id={item.orderId} onClick={handlePassOrderToSupplier}>Make Order</CButton>;
        }else{
          item.actions = "No actions"
        }
        if(item.status=="PENDING"){
          item.status = (<p style={{color:"red"}}>{item.status}</p>)
        }
        item.client = (<p id={item.clientId} onClick={handleViewClient} style={{color:"blue",cursor:"pointer"}}>View</p>)
      })
      setOrderDataRows([...newOrders])
    },[orderData,setOrderData])
    const data = {
      columns: [
        {
          label: 'ID',
          field: 'orderId',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Client',
          field: 'client',
          sort: 'asc',
          width: 270
        },
        {
          label: 'Reference',
          field: 'ref',
          sort: 'asc',
          width: 270
        },
        {
          label: 'Payment',
          field: 'paymentMethod',
          sort: 'asc',
          width: 200
        },
        {
          label: 'Status',
          field: 'status',
          sort: 'asc',
          width: 200
        },
        {
          label: 'Client Price',
          field: 'clientTotalPrice',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Seller Price',
          field: 'sellerTotalPrice',
          sort: 'asc',
          width: 200
        },
        {
          label: 'Seller Earnings',
          field: 'sellerEarnings',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Actions',
          field: 'actions',
          sort: 'asc',
          width: 150
        },
      ],
      rows:orderDataRows
    };
    const handleCloseClientCard = (e)=>{
      setClientView({active:false,clientViewId:""});
    }
    const handleSetViewClientCard = (e)=>{
      setClientView({...clientView,active:e})
    }
    return (
      <main className="sd-container">
          <ThreeDots
              visible={loading}
              height="100"
              width="100"
              color="#4fa94d"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass="overlay-spinner"
          />
          <SDClientCard active={clientView.active} setActive={handleSetViewClientCard} handleCloseClientCard={handleCloseClientCard} clientId={clientView.clientViewId} /> 
          <div className="sd-section-title">
            <h1>Orders</h1>
          </div>
          <div className="sd-section-main">
              <MDBDataTable
                striped
                small
                noBottomColumns={true}
                style={{color:"white"}}
                data={data}
              />
          </div>
      </main>
    );
}

export default SDOrders;
