import React, { useEffect, useState } from 'react'
import {CButton, CTable,CTableRow,CTableHeaderCell,CTableDataCell,CTableHead ,CTableBody} from '@coreui/react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import Switch from "react-switch"
import { updateEmployee,getEmployees } from '../../services/adminService';
import { ThreeDots } from 'react-loader-spinner'
import Swal from 'sweetalert2';
import { MDBDataTable } from 'mdbreact';

function MpEmployees() {
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);
    const [employees,setEmployees] = useState([]);
    const [rows, setRows] = useState([]);
    const data = {
        columns: [
          {
            label: 'ID',
            field: 'employeeId',
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
            field: 'editProfile',
            width: 100
          }
        ],
        rows:rows
      };
    const handleActiveChange = async (c,e,id)=>{
        setLoading(true);
        await updateEmployee(employees[parseInt(id)]._id, {isActive:c})
        .then((rslt)=>{
            let newEmployees = [...employees]
            employees[parseInt(id)].isActive=c;
            setEmployees(newEmployees);
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
        async function employeesGet(){
            let employeesData = await getEmployees();
            setEmployees(employeesData);
        }
        employeesGet()
    },[])
    useEffect(()=>{
        let rows1 = [...employees];
        let i =0;
        rows1.map((element) => {
            element.status  =(<Switch onChange={handleActiveChange} id={i} checked={element.isActive}/>);
            element.createdAt  = moment(element.createdAt).format('YYYY-MM-DD');
            element.editProfile = (<a onClick={()=>{navigate('/admin/mp/employees/'+element._id)}} style={{cursor:"pointer",color:"blue"}}>Edit Profile</a>)
            i++;
        });
        setRows(rows1);
    },[employees,setEmployees])
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
            <h3>Employees</h3><CButton onClick={()=>{navigate('/admin/mp/employees/add')}} type="button">Add Employee</CButton>
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

export default MpEmployees