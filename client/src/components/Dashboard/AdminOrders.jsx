import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import { getOrders } from '../../services/adminService'

function AdminOrders() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const data = {
        columns: [
          {
            label: 'ID',
            field: 'orderId',
          },
          {
            label: 'Ref',
            field: 'ref'
          },
          {
            label: 'Total',
            field: 'totalPrice',
          },
          {
            label: 'Payment',
            field: 'paymentMethod',
          },
          {
            label: 'Status',
            field: 'status',
          },
          {
            label: 'Verified',
            field: 'verified',
          },
          {
            label: 'Date',
            field: 'date',
          },
          {
            label: '--',
            field: 'actions',
          },
        ],
        rows:rows
      };
    useEffect(()=> {
        async function init(){
            let orders = await getOrders();
            setRows(orders);
        }
        init();
    },[])
    useEffect(()=>{
        rows.map((item)=>{
            item.actions = (<a onClick={()=>{navigate('/admin/orders/'+item._id)}} style={{cursor:"pointer",color:"blue"}}>View Order</a>)
            item.ref = item.reference || "#";
            item.totalPrice = item.totalPrice + " TND";
            item.verified = item.isVerified? <p style={{color:"green"}}>Yes</p> : <p style={{color:"red"}}>No</p>;
        })
    },[rows,setRows])
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

export default AdminOrders;