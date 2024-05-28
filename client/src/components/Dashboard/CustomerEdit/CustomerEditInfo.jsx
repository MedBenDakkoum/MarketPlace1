import React, {useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import { CForm,CCol,CFormInput,CFormSelect,CButton} from '@coreui/react';
import {updateCustomer,getCustomerById} from '../../../services/adminService'
import Switch from "react-switch";
import Swal from 'sweetalert2';
import { ThreeDots } from 'react-loader-spinner'


function CustomerEditInfo() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const params = useParams();
    useEffect(()=>{
        async function initialise(){
            let customer = await getCustomerById(params.id);
            setData(customer);
            // setSubscription(seller.subscription);
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
        await updateCustomer(params.id,{
            isActive:data.isActive,
            name:data.name,
            email:data.email,
            phoneNumber:data.phoneNumber,
            gender:data.gender
        })
        .then(res => {
            if (!res.error) {
                Swal.fire({
                    icon: "success",
                    title: "Client Updated !",
                    showConfirmButton: false,
                    timer: 1000
                });
                setLoading(false);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops !",
                    text: res.error.message,
                });
                console.log(res.error);
            }
        }).catch(err => console.error('error from register: ', err))
    }
    const handleChangeOfIsActive = (e) => {
        setData({ ...data, isActive: !data.isActive })
    }
    return (
            <CForm className="row g-3" onSubmit={handleSubmit}>
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
                <CCol md={8}>
                    <CCol md={12}>
                        <Switch onChange={handleChangeOfIsActive} checked={data.isActive} />
                    </CCol>
                    <CCol md={12}>
                        <CFormInput name="name" onChange={handleChangeData} type="text" value={data.name} id="inputName" label="Name" />
                    </CCol>
                    <CCol md={12}>
                        <CFormInput name="email" onChange={handleChangeData} type="email" value={data.email} id="inputEmail4" label="Email" />
                    </CCol>
                    <CCol md={12}>
                        <CFormInput name="phoneNumber" onChange={handleChangeData} type="text" value={data.phoneNumber} id="inputPhoneNumber" label="Phone Number" />
                    </CCol>
                    <CCol md={12}>
                        <CFormSelect onChange={handleChangeData} name="gender" size="lg" label="Gender" value={data.gender}>
                            <option value="male">male</option>
                            <option value="female">female</option>
                        </CFormSelect>
                    </CCol>
                    <CCol xs={12}>
                        <CButton type="submit">Save</CButton>
                    </CCol>
                </CCol>
            </CForm>
  )
}

export {CustomerEditInfo};