import React, {useEffect,useState} from 'react';
import { CForm,CCol,CRow,CFormInput,CFormSelect,CButton,CFormSwitch} from '@coreui/react';
import Switch from "react-switch";
import {getSettings,updateSettings} from '../../../services/settingsService.js'
import { ThreeDots } from 'react-loader-spinner'
import Swal from 'sweetalert2';

function MpConfigApproval(props) {
    const [loading,setLoading] = useState(false);
    const [settings, setSettings] = useState({
        SellerNeedAdminApproval: false,
        SellerCanOnOffStore: false,
        SellerCanAddSocials: false,
        ShowAdminCommision: false,
    })
    useEffect(function(){
        async function requestSettings(){
            let setting = await getSettings();
            setSettings({
                SellerNeedAdminApproval: setting.SellerNeedAdminApproval,
                SellerCanOnOffStore: setting.SellerCanOnOffStore,
                SellerCanAddSocials: setting.SellerCanAddSocials,
                ShowAdminCommision: setting.ShowAdminCommision,
            });
        } 
        requestSettings()
    },[])
    const handleChangeSellerNeedAdminApproval = (e)=>{
        setSettings({...settings,SellerNeedAdminApproval: !settings.SellerNeedAdminApproval})
    }
    const handleChangeSellerCanOnOffStore = (e)=>{
        setSettings({...settings,SellerCanOnOffStore: !settings.SellerCanOnOffStore})
    }
    const handleChangeSellerCanAddSocials = (e)=>{
        setSettings({...settings,SellerCanAddSocials: !settings.SellerCanAddSocials})
    }
    const handleChangeShowAdminCommision = (e)=>{
        setSettings({...settings,ShowAdminCommision: !settings.ShowAdminCommision})
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
                        <label>Seller need to be approved by admin</label><br/>
                        <Switch onChange={handleChangeSellerNeedAdminApproval} checked={settings.SellerNeedAdminApproval}/><br/><br/>
                    </CCol>
                    <CCol md={6}>
                        <label>Sellers can activate/deactivate their shop</label><br/>
                        <Switch onChange={handleChangeSellerCanOnOffStore} checked={settings.SellerCanOnOffStore}/><br/><br/>
                    </CCol>
                    <CCol md={6}>
                        <label>Sellers can provide their social profile links</label><br/>
                        <Switch onChange={handleChangeSellerCanAddSocials} checked={settings.SellerCanAddSocials}/><br/><br/>
                    </CCol>
                    <CCol md={6}>
                        <label>Show admin commission to seller</label><br/>
                        <Switch onChange={handleChangeShowAdminCommision} checked={settings.ShowAdminCommision}/><br/><br/>
                    </CCol>
                    <CCol xs={12}>
                        <CButton type="submit">Save</CButton>
                    </CCol>
                </CCol>
            </CForm>
  )
}

export {MpConfigApproval};