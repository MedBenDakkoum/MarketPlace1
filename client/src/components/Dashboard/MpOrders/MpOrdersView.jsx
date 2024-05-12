import React,{useState,useEffect} from 'react'
import { CTable,CTableRow,CTableHeaderCell,CTableDataCell,CTableHead ,CTableBody} from '@coreui/react';
import { useNavigate ,useParams } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import {getSingleSellerOrders,getSellerById} from '../../../services/adminService'


function MpOrdersView() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [sellersOrders,setSellersOrders] = useState([]);
    const [sellerInfo,setSellerInfo] = useState([]);
    const params = useParams();
    const data = {
        columns: [
          {
            label: 'User ID',
            field: 'userId',
            width: 150
          },
          {
            label: 'Customer Name',
            field: 'customerName',
            width: 150
          },
          {
            label: 'Total Price',
            field: 'totalPrice',
            width: 200
          },
          {
            label: 'Admin Commission',
            field: 'adminCommission',
            width: 100
          },
          {
            label: 'Supplier Tax',
            field: 'supplierTax',
            width: 100
          },
          {
            label: 'Seller Amount',
            field: 'sellerAmount',
            width: 100
          },
          {
            label: 'Status',
            field: 'status',
            width: 100
          },
          {
            label: 'Orderd On',
            field: 'orderdOn',
            width: 100
          }
        ],
        rows:rows
      };
    useEffect(()=> {
        async function init(){
            let sellersOrders = await getSingleSellerOrders(params.id);
            let sInfo = await getSellerById(params.id);
            setSellerInfo(sInfo);
            setSellersOrders(sellersOrders);
        }
        init();
    },[])
    useEffect(()=> {
        let rows1 = [...sellersOrders];
        setRows(rows1);
    },[sellersOrders,setSellersOrders])
    return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>Seller '{sellerInfo.name}' Orders</h3>
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

export default MpOrdersView