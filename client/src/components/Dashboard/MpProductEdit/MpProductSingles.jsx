import React, { useEffect, useState } from 'react'
import { CTable,CTableRow,CTableHeaderCell,CTableDataCell,CTableHead ,CTableBody} from '@coreui/react';
import Switch from "react-switch";
import { MDBDataTable } from 'mdbreact';
import { useNavigate } from "react-router-dom";
import {getMpProducts} from "../../../services/adminService"

function MpProductSingles() {
    const lang = localStorage.getItem("lang");
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const data = {
        columns: [
          {
            label: 'Ref',
            field: 'reference'
          },
          {
            label: 'Image',
            field: 'img',
          },
          {
            label: 'Name',
            field: 'name',
          },
          {
            label: 'Sellers Count',
            field: 'sellersCount',
          },
          {
            label: 'Average Price',
            field: 'avgPrice',
          },
          {
            label: 'Active',
            field: 'active',
          },
        ],
        rows:rows
      };
    useEffect(function(){
        async function init(){
            let prods = await getMpProducts();
            setRows(prods)
        }
        init()
    },[])
    useEffect(()=> {
        rows.map((element) => {
            element.name = element.name[lang];
            element.img = (<img className="product-mp-img" src={element.img}/>);
            element.active = (<Switch onClick={(e)=>{}} checked={element.active} disabled/>)
        });
    },[rows, setRows]);
    
    return (        
        <MDBDataTable
        striped
        small
        noBottomColumns={true}
        style={{color:"white"}}
        data={data}
        />
  )
}

export {MpProductSingles};