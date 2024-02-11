import React,{useState,useEffect} from "react";
import {LineChart,PieChart} from '@mui/x-charts';
import { useNavigate } from "react-router-dom";
import { CForm,CCol,CFormInput,CRow, CFormTextarea,CButton} from '@coreui/react';
import { BsCart, BsCartCheckFill, BsCartFill } from "react-icons/bs";

function SDProductSEO() {
    const navigate= useNavigate();
    const [data,setData] = useState({
        meta_title:"",
        meta_description:"",
        friendly_url:""
    });
    useEffect(function(){
        //set initial data
    },[])
    const handleChange = (e)=>{
        setData({...data,[e.target.name]:e.target.value});
    }
    const handleSumbit = (e)=>{
        e.preventDefault();
        let newData = {...data}
        console.log(newData);
    }
    return (
        <div className="sd-singleproduct-section">
            <CForm className="row g-3" onSubmit={handleSumbit}>
                <CCol md={12}>
                    <CRow>
                        <CCol md={12}>
                            <CFormInput value={data.meta_title} onChange={handleChange} name="meta_title" type="text" label="Meta title"/>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol md={12}>
                            <CFormTextarea value={data.meta_description} onChange={handleChange} name="meta_description" type="text" label="Meta description"/>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol md={12}>
                            <CFormInput value={data.friendly_url} onChange={handleChange} name="friendly_url" type="text" label="Friendly URL"/>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol md={12}>
                            <CButton type="submit">
                                Save
                            </CButton>
                        </CCol>
                    </CRow>
                </CCol>
            </CForm>
        </div>
    );
}

export default SDProductSEO;
