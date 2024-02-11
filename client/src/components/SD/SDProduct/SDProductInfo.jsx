import React,{useState,useEffect} from "react";
import {LineChart,PieChart} from '@mui/x-charts';
import { useNavigate } from "react-router-dom";
import { CForm,CCol,CFormSelect,CRow,CFormInput,CButton, CFormTextarea} from '@coreui/react';
import { BsCart, BsCartCheckFill, BsCartFill } from "react-icons/bs";

function SDProductInfo() {
    const navigate= useNavigate();
    const [data,setData] = useState({
        name:"",
        description:"",
        reference:"",
        quantity:"",
        weight:"",
        manufacterName:""
    });
    useEffect(function(){
        //set initial data
    },[])
    const handleChange = (e)=>{
        setData({...data,[e.target.name]: e.target.value})
    }
    const handleSumbit = (e)=>{
        e.preventDefault();
        console.log(data);
    }
    return (
        <div className="sd-singleproduct-section">
            <CForm className="row g-3">
                <CCol md={12}>
                    <CRow>
                        <CCol md={12}>
                            <CFormInput name="name" value={data.name} type="text" id="name" label="Name" disabled/>
                        </CCol>
                        <CCol md={12}>
                            <CFormTextarea name="description" value={data.description} type="text" id="description" label="Description" disabled/>
                        </CCol>
                        <CCol md={12}>
                            <CFormInput name="reference" value={data.reference} type="text" id="reference" label="Reference" disabled/>   
                        </CCol>
                        <CCol md={12}>
                            <CFormInput name="quantity" value={data.quantity} type="text" id="quantity" label="Quantity" disabled/>   
                        </CCol>
                        <CCol md={12}>
                            <CFormInput name="weight" value={data.weight} type="text" id="weight" label="Weight" disabled/>
                        </CCol>
                        <CCol md={12}>
                            <CFormInput name="manufacterName" value={data.manufacterName} type="text" id="manufacterName" label="Manufacter Name" disabled/>
                        </CCol>
                    </CRow>
                </CCol>
            </CForm>
        </div>
    );
}

export default SDProductInfo;
