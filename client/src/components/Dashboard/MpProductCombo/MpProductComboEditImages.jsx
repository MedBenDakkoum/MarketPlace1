import React, {useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import { CTable,CTableRow,CTableHeaderCell,CTableDataCell,CTableHead ,CTableBody,CForm,CCol,CFormInput,CFormSelect,CButton,CFormTextarea} from '@coreui/react';
import { Multiselect } from "multiselect-react-dropdown";
import {updateSeller,getSellerById} from '../../../services/adminService'
import Switch from "react-switch";
import { Spinner, Alert } from 'react-bootstrap';

const images = [
    {
        id:"24",
        img:"https://etajer.com.tn/1/image1.jpg",
        cover:true,    
    },
    {
        id:"25",
        img:"https://etajer.com.tn/2/image2.jpg",
        cover:false
    }
]

function MpProductComboEditImages() {
    const [rows, setRows] = useState([]);
    useEffect(()=> {
        let rows1 = images.map((element, index) => (
            <CTableRow key={element._id} color='light'>
                <CTableDataCell>#</CTableDataCell>
                <CTableDataCell>{element.id}</CTableDataCell>
                <CTableDataCell><img className="single-product-mp-img" src={element.img}/></CTableDataCell>
                <CTableDataCell><Switch onChange={()=>{}} checked={element.cover} /></CTableDataCell>
            </CTableRow>
        ));
        setRows(rows1);
    },[])
    return (
            <CForm className="row g-3">

                <CCol md={8}>
                    <CCol md={12}>
                        <CFormInput name="profilePicture" type="file" label="Add picture"/>
                        <CButton type="button">Add </CButton>
                    </CCol>
                    <CCol md={12}>
                        <CTable>
                            <CTableHead>
                                <CTableRow color='light'>
                                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Image</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Cover</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {rows}
                            </CTableBody>
                        </CTable>
                    </CCol>
                    <CCol xs={12}>
                        <CButton type="submit">Save</CButton>
                    </CCol>
                </CCol>
            </CForm>
  )
}

export {MpProductComboEditImages};