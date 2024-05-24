import React, { useEffect, useState } from 'react'
import {CButton, CTable,CTableRow,CTableHeaderCell,CTableDataCell,CTableHead ,CTableBody} from '@coreui/react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import Switch from "react-switch"
import { updateSeller,getSellers ,removeSeller} from '../../services/adminService';
import { ThreeDots } from 'react-loader-spinner'
import Swal from 'sweetalert2';
import { MDBDataTable } from 'mdbreact';
import { BsEyeFill, BsPencilFill,BsTrashFill} from "react-icons/bs";

function MpSellers() {
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);
    const [sellers,setSellers] = useState([]);
    const [refresh,setRefresh] = useState([]);
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
            label: 'Public',
            field: 'status',
            width: 100
          },
          {
            label: 'Suspended',
            field: 'suspended',
            width: 100
          },
          {
            label: 'Verified',
            field: 'verified',
            width: 100
          },
          {
            label: 'Created At',
            field: 'createdAt',
            width: 100
          },
          {
            label: 'Actions',
            field: 'actions',
            width: 100
          },
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
    const handleSuspendedChange = async (c,e,id)=>{
      setLoading(true);
        await updateSeller(sellers[parseInt(id)]._id, {seller:{isSuspended:c}})
        .then((rslt)=>{
            let newSellers = [...sellers]
            sellers[parseInt(id)].isSuspended=c;
            setSellers(newSellers);
            setLoading(false);
            Swal.fire({
                icon: "success",
                title: "Data Updated",
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
    },[refresh,setRefresh])
    const handleDeleteSeller = (e)=>{
        let id=""
      if(e.target==e.currentTarget){
        id = e.target.getAttribute("id");
      }else{
        id = e.target.parentNode.getAttribute("id");
      }
      Swal.fire({
        title: "Do you want to delete this seller?",
        showCancelButton: true,
        confirmButtonText: "Delete",
      }).then(async (result) => {
        if (result.isConfirmed) {
            await removeSeller(id)
            .then(function(e){
                Swal.fire({
                    icon: "success",
                    title: "Seller Removed !",
                    showConfirmButton: false,
                    timer: 1000
                });
                setRefresh(!refresh);
                setLoading(false);
            }).catch(function(err){
              
                Swal.fire({
                    icon: "error",
                    title: "Oops !",
                    text: err.response.data.msg,
                });
                setLoading(false);
                });
        }
      });
  }
    useEffect(()=>{
        let rows1 = [...sellers];
        let i =0;
        rows1.map((element) => {
            element.suspended  =(<Switch onChange={handleSuspendedChange} id={i} checked={element.isSuspended}/>);
            element.status  =(<Switch onChange={handleActiveChange} id={i} checked={element.isActive}/>);
            element.createdAt  = moment(element.createdAt).format('YYYY-MM-DD');
            element.verified  = element.isVerified? <p style={{color:"green"}}>Yes</p> : <p style={{color:"red"}}>No</p>;
            element.actions = (
              <div className="prods-actions">
                <BsPencilFill onClick={(e)=>{navigate('/admin/mp/sellers/'+element._id)}}/>
                <BsTrashFill id={element._id} onClick={handleDeleteSeller}/>
                <BsEyeFill onClick={(e)=>{navigate('/seller/'+element._id)}}/>
              </div>
            )
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