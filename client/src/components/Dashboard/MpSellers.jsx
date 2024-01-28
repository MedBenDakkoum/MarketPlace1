import React, { useEffect, useState } from 'react'
import { CTable,CTableRow,CTableHeaderCell,CTableDataCell,CTableHead ,CTableBody} from '@coreui/react';
import {getSellers} from '../../services/sellerData';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';


function MpSellers() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    useEffect(()=> {
        async function sellersGet(){
            let sellers = await getSellers();
            let rows1 = sellers.map((element, index) => (
                <CTableRow key={element._id} color='light'>
                    <CTableDataCell>#</CTableDataCell>
                    <CTableDataCell>{element.userId}</CTableDataCell>
                    <CTableDataCell>{element.name}</CTableDataCell>
                    <CTableDataCell>{element.email}</CTableDataCell>
                    <CTableDataCell>{element.storeName}</CTableDataCell>
                    <CTableDataCell>{element.phoneNumber}</CTableDataCell>
                    <CTableDataCell>{element.status}</CTableDataCell>
                    <CTableDataCell>{moment(element.createdAt).format('YYYY-MM-DD')}</CTableDataCell>
                    <CTableDataCell><a href={'/seller/'+element._id}>See Profile</a></CTableDataCell>
                    <CTableDataCell><a onClick={()=>{navigate('/admin/mp/sellers/'+element._id)}} style={{cursor:"pointer",color:"blue"}}>Edit Profile</a></CTableDataCell>
                </CTableRow>
            ));
            setRows(rows1);
        }
        sellersGet()
    },[])
    
    return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>Sellers</h3>
        </div>
        <CTable>
        <CTableHead>
            <CTableRow color='light'>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">User ID</CTableHeaderCell>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
            <CTableHeaderCell scope="col">Store Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Phone Number</CTableHeaderCell>
            <CTableHeaderCell scope="col">Status</CTableHeaderCell>
            <CTableHeaderCell scope="col">Created At</CTableHeaderCell>
            <CTableHeaderCell scope="col">--</CTableHeaderCell>
            <CTableHeaderCell scope="col">--</CTableHeaderCell>
            </CTableRow>
        </CTableHead>
        <CTableBody>
            {rows}
        </CTableBody>
        </CTable>
    </main>
  )
}

export default MpSellers