import React, {useEffect,useState} from 'react';
import { CForm,CCol,CRow,CFormInput,CFormSelect,CButton,CFormSwitch} from '@coreui/react';
import { CTable,CTableRow,CTableHeaderCell,CTableDataCell,CTableHead ,CTableBody} from '@coreui/react';

function MpConfigPayment() {
    const [rows, setRows] = useState([]);
    const [newmethod,setNewMethod]= useState("");
    const [methods,setMethods] = useState([
        {
            id:1,
            name:"Paypal"
        },
        {
            id:2,
            name:"RunPay"
        }
    ]);
    useEffect(()=> { 
        let rows1 = methods.map((element, index) => (
            <CTableRow key={element.id} color='light'>
                <CTableDataCell>#</CTableDataCell>
                <CTableDataCell>{element.id}</CTableDataCell>
                <CTableDataCell>{element.name}</CTableDataCell>
                <CTableDataCell><a href="#">Edit</a></CTableDataCell>
            </CTableRow>
        ));
        setRows(rows1);
    },[methods,setMethods])
    const handleChangeNew = (e)=>{
        setNewMethod(e.target.value);
    }
    const handleAddMethod = (e)=>{
        setMethods([...methods, {id:methods.length+1,name:newmethod}]);
    }
    return (
            <CForm className="row g-3">
                <CCol md={12}>
                    <CTable>
                        <CTableHead>
                            <CTableRow color='light'>
                                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Id</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Payment Method</CTableHeaderCell>
                                <CTableHeaderCell scope="col">--</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {rows}
                        </CTableBody>
                    </CTable>
                    <CCol xs={4}>
                        <CFormInput name="method" onChange={handleChangeNew} type="text" value={newmethod} id="inputName" label="Name" />
                        <CButton onClick={handleAddMethod} type="button">Add</CButton>
                    </CCol>
                    <CCol xs={12}>
                        <CButton type="submit">Save</CButton>
                    </CCol>
                </CCol>
            </CForm>
    )
}

export {MpConfigPayment};