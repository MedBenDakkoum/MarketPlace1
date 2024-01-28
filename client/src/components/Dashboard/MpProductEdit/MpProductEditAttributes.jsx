import React, {useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import { CTable,CTableRow,CTableHeaderCell,CTableDataCell,CTableHead ,CTableBody,CForm,CCol,CFormInput,CFormSelect,CButton,CFormTextarea} from '@coreui/react';
import {getSellerById} from '../../../services/sellerData';
import { Multiselect } from "multiselect-react-dropdown";
import {updateSeller} from '../../../services/adminService'
import Switch from "react-switch";
import { Spinner, Alert } from 'react-bootstrap';

const attributes = [
    {
        id:"24",
        name:"Taille",
        values:["XXL","XL","L","M"],
        used:true,
    },
    {
        id:"25",
        name:"Color",
        values:["White","Black","Green","Blue"],
        used:true,
    }
]

function MpProductEditAttributes() {
    const [rows, setRows] = useState([]);
    useEffect(()=> {
        let rows1 = attributes.map((element, index) => (
            <CTableRow key={element._id} color='light'>
                <CTableDataCell>#</CTableDataCell>
                <CTableDataCell>{element.id}</CTableDataCell>
                <CTableDataCell>{element.name}</CTableDataCell>
                <CTableDataCell>{element.values.toString()}</CTableDataCell>
                <CTableDataCell><Switch onChange={()=>{}} checked={element.used} /></CTableDataCell>
            </CTableRow>
        ));
        setRows(rows1);
    },[])
    return (
            <CForm className="row g-3">
                <CCol md={8}>
                    <CCol md={12}>
                        <CTable>
                            <CTableHead>
                                <CTableRow color='light'>
                                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Values</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Used</CTableHeaderCell>
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

export {MpProductEditAttributes};