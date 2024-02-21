import React,{useState,useEffect} from "react";
import {LineChart,PieChart} from '@mui/x-charts';
import { useNavigate,useParams } from "react-router-dom";
import { CForm,CCol,CFormSelect,CRow,CFormInput,CButton, CFormTextarea} from '@coreui/react';
import { BsCart, BsCartCheckFill, BsCartFill } from "react-icons/bs";
import {getInitialProdData} from "../../../services/dashboardService"

function SDProductInfo() {
    const navigate= useNavigate();
    const params = useParams();
    const [data,setData] = useState({
        name:"",
        description:"",
        reference:"",
        quantity:"",
        weight:"",
        manufacterName:""
    });
    useEffect(function(){
        async function init(){
            let newData = await getInitialProdData(params.id);
            setData({
                name:newData.name || "",
                description:newData.description || "",
                reference:newData.ref || "",
                quantity:newData.quantity || "",
                weight:newData.weight || "",
                manufacterName:newData.manufacterName || ""
            });
          }
          init()
    },[])
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
