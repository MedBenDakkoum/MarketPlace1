import React,{useState,useEffect} from 'react'
import { CTable,CTableRow,CTableHeaderCell,CTableDataCell,CTableHead ,CTableBody} from '@coreui/react';
import { useNavigate } from 'react-router-dom';


const carts = [
    {
        id:1,
        customerName:"Customer 1",
        total:214.99,
        nbrProducts:4,
        lastUpdated:"01-29-2024",
    },
    {
        id:2,
        customerName:"Customer 2",
        total:45.99,
        nbrProducts:1,
        lastUpdated:"01-29-2024",
    },
    {
        id:3,
        customerName:"Customer 3",
        total:140.48,
        nbrProducts:3,
        lastUpdated:"01-29-2024",
    },
    {
        id:4,
        customerName:"Customer 4",
        total:653.45,
        nbrProducts:7,
        lastUpdated:"01-29-2024",
    },
    {
        id:5,
        customerName:"Customer 5",
        total:84.5,
        nbrProducts:2,
        lastUpdated:"01-29-2024",
    }
]
function AdminCarts() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    useEffect(()=> {
        let rows1 = carts.map((element, index) => (
            <CTableRow key={element._id} color='light'>
                <CTableDataCell>#</CTableDataCell>
                <CTableDataCell>{element.id}</CTableDataCell>
                <CTableDataCell>{element.customerName}</CTableDataCell>
                <CTableDataCell>{element.total} TND</CTableDataCell>
                <CTableDataCell>{element.nbrProducts}</CTableDataCell>
                <CTableDataCell>{element.lastUpdated}</CTableDataCell>
                <CTableDataCell><a onClick={()=>{navigate('/admin/carts/'+element.id)}} style={{cursor:"pointer",color:"blue"}}>View</a></CTableDataCell>
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
            <CTableHeaderCell scope="col">Customer</CTableHeaderCell>
            <CTableHeaderCell scope="col">Total</CTableHeaderCell>
            <CTableHeaderCell scope="col">Products</CTableHeaderCell>
            <CTableHeaderCell scope="col">Last updated</CTableHeaderCell>
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

export default AdminCarts;