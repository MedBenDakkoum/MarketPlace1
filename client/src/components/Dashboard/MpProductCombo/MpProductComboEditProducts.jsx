import React, {useEffect,useState} from 'react';
import { CTable,CTableRow,CTableHeaderCell,CTableDataCell,CTableHead ,CTableBody,CForm,CCol,CButton} from '@coreui/react';
import Switch from "react-switch";
import { useNavigate } from 'react-router-dom';
const products = [
    {
        ref:"01234567",
        name:"Shirt",
        quantity:78,
        used:true,
    },
    {
        ref:"87654321",
        name:"Pants",
        quantity:68,
        used:true,
    }
]

function MpProductComboEditProducts() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    useEffect(()=> {
        let rows1 = products.map((element, index) => (
            <CTableRow key={element.ref} color='light'>
                <CTableDataCell>#</CTableDataCell>
                <CTableDataCell><span style={{cursor:"pointer",color:"blue"}} onClick={(e)=>{ navigate("/admin/mp/products/ProductID")}}>{element.ref}</span></CTableDataCell>
                <CTableDataCell>{element.name}</CTableDataCell>
                <CTableDataCell>{element.quantity}</CTableDataCell>
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
                                    <CTableHeaderCell scope="col">Ref</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Quantity</CTableHeaderCell>
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

export {MpProductComboEditProducts};