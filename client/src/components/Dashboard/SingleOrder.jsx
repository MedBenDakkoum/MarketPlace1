import React,{useState,useEffect} from 'react'
import { CTable,CTableRow,CTableHeaderCell,CTableDataCell,CTableHead ,CTableBody} from '@coreui/react';
import { useNavigate } from 'react-router-dom';


const order ={
    info:{
        orderId:1,
        ref:"IELTSWADE",
        newClient:true,
        customerName:"Customer 1",
        total:214.99,
        paymentMethod:"On Delivery",
        status:"Delivered",
        date:"01-29-2024"
    },
    customer:{
        id:1,
        name:"Customer 1",
        email:"customer1@gmail.com",
        registeredOn:"01-01-2024",
        completedOrders:3,
        totalSpent:140,
        address:{
            line1:"Address Line1",
            line2:"Address Line2",
            country:"Tunisia",
            state:"Monastir",
            city:"Monastir",
            zipCode:"5000"
        }
    }

    }
function SingleOrder() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    useEffect(()=> {
        let rows1 = order.map((element, index) => (
            <CTableRow key={element._id} color='light'>
                <CTableDataCell>#</CTableDataCell>
                <CTableDataCell>{element.orderId}</CTableDataCell>
                <CTableDataCell>{element.ref}</CTableDataCell>
                <CTableDataCell>{element.newClient.toString()}</CTableDataCell>
                <CTableDataCell>{element.customerName}</CTableDataCell>
                <CTableDataCell>{element.total}</CTableDataCell>
                <CTableDataCell>{element.paymentMethod}</CTableDataCell>
                <CTableDataCell>{element.status}</CTableDataCell>
                <CTableDataCell>{element.date}</CTableDataCell>
                <CTableDataCell><a onClick={()=>{navigate('/admin/orders/'+element.ref)}} style={{cursor:"pointer",color:"blue"}}>View Order</a></CTableDataCell>
            </CTableRow>
        ));
        setRows(rows1);
    },[])
    return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>Orders</h3>
        </div>
    </main>
  )
}

export default SingleOrder;