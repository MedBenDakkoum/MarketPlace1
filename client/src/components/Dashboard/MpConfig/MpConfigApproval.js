import React, {useEffect,useState} from 'react';
import { CForm,CCol,CRow,CFormInput,CFormSelect,CButton,CFormSwitch} from '@coreui/react';
import Switch from "react-switch";

function MpConfigApproval() {
    return (
            <CForm className="row g-3">
                <CCol md={12}>
                    <CCol md={6}>
                        <label>Seller need to be approved by admin</label><br/>
                        <Switch checked={true}/><br/><br/>
                    </CCol>
                    <CCol md={6}>
                        <label>Sellers can activate/deactivate their shop</label><br/>
                        <Switch checked={true}/><br/><br/>
                    </CCol>
                    <CCol md={6}>
                        <label>Sellers need to provide their city, country and zip/postal code</label><br/>
                        <Switch checked={true}/><br/><br/>
                    </CCol>
                    <CCol md={6}>
                        <label>Sellers can provide their social profile links</label><br/>
                        <Switch checked={true}/><br/><br/>
                    </CCol>
                    <CCol md={6}>
                        <label>Sellers can activate/deactivate their products</label><br/>
                        <Switch checked={true}/><br/><br/>
                    </CCol>
                    <CCol md={6}>
                        <label>Updated products has to be approved by admin</label><br/>
                        <Switch checked={true}/><br/><br/>
                    </CCol>
                    <CCol md={6}>
                        <label>Show admin commission to seller</label><br/>
                        <Switch checked={true}/><br/><br/>
                    </CCol>
                    <CCol md={6}>
                        <label>Sellers can display "On sale!" flag on their products</label><br/>
                        <Switch checked={true}/><br/><br/>
                    </CCol>
                    <CCol xs={12}>
                        <CButton type="submit">Save</CButton>
                    </CCol>
                </CCol>
            </CForm>
  )
}

export {MpConfigApproval};