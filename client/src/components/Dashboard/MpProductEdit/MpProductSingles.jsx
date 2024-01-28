import React, { useEffect, useState } from 'react'
import { CTable,CTableRow,CTableHeaderCell,CTableDataCell,CTableHead ,CTableBody} from '@coreui/react';
import Switch from "react-switch";
import { useNavigate } from "react-router-dom";

const products = [
    {
        reference:"00100061",
        img:"https://etajer.com.tn/1/image1.jpg",
        name:"Shirt 1",
        sellersCount:14,
        averagePrice:42
    },
    {
        reference:"00510898",
        img:"https://etajer.com.tn/2/image2.jpg",
        name:"Shirt 2",
        sellersCount:7,
        averagePrice:64
    }
]

function MpProductSingles() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    useEffect(()=> {
        let rows1 = products.map((element, index) => (
            <CTableRow onClick={(e)=>{ navigate("/admin/mp/products/ProductID") }} className='clickable' key={element.reference} color='light'>
                <CTableDataCell>#</CTableDataCell>
                <CTableDataCell>{element.reference}</CTableDataCell>
                <CTableDataCell><img className="product-mp-img" src={element.img}/></CTableDataCell>
                <CTableDataCell>{element.name}</CTableDataCell>
                <CTableDataCell>{element.sellersCount}</CTableDataCell>
                <CTableDataCell>{element.averagePrice}</CTableDataCell>
                <CTableDataCell><Switch onClick={(e)=>{}} onChange={(e)=>{}} checked={true} /></CTableDataCell>
            </CTableRow>
        ));
        setRows(rows1);
    },[])
    
    return (        
        <CTable>
            <CTableHead>
                <CTableRow color='light'>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Ref</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Image</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Sellers count</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Average price</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Active</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                {rows}
            </CTableBody>
        </CTable>
  )
}

export {MpProductSingles};