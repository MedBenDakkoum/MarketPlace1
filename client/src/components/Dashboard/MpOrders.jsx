import React,{useState,useEffect} from 'react'
import { CTable,CTableRow,CTableHeaderCell,CTableDataCell,CTableHead ,CTableBody} from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import {getSellersOrders} from '../../services/adminService';

function MpOrders() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [sellersOrders,setSellersOrders] = useState([]);
    const data = {
        columns: [
          {
            label: 'User ID',
            field: 'userId',
            width: 150
          },
          {
            label: 'Store Name',
            field: 'storeName',
            width: 150
          },
          {
            label: 'Seller Name',
            field: 'sellerName',
            width: 200
          },
          {
            label: 'Seller Email',
            field: 'sellerEmail',
            width: 100
          },
          {
            label: 'Total Orders',
            field: 'totalOrders',
            width: 100
          },
          {
            label: 'View Profile',
            field: 'viewProfile',
            width: 100
          }
        ],
        rows:rows
      };
    useEffect(()=> {
        async function init(){
            let sellersOrders = await getSellersOrders();
            setSellersOrders(sellersOrders);
        }
        init();
    },[])
    useEffect(()=> {
        let rows1 = [...sellersOrders];
        rows1.map((element) => {
            element.viewProfile = (<a style={{color:"blue",cursor:'pointer'}} onClick={(e)=>{navigate("/admin/mp/sellers/"+element._id+"/orders")}}>View Orders</a>)
        });
        setRows(rows1);
    },[sellersOrders,setSellersOrders])
    return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>Seller Orders</h3>
        </div>
        <MDBDataTable
            striped
            small
            noBottomColumns={true}
            style={{color:"white"}}
            data={data}
        />
    </main>
    
  )
}

export default MpOrders