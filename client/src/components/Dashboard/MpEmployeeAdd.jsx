import React, {useEffect,useState} from 'react';
import { CForm,CCol,CFormInput,CFormSelect,CButton,CFormTextarea} from '@coreui/react';
import {addEmployee} from '../../services/adminService'
import Swal from 'sweetalert2';


function MpEmployeeAdd() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        password:"",
        name:"",
        email:"",
        phoneNumber:"",
    });
    const handleChangeData = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        let newData = {
            password:data.password,
            name:data.name,
            email:data.email,
            phoneNumber:data.phoneNumber,
        }
        console.log(newData);
        await addEmployee(newData).then((rslt)=>{
            setLoading(false); 
            Swal.fire({
                icon: "success",
                title: "Employee Adeed successfully !",
                showConfirmButton: false,
                timer: 1000
            });
        }).catch((err)=>{
            setLoading(false)
            Swal.fire({
                icon: "error",
                title: "Oops !",
                text: err.message,
            });
        })
    }
    return (
            <CForm className="row g-3" onSubmit={handleSubmit}>
                <CCol md={8}>
                    <CCol md={12}>
                        <CFormInput name="name" onChange={handleChangeData} type="text" value={data.name} id="inputName" label="Name" />
                    </CCol>
                    <CCol md={12}>
                        <CFormInput name="email" onChange={handleChangeData} type="email" value={data.email} id="inputEmail4" label="Email" />
                    </CCol>
                    <CCol md={12}>
                        <CFormInput name="password" onChange={handleChangeData} type="password" value={data.password} id="inputPassword" label="Password" />
                    </CCol>
                    <CCol md={12}>
                        <CFormInput name="phoneNumber" onChange={handleChangeData} type="text" value={data.phoneNumber} id="inputPhoneNumber" label="Phone Number" />
                    </CCol>
                    <CCol xs={12}>
                        <CButton type="submit">Add</CButton>
                    </CCol>
                </CCol>
            </CForm>
  )
}

export {MpEmployeeAdd};