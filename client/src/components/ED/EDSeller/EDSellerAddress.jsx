import React, {useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import { CForm,CCol,CFormInput,CFormTextarea} from '@coreui/react';
import {getSellerById} from '../../../services/employeeService'


function EDSellerAddress() {
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
    return (
            <CForm className="row g-3">
                <CCol md={8}>
                    <CCol xs={12}>
                        <CFormTextarea name="line1" id="inputAddress" value={address.line1} label="Address" placeholder="1234 Main St" disabled/>
                    </CCol>
                    <CCol xs={12}>
                        <CFormInput name="line2" id="inputAddress2" value={address.line2} label="Address 2" placeholder="Apartment, studio, or floor" disabled/>
                    </CCol>
                    <CCol md={12}>
                        <CFormInput name="country" id="inputCountry" value={address.country} label="Country" disabled/>
                    </CCol>
                    <CCol md={12}>
                        <CFormInput name="state" id="inputState" value={address.state} label="State" disabled/>
                    </CCol>
                    <CCol md={12}>
                        <CFormInput name="city" id="inputCity" value={address.city} label="City" disabled/>
                    </CCol>
                    <CCol md={12}>
                        <CFormInput name="zipCode" id="inputZip" value={address.zipCode} label="Zip" disabled/>
                    </CCol>
                </CCol>
            </CForm>
  )
}

export {EDSellerAddress};