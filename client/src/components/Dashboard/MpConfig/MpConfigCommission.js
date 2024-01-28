import React, {useEffect,useState} from 'react';
import { CForm,CCol,CRow,CFormInput,CFormSelect,CButton,CFormSwitch} from '@coreui/react';

function MpConfigCommission() {
    return (
            <CForm className="row g-3">
                <CCol md={12}>
                    <CCol md={6}>
                        <label>Global Commission</label><br/>
                        <CFormSelect name="commissionType" size="lg" className="mb-3" aria-label="Global Commission">
                            <option value="percentage">Percentage</option>
                            <option value="fixed">Fixed</option>
                        </CFormSelect>
                    </CCol>
                    <CCol md={6}>
                            <CFormInput name="commissionDetails" type="text" id="inputCommission" label="Commission Details" />
                    </CCol>
                    <CCol xs={12}>
                        <CButton type="submit">Save</CButton>
                    </CCol>
                </CCol>
            </CForm>
  )
}

export {MpConfigCommission};