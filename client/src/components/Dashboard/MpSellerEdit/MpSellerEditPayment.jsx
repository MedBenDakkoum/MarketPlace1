import React, {useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import { CForm,CCol,CFormInput,CFormSelect,CButton,CFormTextarea} from '@coreui/react';
import { Multiselect } from "multiselect-react-dropdown";
import {updateSeller,getSellerById} from '../../../services/adminService'
import Switch from "react-switch";
import { Spinner, Alert } from 'react-bootstrap';
import {getSettings} from "../../../services/settingsService"

function MpSellerEditPayment() {
    const [loading, setLoading] = useState(true);
    const [methods, setMethods] = useState([]);
    const [data, setData] = useState({
        method:"",
        details:"",
    });
    const params = useParams();

    useEffect(()=>{
        async function initialise(){
            let seller = await getSellerById(params.id);
            let Ms = await getSettings();
            setMethods(Ms.paymentMethods);
            const options = Ms.paymentMethods.map((e)=>(
                <option key={e.id} value={e.method}>{e.method}</option>
            ));
            setMethods(options);
            setData({
                method:seller.paymentMethod.method || "",
                details:seller.paymentMethod.details || "",
            });
        }
        initialise();
        setLoading(false);
    },[]);
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        let newData = {seller:{paymentMethod:{...data}}}
        updateSeller(params.id,newData)
        .then(res => {
            if (!res.error) {
                setLoading(false);
            } else {
                console.log(res.error);
            }
        }).catch(err => console.error('error from register: ', err))
        console.log(newData);
    }
    return (
            <CForm className="row g-3" onSubmit={handleSubmit}>
                <CCol md={12}>
                    <CCol md={12}>
                        <CFormSelect value={data.method} onChange={handleChange} name="method" size="lg" label="Payment Method">
                            {methods}
                        </CFormSelect>
                    </CCol>
                    <CCol md={6}>
                        <CFormTextarea onChange={handleChange} value={data.details} name="details" id="payDetails" label="Payment Details" />
                    </CCol>
                    <CCol xs={12}>
                        <CButton type="submit">Save</CButton>
                    </CCol>
                </CCol>
            </CForm>
  )
}

export {MpSellerEditPayment};