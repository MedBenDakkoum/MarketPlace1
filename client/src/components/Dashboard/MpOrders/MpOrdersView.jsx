import React,{useState,useEffect} from 'react'
import { CTable,CTableRow,CTableHeaderCell,CTableDataCell,CTableHead ,CTableBody} from '@coreui/react';
import { useNavigate ,useParams } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import {getSingleSellerOrders,getSellerById} from '../../../services/adminService'

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