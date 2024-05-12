import React, {useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import { CForm,CCol,CFormInput} from '@coreui/react';
import {getSellerById} from '../../../services/employeeService'


function EDSellerConfig() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        supplierUsername:"",
        supplierPassword:"",
        supplierSecretKey:""
    });
    // const [subscription, setSubscription] = useState({isActive:false});
    const params = useParams();
    useEffect(()=>{
        async function initialise(){
            let seller = await getSellerById(params.id);
            setData({
                supplierUsername:seller.supplierUsername || "",
                supplierPassword:seller.supplierPassword || "",
                supplierSecretKey:seller.supplierSecretKey || "",
            });
        }
        initialise();
        setLoading(false);
    },[]);
    return (
            <CForm className="row g-3">
                <CCol md={8}>
                    <CCol xs={12}>
                        <CFormInput name="supplierUsername" id="supplierUsername" value={data.supplierUsername} label="Supplier Username" disabled/>
                    </CCol>
                    <CCol md={12}>
                        <CFormInput name="supplierPassword" id="supplierPassword" value={data.supplierPassword} label="Supplier Password" disabled/>
                    </CCol>
                    <CCol md={12}>
                        <CFormInput name="supplierSecretKey" id="supplierSecretKey" value={data.supplierSecretKey} label="Supplier Secret Key" disabled/>
                    </CCol>
                </CCol>
            </CForm>
  )
}

export {EDSellerConfig};