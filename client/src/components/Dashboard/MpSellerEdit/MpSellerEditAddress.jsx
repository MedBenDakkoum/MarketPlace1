import React, {useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import { CForm,CCol,CFormInput,CFormSelect,CButton,CFormTextarea} from '@coreui/react';
import {getSellerById} from '../../../services/sellerData';
import { Multiselect } from "multiselect-react-dropdown";
import {updateSeller} from '../../../services/adminService'
import Switch from "react-switch";
import { Spinner, Alert } from 'react-bootstrap';


function MpSellerEditAddress() {
    const [loading, setLoading] = useState(true);
    const [address, setAddress] = useState({
        line1:"",
        line2:"",
        country:"",
        state:"",
        zipCode:"",
        city:""
    });
    // const [subscription, setSubscription] = useState({isActive:false});
    const params = useParams();
    useEffect(()=>{
        async function initialise(){
            let seller = await getSellerById(params.id);
            setAddress(seller.address);
            // setSubscription(seller.subscription);
        }
        initialise();
        setLoading(false);
    },[]);
    const handleChangeAddress = (e) => {
        const { name, value } = e.target;
        setAddress({ ...address, [name]: value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        let newData = {seller:{address:{...address}}}
        updateSeller(params.id,newData)
        .then(res => {
            if (!res.error) {
                setLoading(false);
            } else {
                console.log(res.error);
            }
        }).catch(err => console.error('error from register: ', err))
    }
    return (
            <CForm className="row g-3" onSubmit={handleSubmit}>
                <CCol md={8}>
                    <CCol xs={12}>
                        <CFormTextarea name="line1" onChange={handleChangeAddress} id="inputAddress" value={address.line1} label="Address" placeholder="1234 Main St"/>
                    </CCol>
                    <CCol xs={12}>
                        <CFormInput name="line2" onChange={handleChangeAddress} id="inputAddress2" value={address.line2} label="Address 2" placeholder="Apartment, studio, or floor"/>
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

export {MpSellerEditAddress};