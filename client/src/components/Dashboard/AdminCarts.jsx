import React,{useState,useEffect} from 'react'
import { CTable,CTableRow,CTableHeaderCell,CTableDataCell,CTableHead ,CTableBody} from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import {getCarts} from '../../services/adminService';
import moment from 'moment';
function AdminCarts() {
    const navigate = useNavigate();
    const [carts,setCarts] = useState([]);
    const [rows, setRows] = useState([]);
    const data = {
        columns: [
          {
            label: 'ID',
            field: 'cartId',
            sort: 'asc',
            width: 150
          },
          {
            label: 'Name',
            field: 'customerName',
            sort: 'asc',
            width: 200
          },
          {
            label: 'Total',
            field: 'total',
            sort: 'asc',
            width: 100
          },
          {
            label: 'Products',
            field: 'nbrProducts',
            sort: 'asc',
            width: 100
          },
          {
            label: 'Last Updated',
            field: 'lastUpdated',
            sort: 'asc',
            width: 100
          }
        ],
        rows:rows
      };
    useEffect(()=> {
        async function init(){
            let carts = await getCarts();
            setCarts(carts);
        }
        init();
    },[])

    useEffect(()=> {
        let rows1 = [...carts];
        rows1.map((item)=>{
            let t = 0;
            item.cartId = item.cart.cartId || "#";
            if(item.items.length>0){
                item.items.forEach(function(it){
                    t+=it.info.price-it.quantity;
                })
            }
            item.total=t+ " TND";
            item.nbrProducts= item.items.length;
            item.lastUpdated = moment(item.cart.updatedAt).format("YYYY-MM-DD") || "";
        })
        setRows(rows1);
    },[carts,setCarts])

    return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>Shopping Carts</h3>
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

export default AdminCarts;