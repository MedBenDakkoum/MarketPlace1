import React, {useEffect,useState} from 'react';
import { CForm,CCol,CFormInput,CButton} from '@coreui/react';
import { CTable,CTableRow,CTableHeaderCell,CTableDataCell,CTableHead ,CTableBody} from '@coreui/react';
import {getSettings,updateSettings} from '../../../services/settingsService.js'
import { ThreeDots } from 'react-loader-spinner'
import Swal from 'sweetalert2';

function MpConfigPayment() {
    const [loading,setLoading] = useState(false);
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
    const handleDeletePaymentMethod = (e) =>{
        let id="";
        if(e.target==e.currentTarget){
            id=e.target.getAttribute("id");
        }else{
            id=e.target.parentNode.getAttribute("id");
        }
        let newSettings=settings.filter((method)=>{return method.id!==parseInt(id)})
        setSettings(newSettings);
        console.log(newSettings);
    }
    useEffect(()=> { 
        let rows1 = settings.map((element, index) => (
            <CTableRow key={element.id} color='light'>
                <CTableDataCell>#</CTableDataCell>
                <CTableDataCell>{element.id}</CTableDataCell>
                <CTableDataCell>{element.method}</CTableDataCell>
                <CTableDataCell><CButton type="button" id={element.id} onClick={handleDeletePaymentMethod}>Delete</CButton></CTableDataCell>
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
        let i=1;
        let newSettings = [...settings];
        newSettings.forEach((method)=>{
            method.id=i;
            i++;
        })
        await updateSettings({data:{"paymentMethods":newSettings}}).then((rslt)=>{
            setLoading(false);
            Swal.fire({
                icon: "success",
                title: "Settings Updated",
                showConfirmButton: false,
                timer: 1500
            });
        })
        .catch((e)=>{
            setLoading(false);
            Swal.fire({
                icon: "error",
                title: "Oops !",
                text: e.message,
            });
        })
    }
    return (
            <CForm className="row g-3" onSubmit={handleSumbit}>
                <ThreeDots
                    visible={loading}
                    height="100"
                    width="100"
                    color="#4fa94d"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass="overlay-spinner"
                />
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