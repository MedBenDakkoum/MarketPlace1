import React,{useState,useEffect} from 'react'
import { CTable,CTableRow,CTableHeaderCell,CTableDataCell,CTableHead ,CTableBody} from '@coreui/react';
import { useNavigate } from 'react-router-dom';

const orderProdcuts = [
    {
        ref: "01234567",
        productName:"Shirt",
        price:15.6,
        adminCommission:1.2,
        supplierTax:0.8,
        sellerAmount:13,
        status:"Validated",
        orderdOn:"01-28-2024"
    },
    {
        ref: "01234567",
        productName:"Pants",
        price:35.5,
        adminCommission:3.5,
        supplierTax:2,
        sellerAmount:30,
        status:"Not Validated",
        orderdOn:"01-28-2024"
    },
    {
        ref: "00000000",
        productName:"Shoes",
        price:150,
        adminCommission:8,
        supplierTax:5,
        sellerAmount:137,
        status:"Validated",
        orderdOn:"01-28-2024"
    }
]

function MpSingleOrdersView() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    useEffect(()=> {
        let rows1 = orderProdcuts.map((element, index) => (
            <CTableRow key={element.id} color='light'>
                <CTableDataCell>#</CTableDataCell>
                <CTableDataCell>{element.ref}</CTableDataCell>
                <CTableDataCell>{element.productName}</CTableDataCell>
                <CTableDataCell>{element.price}</CTableDataCell>
                <CTableDataCell>{element.adminCommission}</CTableDataCell>
                <CTableDataCell>{element.supplierTax}</CTableDataCell>
                <CTableDataCell>{element.sellerAmount}</CTableDataCell>
                <CTableDataCell>{element.status}</CTableDataCell>
                <CTableDataCell>{element.orderdOn}</CTableDataCell>
                {/* <CTableDataCell>View Order</CTableDataCell> */}
            </CTableRow>
        ));
        setRows(rows1);
    },[])
    return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>Orders of ID: {5}</h3>
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
            </CTableRow>
        </CTableHead>
        <CTableBody>
            {rows}
        </CTableBody>
        </CTable>
    </main>
    
  )
}

export default MpSingleOrdersView