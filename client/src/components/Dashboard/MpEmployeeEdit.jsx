import React, {useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import { CForm,CCol,CFormInput,CButton} from '@coreui/react';
import { getEmployeeById,updateEmployee } from '../../services/adminService';
import Swal from 'sweetalert2';


function MpEmployeeEdit() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        isActive:false,
        name:"",
        email:"",
        phoneNumber:"",
        password:""
    });
    const params = useParams();
    useEffect(()=>{
        async function initialise(){
            let employee = await getEmployeeById(params.id);
            setData({
                isActive:employee.isActive,
                name:employee.name,
                email:employee.email,
                phoneNumber:employee.phoneNumber,
            });
        }
        initialise();
        setLoading(false);
    },[]);
    const handleChangeData = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        let newData = {
            isActive:data.isActive,
            name:data.name,
            email:data.email,
            phoneNumber:data.phoneNumber,
            password:data.password
        }
        await updateEmployee(params.id,newData)
        .then(res => {
            Swal.fire({
                icon: "success",
                title: "Updated",
                showConfirmButton: false,
                timer: 1500
            });
        }).catch(err => {
            Swal.fire({
                icon: "error",
                title: "Oops !",
                text: err.message
            });
        })
    }
    const handleChangeOfIsActive = (e) => {
        setData({ ...data, isActive: !data.isActive })
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
                        <CButton type="submit">Save</CButton>
                    </CCol>
                </CCol>
            </CForm>
  )
}

export {MpEmployeeEdit};