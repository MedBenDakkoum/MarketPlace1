import React, {useEffect,useState} from 'react';
import { CForm,CCol,CRow,CFormInput,CFormSelect,CButton,CFormSwitch} from '@coreui/react';
import Switch from "react-switch";
import {getSettings,updateSettings} from '../../../services/settingsService.js'
import { ThreeDots } from 'react-loader-spinner'
import Swal from 'sweetalert2';

function MpConfigDefault() {
    const [loading,setLoading] = useState(false);
    const [settings, setSettings] = useState({
        supportEmail: "support@test.com",
        AllowNewSellers: false,
    })
    useEffect(function(){
        async function requestSettings(){
            let setting = await getSettings();
            setSettings({
                supportEmail: setting.supportEmail,
                AllowNewSellers: setting.AllowNewSellers,
            });
        } 
        requestSettings()
    },[])
    const handleChanges = (e)=>{
        setSettings({...settings,supportEmail: e.target.value})
    }
    const handleChangeAllowNewSellers = (e)=>{
        setSettings({...settings,AllowNewSellers: !settings.AllowNewSellers})
    }
    const handleSumbit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        await updateSettings({data:settings}).then((rslt)=>{
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
                            <CFormInput onChange={handleChanges} value={settings.supportEmail} name="supportEmail" type="email" id="inputEmailId" label="Support email" />
                    </CCol>
                    <CCol md={6}>
                        <label>Allow registration of new sellers</label>
                        <Switch name="AllowNewSellers" onChange={handleChangeAllowNewSellers} checked={settings.AllowNewSellers}/>
                    </CCol>

                    <CCol xs={12}>
                        <CButton type="submit">Save</CButton>
                    </CCol>
                </CCol>
            </CForm>
  )
}

export {MpConfigDefault};