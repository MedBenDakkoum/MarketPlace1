import React,{useState,useEffect} from 'react'
import { CButton} from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import {getOrders} from '../../services/employeeService';

function EDOrders() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [orders,setOrders] = useState([]);
    const data = {
        columns: [
          {
            label: 'ID',
            field: 'orderId',
            width: 150
          },
          {
            label: 'Reference',
            field: 'ref',
            width: 100
          },
          {
            label: 'Payment',
            field: 'paymentMethod',
            width: 100
          },
          {
            label: 'Status',
            field: 'status',
            width: 100
          },
          {
            label: 'Total Price',
            field: 'totalPrice',
            width: 100
          },
          {
            label: 'Actions',
            field: 'actions',
            sort: 'asc',
            width: 150
          },
        ],
        rows:rows
      };
    const handleVerifyOrder = (e)=>{
      let id=""
      if(e.target==e.currentTarget){
        id = e.target.getAttribute("id");
      }else{
        id = e.target.parentNode.getAttribute("id");
      }
      navigate("/employee/orders/"+id);
    }
    useEffect(()=> {
        async function init(){
            let orders = await getOrders();
            setOrders(orders);
        }
        init();
    },[])
    useEffect(()=> {
        let rows1 = [...orders];
        rows1.map((element) => {
            element.viewProfile = (<a style={{color:"blue",cursor:'pointer'}} onClick={(e)=>{navigate("/admin/mp/sellers/"+element._id+"/orders")}}>View Orders</a>)
            element.actions = (<CButton id={element._id} onClick={handleVerifyOrder}>Verify</CButton>)
            if(!element.ref){
              element.ref = "#"
            }
        });
        setRows(rows1);
    },[orders,orders])
    return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>Orders</h3>
        </div>
        <MDBDataTable
            striped
            small
            noBottomColumns={true}
            style={{color:"white"}}
            data={data}
            
        />
    </main>
    
  )
}

export default EDOrders