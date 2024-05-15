import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { CButton} from '@coreui/react';
import { MDBDataTable } from 'mdbreact';
import {getOrders} from '../../services/storeData';
import SDClientCard from './SDClientCard'
function SDOrders() {
    const navigate= useNavigate();
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
    },[]);
    const handleViewClient = async (e)=>{
      setClientView({active: true, clientViewId: e.target.id.toString()})
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
        if(item.status=="Completed"){
          item.actions = "No actions";
        }else if(item.status=="Pending"){
          item.actions = <CButton>Make Order</CButton>;
        }
        if(item.status=="Pending"){
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
