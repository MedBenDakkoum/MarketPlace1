import React, {useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import { CForm,CCol,CFormInput,CFormSelect} from '@coreui/react';
import {getSellerById} from '../../../services/employeeService'


function EDSellerInfo() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        isVerified:false,
        storeTitle:"",
        storeLink:"",
        name:"",
        email:"",
        phoneNumber:"",
        gender:"male",
        storeDescription:""
    });
    const params = useParams();
    useEffect(()=>{
        async function initialise(){
            let seller = await getSellerById(params.id);
            let store = seller.store;
            setData({
                isVerified:seller.isVerified,
                storeTitle:store.title,
                storeLink:store.link,
                sellerType:seller.sellerType,
                RNE:seller.RNE,
                matriculeFiscale:seller.matriculeFiscale,
                name:seller.name,
                email:seller.email,
                phoneNumber:seller.phoneNumber,
                gender:seller.gender,
                storeDescription:store.description
            });
            // setSubscription(seller.subscription);
        }
        initialise();
        setLoading(false);
    },[]);
    return (
            <CForm className="row g-3">

                <CCol md={8}>
                    <CCol md={12}>
                        {data.isVerified? <p style={{color:"green"}}>Verified</p> : <p style={{color:"red"}}>InVerified</p>}
                    </CCol>
                    <CCol md={12}>
                        <CFormInput name="storeTitle" type="text" value={data.storeTitle} id="inputStoreName" label="Store Name" disabled/>
                    </CCol>
                    <CCol md={12}>
                        <CFormInput name="sellerType" type="text" value={data.sellerType} id="inputStoreName" label="Account Type" disabled/>
                    </CCol>
                    {
                        data?.sellerType?.toLowerCase() == "business"?
                        <>
                            <CCol md={12}>
                                <CFormInput name="RNE" type="text" value={data.RNE} id="inputStoreName" label="RNE" disabled/>
                            </CCol>
                            <CCol md={12}>
                                <CFormInput name="matriculeFiscale" type="text" value={data.matriculeFiscale} id="inputStoreName" label="Matricule Fiscale" disabled/>
                            </CCol>
                        </>
                        :
                            ""
                    }
                    <CCol md={12}>
                        <CFormInput name="storeLink" type="text" value={data.storeLink} id="inputStoreLink" label="Store Link" disabled/>
                    </CCol>
                    <CCol md={12}>
                        <CFormInput name="name" type="text" value={data.name} id="inputName" label="Name" disabled/>
                    </CCol>
                    <CCol md={12}>
                        <CFormInput name="email" type="email" value={data.email} id="inputEmail4" label="Email" disabled/>
                    </CCol>
                    <CCol md={12}>
                        <CFormInput name="phoneNumber" type="text" value={data.phoneNumber} id="inputPhoneNumber" label="Phone Number" disabled/>
                    </CCol>
                    <CCol md={12}>
                        <CFormSelect name="gender" size="lg" label="Gender" value={data.gender} disabled>
                            <option value="male">male</option>
                            <option value="female">female</option>
                        </CFormSelect>
                    </CCol>
                </CCol>
            </CForm>
  )
}

export {EDSellerInfo};