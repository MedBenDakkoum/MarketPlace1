import React, {useEffect,useState} from 'react';
import { CForm,CCol,CRow,CFormInput,CFormSelect,CButton,CFormSwitch} from '@coreui/react';
import Switch from "react-switch";

function MpConfigDefault() {
    return (
            <CForm className="row g-3">
                <CCol md={12}>
                    <CCol md={6}>
                            <CFormInput name="emailAdmin" type="email" id="inputEmailId" label="Support email" />
                    </CCol>
                    <CCol md={6}>
                        <label>Allow registration of new sellers</label>
                        <Switch checked={true}/>
                    </CCol>

                    <CCol xs={12}>
                        <CButton type="submit">Save</CButton>
                    </CCol>
                </CCol>
            </CForm>
  )
}

export {MpConfigDefault};