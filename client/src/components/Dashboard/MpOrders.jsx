import React,{useState,useEffect} from 'react'
import { CTable,CTableRow,CTableHeaderCell,CTableDataCell,CTableHead ,CTableBody} from '@coreui/react';
import { useNavigate } from 'react-router-dom';

const sellersOrders = [
    {
        id: 1,
        storeName:"Store 1",
        sellerName:"Seller 1",
        sellerEmail:"seller1@gmail.com",
        totalOrders:5
    },
    {
        id: 2,
        storeName:"Store 2",
        sellerName:"Seller 2",
        sellerEmail:"seller2@gmail.com",
        totalOrders:8
    }
]

function MpOrders() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    useEffect(()=> {
        let rows1 = sellersOrders.map((element, index) => (
            <CTableRow key={element.id} color='light'>
                <CTableDataCell>#</CTableDataCell>
                <CTableDataCell>{element.id}</CTableDataCell>
                <CTableDataCell>{element.storeName}</CTableDataCell>
                <CTableDataCell>{element.sellerName}</CTableDataCell>
                <CTableDataCell>{element.sellerEmail}</CTableDataCell>
                <CTableDataCell>{element.totalOrders}</CTableDataCell>
                <CTableDataCell><a style={{color:"blue",cursor:'pointer'}} onClick={(e)=>{navigate("/admin/mp/sellers/"+element.id+"/orders")}}>View Orders</a></CTableDataCell>
            </CTableRow>
        ));
        setRows(rows1);
    },[])
    return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>Seller Orders</h3>
        </div>
        <CTable>
        <CTableHead>
            <CTableRow color='light'>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Seller ID</CTableHeaderCell>
            <CTableHeaderCell scope="col">Store Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Seller Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Seller Email</CTableHeaderCell>
            <CTableHeaderCell scope="col">Total Orders</CTableHeaderCell>
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

export default MpOrders