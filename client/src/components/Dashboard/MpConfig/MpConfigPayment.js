import React, {useEffect,useState} from 'react';
import { CForm,CCol,CRow,CFormInput,CFormSelect,CButton,CFormSwitch} from '@coreui/react';
import { CTable,CTableRow,CTableHeaderCell,CTableDataCell,CTableHead ,CTableBody} from '@coreui/react';
import {getSettings,updateSettings} from '../../../services/settingsService.js'

function MpConfigPayment() {
    const [settings, setSettings] = useState([{
        id: 0,
        method: "",
    }])
    const [rows, setRows] = useState([]);
    const [newmethod,setNewMethod]= useState("");
    useEffect(function(){
        async function requestSettings(){
            let setting = await getSettings();
            setSettings([...setting.paymentMethods])
        } 
        requestSettings()
    },[])
    useEffect(()=> { 
        let rows1 = settings.map((element, index) => (
            <CTableRow key={element.id} color='light'>
                <CTableDataCell>#</CTableDataCell>
                <CTableDataCell>{element.id}</CTableDataCell>
                <CTableDataCell>{element.method}</CTableDataCell>
                <CTableDataCell><a href="#">Edit</a></CTableDataCell>
            </CTableRow>
        ));
        setRows(rows1);
    },[settings,setSettings])
    const handleChangeNew = (e)=>{
        setNewMethod(e.target.value);
    }
    const handleAddMethod = (e)=>{
        setSettings([...settings, {id:settings.length+1,method:newmethod}]);
        console.log(settings);
    }
    const handleSumbit = async (e)=>{
        e.preventDefault();
        await updateSettings({data:{"paymentMethods":settings}})
    }
    return (
            <CForm className="row g-3" onSubmit={handleSumbit}>
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