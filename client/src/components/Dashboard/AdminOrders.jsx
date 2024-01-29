import React,{useState,useEffect} from 'react'
import { CTable,CTableRow,CTableHeaderCell,CTableDataCell,CTableHead ,CTableBody} from '@coreui/react';
import { useNavigate } from 'react-router-dom';


const orders = [
    {
        orderId:1,
        ref:"IELTSWADE",
        newClient:true,
        customerName:"Customer 1",
        total:214.99,
        paymentMethod:"On Delivery",
        status:"Delivered",
        date:"01-29-2024"
    }
]
function AdminOrders() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    useEffect(()=> {
        let rows1 = orders.map((element, index) => (
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
        <CTable>
        <CTableHead>
            <CTableRow color='light'>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">ID</CTableHeaderCell>
            <CTableHeaderCell scope="col">Ref</CTableHeaderCell>
            <CTableHeaderCell scope="col">New Client</CTableHeaderCell>
            <CTableHeaderCell scope="col">Customer</CTableHeaderCell>
            <CTableHeaderCell scope="col">Total</CTableHeaderCell>
            <CTableHeaderCell scope="col">Payment</CTableHeaderCell>
            <CTableHeaderCell scope="col">Status</CTableHeaderCell>
            <CTableHeaderCell scope="col">Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">--</CTableHeaderCell>
            </CTableRow>
        </CTableHead>
        <CTableBody>
            {rows}
        </CTableBody>
        </CTable>
    </main>
  )
}

export default AdminOrders;