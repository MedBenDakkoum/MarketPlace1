import React, {useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import { CForm,CCol,CFormInput,CButton,CFormTextarea} from '@coreui/react';
import {updateCustomer,getCustomerById} from '../../../services/adminService'
import Swal from 'sweetalert2';
import { ThreeDots } from 'react-loader-spinner'


function CustomerEditAddress() {
    const [loading, setLoading] = useState(true);
    const [address, setAddress] = useState({
        line1:"",
        line2:"",
        country:"",
        state:"",
        zipCode:"",
        city:""
    });
    const params = useParams();
    useEffect(()=>{
        async function initialise(){
            let customer = await getCustomerById(params.id);
            setAddress(customer.address);
        }
        initialise();
        setLoading(false);
    },[]);
    const handleChangeAddress = (e) => {
        const { name, value } = e.target;
        setAddress({ ...address, [name]: value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        let newData = {address:{...address}}
        await updateCustomer(params.id,newData)
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
                    <CCol xs={12}>
                        <CFormTextarea name="line1" onChange={handleChangeAddress} id="inputAddress" value={address.line1} label="Address"/>
                    </CCol>
                    <CCol xs={12}>
                        <CFormInput name="line2" onChange={handleChangeAddress} id="inputAddress2" value={address.line2} label="Address 2"/>
                    </CCol>
                    <CCol md={12}>
                        <CFormInput name="country" onChange={handleChangeAddress} id="inputCountry" value={address.country} label="Country"/>
                    </CCol>
                    <CCol md={12}>
                        <CFormInput name="state" onChange={handleChangeAddress} id="inputState" value={address.state} label="State"/>
                    </CCol>
                    <CCol md={12}>
                        <CFormInput name="city" onChange={handleChangeAddress} id="inputCity" value={address.city} label="City"/>
                    </CCol>
                    <CCol md={12}>
                        <CFormInput name="zipCode" onChange={handleChangeAddress} id="inputZip" value={address.zipCode} label="Zip" />
                    </CCol>

                    <CCol xs={12}>
                        <CButton type="submit">Save</CButton>
                    </CCol>
                </CCol>
            </CForm>
  )
}

export {CustomerEditAddress};