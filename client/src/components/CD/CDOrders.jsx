import React,{useState,useEffect} from "react";
import {LineChart,PieChart} from '@mui/x-charts';
import { useNavigate } from "react-router-dom";
import { CForm,CCol,CFormSelect,CRow, CButton} from '@coreui/react';
import { BsCart, BsCartCheckFill, BsCartFill } from "react-icons/bs";
import { MDBDataTable } from 'mdbreact';
import {getOrders,cancelOrder} from '../../services/userData'
import { Spinner } from 'react-bootstrap';
import { ThreeDots } from 'react-loader-spinner'
import Swal from 'sweetalert2';

function CDOrders() {
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
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
  },[refresh, setRefresh]);
  const handleCancelOrder = (e)=>{
    let id=""
      if(e.target==e.currentTarget){
        id = e.target.getAttribute("id");
      }else{
        id = e.target.parentNode.getAttribute("id");
      }
      Swal.fire({
        title: "Do you want to cancel this order?",
        showCancelButton: true,
        cancelButtonText:"Exit",
        confirmButtonText: "Cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
            await cancelOrder(id)
            .then(function(e){
                Swal.fire({
                    icon: "success",
                    title: "Order Canceled !",
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
    let newOrders =[...orderData]
    newOrders.map((item)=>{
      item.ref = item.ref || <p style={{color:"rgb(255, 71, 71)"}}>#</p>;
      if(item.status=="COMPLETED" || item.status=="CANCELED"){
        item.actions = "No actions";
      }else{
        item.actions = <CButton id={item._id} onClick={handleCancelOrder}>Cancel</CButton>;
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
                className="table-cd-sd mdbdatatableclass"
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