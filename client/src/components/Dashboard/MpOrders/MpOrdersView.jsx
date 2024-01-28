import React,{useState,useEffect} from 'react'
import { CTable,CTableRow,CTableHeaderCell,CTableDataCell,CTableHead ,CTableBody} from '@coreui/react';
import { useNavigate } from 'react-router-dom';

const sellerOrders = [
    {
        id: 1,
        customerName:"Customer 1",
        totalPrice:45.6,
        adminCommission:3,
        supplierTax:2.6,
        sellerAmount:40,
        status:"Validated",
        orderdOn:"01-26-2023"
    },
    {
        id: 2,
        customerName:"Customer 2",
        totalPrice:78.4,
        adminCommission:5,
        supplierTax:3.4,
        sellerAmount:70,
        status:"Not Validated",
        orderdOn:"01-28-2023"
    },
    {
        id: 3,
        customerName:"Customer 3",
        totalPrice:78.4,
        adminCommission:5,
        supplierTax:3.4,
        sellerAmount:70,
        status:"Shipped",
        orderdOn:"01-20-2024"
    },
    {
        id: 4,
        customerName:"Customer 4",
        totalPrice:78.4,
        adminCommission:5,
        supplierTax:3.4,
        sellerAmount:70,
        status:"Received",
        orderdOn:"02-11-2023",
        products:[{
            productRef:"",
        }]
    }
]

function MpOrdersView() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    useEffect(()=> {
        let rows1 = sellerOrders.map((element, index) => (
            <CTableRow key={element.id} color='light'>
                <CTableDataCell>#</CTableDataCell>
                <CTableDataCell>{element.id}</CTableDataCell>
                <CTableDataCell>{element.customerName}</CTableDataCell>
                <CTableDataCell>{element.totalPrice}</CTableDataCell>
                <CTableDataCell>{element.adminCommission}</CTableDataCell>
                <CTableDataCell>{element.supplierTax}</CTableDataCell>
                <CTableDataCell>{element.sellerAmount}</CTableDataCell>
                <CTableDataCell>{element.status}</CTableDataCell>
                <CTableDataCell>{element.orderdOn}</CTableDataCell>
                <CTableDataCell><a style={{color:"blue",cursor:'pointer'}} onClick={(e)=>{navigate("/admin/mp/orders/"+element.id)}}>View Orders</a></CTableDataCell>
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
                <CTableHeaderCell scope="col">Order ID</CTableHeaderCell>
                <CTableHeaderCell scope="col">Customer Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Total Price</CTableHeaderCell>
                <CTableHeaderCell scope="col">Admin Tax</CTableHeaderCell>
                <CTableHeaderCell scope="col">Supplier Tax</CTableHeaderCell>
                <CTableHeaderCell scope="col">Seller amount</CTableHeaderCell>
                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                <CTableHeaderCell scope="col">Order Date</CTableHeaderCell>
                <CTableHeaderCell scope="col">View Orders</CTableHeaderCell>
            </CTableRow>
        </CTableHead>
        <CTableBody>
            {rows}
        </CTableBody>
        </CTable>
    </main>
    
  )
}

export default MpOrdersView