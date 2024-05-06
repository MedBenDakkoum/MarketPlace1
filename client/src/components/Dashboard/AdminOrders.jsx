import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import { getOrders } from '../../services/adminService'

function AdminOrders() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const data = {
        columns: [
          {
            label: 'ID',
            field: 'orderId',
          },
          {
            label: 'Ref',
            field: 'ref'
          },
          {
            label: 'Total',
            field: 'totalPrice',
          },
          {
            label: 'Payment',
            field: 'paymentMethod',
          },
          {
            label: 'Status',
            field: 'status',
          },
          {
            label: 'Date',
            field: 'date',
          },
          {
            label: '--',
            field: 'actions',
          },
        ],
        rows:rows
      };
    useEffect(()=> {
        async function init(){
            let orders = await getOrders();
            setRows(orders);
        }
        init();
    },[])
    useEffect(()=>{
        rows.map((item)=>{
            item.actions = (<a onClick={()=>{navigate('/admin/orders/'+item._id)}} style={{cursor:"pointer",color:"blue"}}>View Order</a>)
            item.ref = item.reference || "#";
            item.totalPrice = item.totalPrice + " TND";
        })
    },[rows,setRows])
    return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>Orders</h3>
        </div>
        {/* <CTable>
        <CTableHead>
            <CTableRow color='light'>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">ID</CTableHeaderCell>
              <CTableHeaderCell scope="col">Ref</CTableHeaderCell>
              <CTableHeaderCell scope="col">New Client</CTableHeaderCell>
              <CTableHeaderCell scope="col">Customer</CTableHeaderCell>
              <CTableHeaderCell scope="col">Total</CTableHeaderCell>
              <CTableHeaderCell scope="col">Payment</CTableHeaderCell>
              <CTableHeaderCell scope="col">Status</CTableHeaderCell>
              <CTableHeaderCell scope="col">Date</CTableHeaderCell>
              <CTableHeaderCell scope="col">--</CTableHeaderCell>
            </CTableRow>
        </CTableHead>
        <CTableBody>
            {rows}
        </CTableBody>
        </CTable> */}
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

export default AdminOrders;