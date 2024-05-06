import React, { useEffect, useState } from 'react'
import {CButton, CTable,CTableRow,CTableHeaderCell,CTableDataCell,CTableHead ,CTableBody} from '@coreui/react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import Switch from "react-switch"
import { updateSeller,getSellers } from '../../services/adminService';
import { ThreeDots } from 'react-loader-spinner'
import Swal from 'sweetalert2';
import { MDBDataTable } from 'mdbreact';

function MpSellers() {
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);
    const [sellers,setSellers] = useState([]);
    const [rows, setRows] = useState([]);
    const data = {
        columns: [
          {
            label: 'ID',
            field: 'userId',
            width: 150
          },
          {
            label: 'Name',
            field: 'name',
            width: 150
          },
          {
            label: 'Email',
            field: 'email',
            width: 200
          },
          {
            label: 'Store Name',
            field: 'storeName',
            width: 100
          },
          {
            label: 'Phone Number',
            field: 'phoneNumber',
            width: 100
          },
          {
            label: 'Status',
            field: 'status',
            width: 100
          },
          {
            label: 'Created At',
            field: 'createdAt',
            width: 100
          },
          {
            label: '--',
            field: 'seeProfile',
            width: 100
          },
          {
            label: '--',
            field: 'editProfile',
            width: 100
          }
        ],
        rows:rows
      };
    const handleActiveChange = async (c,e,id)=>{
        setLoading(true);
        await updateSeller(sellers[parseInt(id)]._id, {seller:{isActive:c}})
        .then((rslt)=>{
            let newSellers = [...sellers]
            sellers[parseInt(id)].isActive=c;
            setSellers(newSellers);
            setLoading(false);
            Swal.fire({
                icon: "success",
                title: "Settings Updated",
                showConfirmButton: false,
                timer: 1500
            });
        })
        .catch((e)=>{
            setLoading(false);
            Swal.fire({
                icon: "error",
                title: "Oops !",
                text: e.message,
            });
        })
    }
    useEffect(()=> {
        async function sellersGet(){
            let sellersData = await getSellers();
            setSellers(sellersData);
        }
        sellersGet()
    },[])
    useEffect(()=>{
        let rows1 = [...sellers];
        let i =0;
        rows1.map((element) => {
            element.status  =(<Switch onChange={handleActiveChange} id={i} checked={element.isActive}/>);
            element.createdAt  = moment(element.createdAt).format('YYYY-MM-DD');
            element.seeProfile = (<a href={'/seller/'+element._id}>See Profile</a>)
            element.editProfile = (<a onClick={()=>{navigate('/admin/mp/sellers/'+element._id)}} style={{cursor:"pointer",color:"blue"}}>Edit Profile</a>)
            i++;
        });
        setRows(rows1);
    },[sellers,setSellers])
    return (
    <main className='main-container'>
        <ThreeDots
            visible={loading}
            height="100"
            width="100"
            color="#4fa94d"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass="overlay-spinner"
        />
        <div className='main-title'>
            <h3>Sellers</h3><CButton onClick={()=>{navigate('/admin/mp/seller/add')}} type="button">Add Seller</CButton>
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

export default MpSellers