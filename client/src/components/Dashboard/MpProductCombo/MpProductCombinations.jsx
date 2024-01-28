import React, { useEffect, useState } from 'react'
import { CTable,CTableRow,CTableHeaderCell,CTableDataCell,CTableHead ,CTableBody} from '@coreui/react';
import Switch from "react-switch";
import { useNavigate } from "react-router-dom";

const products = [
    {
        reference:"00100061",
        img:"https://s3.ap-south-1.amazonaws.com/new.mm.catalog/category/d24d20cb-0bdb-4f35-aef1-b7585c43b72e.jpeg",
        products:["12374681","45698426"],
        name:"PP Half Sleeve T-Shirt and Trouser for Men Combo Pack - Black - TF-27",
        price:42
    },
    {
        reference:"00510898",
        img:"https://www.planete-informatique.tn/planet-neox/wp-content/uploads/2021/12/95817-thickbox_default-300x3001-1.jpg.webp",
        products:["00106561","00578061","08108061"],
        name:"(CLAVIER + SOURIS + CASQUE) PACK GAMER T-DAGGER T-GS003 4 EN 1 ",
        price:64
    }
]

function MpProductCombinations() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    useEffect(()=> {
        let rows1 = products.map((element, index) => (
            <CTableRow key={element.reference} color='light'>
                <CTableDataCell>#</CTableDataCell>
                <CTableDataCell><span style={{cursor:"pointer",color:"blue"}} onClick={(e)=>{ navigate("/admin/mp/productcombo/ProductID")}}>{element.reference}</span></CTableDataCell>
                <CTableDataCell><img className="product-mp-img" src={element.img}/></CTableDataCell>
                <CTableDataCell>{element.name.slice(0,20) }{element.name.length > 20? ("..."): ""}</CTableDataCell>
                <CTableDataCell><ul>{element.products.map((e)=>(
                    <li style={{listStyle:"inside"}}>
                        <span style={{cursor:"pointer",color:"blue"}} onClick={(e)=>{ navigate("/admin/mp/products/ProductID")}}>{e}</span>
                    </li>
                ))}</ul></CTableDataCell>
                <CTableDataCell>{element.price}</CTableDataCell>
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
                    <CTableHeaderCell scope="col">Products</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Active</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                {rows}
            </CTableBody>
        </CTable>
  )
}

export {MpProductCombinations};