import React, {useEffect,useState} from 'react';
import { CForm,CCol,CRow,CFormInput,CFormSelect,CButton,CFormSwitch} from '@coreui/react';
import Switch from "react-switch";
import {getSettings,updateSettings} from '../../../services/settingsService.js'

function MpConfigDefault() {
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
        console.log(settings.AllowNewSellers);
    },[])
    const handleChanges = (e)=>{
        setSettings({...settings,supportEmail: e.target.value})
    }
    const handleChangeAllowNewSellers = (e)=>{
        setSettings({...settings,AllowNewSellers: !settings.AllowNewSellers})
    }
    const handleSumbit = async (e)=>{
        e.preventDefault();
        await updateSettings({data:settings})
    }
    return (
            <CForm className="row g-3" onSubmit={handleSumbit}>
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