import React,{useState,useEffect} from "react";
import {LineChart,PieChart} from '@mui/x-charts';
import { useNavigate } from "react-router-dom";
import { CForm,CCol,CFormSelect,CRow, CButton} from '@coreui/react';
import { BsCart, BsCartCheckFill, BsCartFill } from "react-icons/bs";
import { MDBDataTable } from 'mdbreact';
import {getOrders} from '../../services/userData'
import { Spinner } from 'react-bootstrap';
import Alert from '../Alert/Alert';

function CDOrders() {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert]= useState({
    msg:"",
    type:"",
    refresh:true
})
  const [orderData,setOrderData] = useState([]);
  const [orderDataRows,setOrderDataRows] = useState([]);
  const data = {
    columns: [
      {
        label: 'ID',
        field: 'orderId',
        sort: 'asc',
        width: 150
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
        label: 'Products Price',
        field: 'totalProductsPrice',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Shipping Price',
        field: 'totalShippingPrice',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Total Price',
        field: 'totalPrice',
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
  useEffect(function(){
    async function init(){
      let ods = await getOrders();
      setOrderData(ods);
    }
    init()
  },[]);
  useEffect(function(){
    let newOrders =[...orderData]
    newOrders.map((item)=>{
      item.ref = item.ref || <p style={{color:"rgb(255, 71, 71)"}}>#</p>;
      if(item.status=="Completed"){
        item.actions = "No actions";
      }else if(item.status=="Pending"){
        item.actions = <CButton>Make Order</CButton>;
      }
      if(item.status=="Pending"){
        item.status = (<p style={{color:"red"}}>{item.status}</p>)
      }
      item.client = (<p id={item.clientId} style={{color:"blue",cursor:"pointer"}}>View</p>)
    })
    setOrderDataRows([...newOrders])
  },[orderData,setOrderData])
  return (
    <section className='cd-section-container'>
        <Alert msg={alert.msg} type={alert.type} refresh={alert.refresh}/>
        <div className="cd-section-title">
            <h1>Orders</h1>
        </div>
        {!loading?
            
            <MDBDataTable
                striped
                small
                noBottomColumns={true}
                style={{color:"white"}}
                data={data}
              />
              :
              <div className="spinner">
                  <Spinner animation="border" />
              </div> 
              }
    </section>
  )
}

export default CDOrders