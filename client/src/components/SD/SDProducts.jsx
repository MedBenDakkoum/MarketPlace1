import React,{useState,useEffect} from "react";
import {LineChart,PieChart} from '@mui/x-charts';
import { useNavigate } from "react-router-dom";
import { CTable,CTableRow,CTableHeaderCell,CTableDataCell,CTableHead ,CTableBody} from '@coreui/react';
import { BsCart, BsCartCheckFill, BsCartFill, BsEye, BsImage, BsEyeFill, BsPencilFill, BsTrash, BsTrashFill, BsViewList } from "react-icons/bs";
import Switch from "react-switch";
import { MDBDataTable } from 'mdbreact';

const products = [
  {
      _id:"7896486846156848944861",
      reference:"00100061",
      img:"https://etajer.com.tn/1/image1.jpg",
      name:"Shirt 1",
      price:42,
      quantity:38,
      enabled:true
  },
  {
      _id:"fze684gfkjjdsf54654fdh",
      reference:"00510898",
      img:"https://etajer.com.tn/2/image2.jpg",
      name:"Shirt 2",
      price:64,
      quantity:41,
      enabled:false,
  }
]
// Ref</CTableHeaderCell>
//                     <CTableHeaderCell scope="col">Image</CTableHeaderCell>
//                     <CTableHeaderCell scope="col">Name</CTableHeaderCell>
//                     <CTableHeaderCell scope="col">Price</CTableHeaderCell>
//                     <CTableHeaderCell scope="col">Quantity</CTableHeaderCell>
//                     <CTableHeaderCell scope="col">Status</CTableHeaderCell>
//                     <CTableHeaderCell scope="col">Actions<


function SDProducts() {
    const navigate= useNavigate();
    const [rows, setRows] = useState([
      {
        _id:"7896486846156848944861",
        ref:"00100061",
        img: "https://etajer.com.tn/1/image1.jpg",
        name:"Shirt 1",
        price:42,
        quantity:38,
        enabled:true
    },
    {
        _id:"fze684gfkjjdsf54654fdh",
        ref:"00510898",
        img:"https://etajer.com.tn/2/image2.jpg",
        name:"Shirt 2",
        price:64,
        quantity:41,
        enabled:false,
    }
  ]);
  const data = {
    columns: [
      {
        label: 'Ref',
        field: 'ref',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Image',
        field: 'img',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Price',
        field: 'price',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Quantity',
        field: 'quantity',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Status',
        field: 'enabled',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Actions',
        field: 'actions',
        sort: 'asc',
        width: 100
      }
    ],
    rows:rows
  };
    useEffect(()=> {
      let newRows =[...rows]
        newRows.map((item)=>{
          item.img = (
            <img src={item.img} width="40px"/>
          )
          item.actions = (
            <div className="prods-actions"><BsPencilFill onClick={(e)=>{navigate('/dashboard/products/'+item._id)}}/><BsTrashFill/><BsImage/><BsEyeFill/></div>
          )
          item.enabled = (
            <Switch checked={item.enabled}></Switch>
          )
        })
        setRows([...newRows])
    },[])
    
    return (
      <main className="sd-container">
          <div className="sd-section-title">
            <h1>Products</h1>
          </div>
          <div className="sd-section-main">
            <MDBDataTable
              striped
              small
              noBottomColumns={true}
              style={{color:"white"}}
              data={data}
            />
          </div>
          
      </main>
    );
}

export default SDProducts;
