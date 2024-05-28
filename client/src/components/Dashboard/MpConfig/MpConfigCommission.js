import React, {useEffect,useState} from 'react';
import { CForm,CCol,CFormInput,CFormSelect,CButton} from '@coreui/react';
import {getSettings,updateSettings} from '../../../services/settingsService.js'
import { ThreeDots } from 'react-loader-spinner'
import Swal from 'sweetalert2';

function MpConfigCommission() {
    const [loading,setLoading] = useState(false);
    const [settings, setSettings] = useState({
        type: "",
        details: 0,
    })
    useEffect(function(){
        async function requestSettings(){
            let setting = await getSettings();
            setSettings({
                type: setting.Commision.type,
                details: setting.Commision.details
            });
        } 
        requestSettings()
    },[])
    const handleChange = (e)=>{
        setSettings({...settings,[e.target.name]: e.target.value})
    }
    const handleSumbit = async (e)=>{
        e.preventDefault();
        await updateSettings({data:{"Commision":settings}}).then((rslt)=>{
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
    return (
            <CForm className="row g-3" onSubmit={handleSumbit}>
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
                <CCol md={12}>
                    <CCol md={6}>
                        <label>Global Commission</label><br/>
                        <CFormSelect onChange={handleChange} value={settings.type} name="type" size="lg" className="mb-3" aria-label="Global Commission">
                            <option value="percentage">Percentage</option>
                            <option value="fixed">Fixed</option>
                        </CFormSelect>
                    </CCol>
                    <CCol md={6}>
                            <CFormInput onChange={handleChange} value={settings.details} name="details" type="text" id="inputCommission" label="Commission Details" />
                    </CCol>
                    <CCol xs={12}>
                        <CButton type="submit">Save</CButton>
                    </CCol>
                </CCol>
            </CForm>
  )
}

export {MpConfigCommission};