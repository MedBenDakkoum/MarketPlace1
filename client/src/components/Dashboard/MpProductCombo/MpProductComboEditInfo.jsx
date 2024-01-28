import React, {useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import { CForm,CCol,CFormInput,CFormSelect,CButton,CFormTextarea} from '@coreui/react';
import {getSellerById} from '../../../services/sellerData';
import { Multiselect } from "multiselect-react-dropdown";
import {updateSeller} from '../../../services/adminService'
import Switch from "react-switch";
import { Spinner, Alert } from 'react-bootstrap';


function MpProductComboEditInfo() {
    return (
            <CForm className="row g-3">
                <CCol md={8}>
                    <CCol md={12}>
                        <Switch onChange={(e)=>{}} checked={true} />
                    </CCol>
                    <CCol md={12}>
                        <CFormInput name="reference" type="text" id="inputProductReference" label="Reference" />
                    </CCol>
                    <CCol md={12}>
                        <CFormInput name="name" type="text" id="inputProductName" label="Product Name" />
                    </CCol>
                    <CCol md={12}>
                        <CFormInput name="category" type="text" id="inputProductCategory" label="Category" />
                    </CCol>
                    <CCol md={12}>
                        <CFormTextarea
                            id="inputProductDescription"
                            label="Description"
                            rows={3}
                            name="description"
                        ></CFormTextarea>
                    </CCol>
                    <CCol md={12}>
                        <CFormInput name="price" type="text" id="inputProductPrice" label="Price" />
                    </CCol>
                    <CCol md={12}>
                        <CFormInput name="quantity" type="text" id="inputProductQuantity" label="Quantity" />
                    </CCol>
                    <CCol xs={12}>
                        <CButton type="submit">Save</CButton>
                    </CCol>
                </CCol>
            </CForm>
  )
}

export {MpProductComboEditInfo};