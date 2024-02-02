import React, {useEffect,useState} from 'react';
import { CForm,CCol,CRow,CFormInput,CFormSelect,CButton,CFormSwitch} from '@coreui/react';
import Switch from "react-switch";
import {getSettings,updateSettings} from '../../../services/settingsService.js'

function MpConfigApproval(props) {
    const [settings, setSettings] = useState({
        SellerNeedAdminApproval: false,
        SellerCanOnOffStore: false,
        CityCountryZipCodeRequired: false,
        SellerCanAddSocials: false,
        SellerCanOnOffProds: false,
        ProductUpdateNeedAdminApproval: false,
        ShowAdminCommision: false,
        SellerCanAddOnSale: false,
    })
    useEffect(function(){
        async function requestSettings(){
            let setting = await getSettings();
            setSettings({
                SellerNeedAdminApproval: setting.SellerNeedAdminApproval,
                SellerCanOnOffStore: setting.SellerCanOnOffStore,
                CityCountryZipCodeRequired: setting.CityCountryZipCodeRequired,
                SellerCanAddSocials: setting.SellerCanAddSocials,
                SellerCanOnOffProds: setting.SellerCanOnOffProds,
                ProductUpdateNeedAdminApproval: setting.ProductUpdateNeedAdminApproval,
                ShowAdminCommision: setting.ShowAdminCommision,
                SellerCanAddOnSale: setting.SellerCanAddOnSale,
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
    const handleChangeCityCountryZipCodeRequired = (e)=>{
        setSettings({...settings,CityCountryZipCodeRequired: !settings.CityCountryZipCodeRequired})
    }
    const handleChangeSellerCanAddSocials = (e)=>{
        setSettings({...settings,SellerCanAddSocials: !settings.SellerCanAddSocials})
    }
    const handleChangeSellerCanOnOffProds = (e)=>{
        setSettings({...settings,SellerCanOnOffProds: !settings.SellerCanOnOffProds})
    }
    const handleChangeProductUpdateNeedAdminApproval = (e)=>{
        setSettings({...settings,ProductUpdateNeedAdminApproval: !settings.ProductUpdateNeedAdminApproval})
    }
    const handleChangeShowAdminCommision = (e)=>{
        setSettings({...settings,ShowAdminCommision: !settings.ShowAdminCommision})
    }
    const handleChangeSellerCanAddOnSale = (e)=>{
        setSettings({...settings,SellerCanAddOnSale: !settings.SellerCanAddOnSale})
    }
    const handleSumbit = async (e)=>{
        e.preventDefault();
        await updateSettings({data:settings})
    }
    return (
            <CForm className="row g-3" onSubmit={handleSumbit}>
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
                        <label>Sellers need to provide their city, country and zip/postal code</label><br/>
                        <Switch onChange={handleChangeCityCountryZipCodeRequired} checked={settings.CityCountryZipCodeRequired}/><br/><br/>
                    </CCol>
                    <CCol md={6}>
                        <label>Sellers can provide their social profile links</label><br/>
                        <Switch onChange={handleChangeSellerCanAddSocials} checked={settings.SellerCanAddSocials}/><br/><br/>
                    </CCol>
                    <CCol md={6}>
                        <label>Sellers can activate/deactivate their products</label><br/>
                        <Switch onChange={handleChangeSellerCanOnOffProds} checked={settings.SellerCanOnOffProds}/><br/><br/>
                    </CCol>
                    <CCol md={6}>
                        <label>Updated products has to be approved by admin</label><br/>
                        <Switch onChange={handleChangeProductUpdateNeedAdminApproval} checked={settings.ProductUpdateNeedAdminApproval}/><br/><br/>
                    </CCol>
                    <CCol md={6}>
                        <label>Show admin commission to seller</label><br/>
                        <Switch onChange={handleChangeShowAdminCommision} checked={settings.ShowAdminCommision}/><br/><br/>
                    </CCol>
                    <CCol md={6}>
                        <label>Sellers can display "On sale!" flag on their products</label><br/>
                        <Switch onChange={handleChangeSellerCanAddOnSale} checked={settings.SellerCanAddOnSale}/><br/><br/>
                    </CCol>
                    <CCol xs={12}>
                        <CButton type="submit">Save</CButton>
                    </CCol>
                </CCol>
            </CForm>
  )
}

export {MpConfigApproval};