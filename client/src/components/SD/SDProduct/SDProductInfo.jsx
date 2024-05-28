import React,{useState,useEffect} from "react";
import { useNavigate,useParams } from "react-router-dom";
import { CForm,CCol,CRow,CFormInput, CFormTextarea} from '@coreui/react';
import {getInitialProdData} from "../../../services/dashboardService"

function SDProductInfo() {
    const lang = localStorage.getItem("lang");
    const navigate= useNavigate();
    const params = useParams();
    const [data,setData] = useState({
        name:"",
        description:"",
        reference:"",
        quantity:"",
        weight:"",
    });
    useEffect(function(){
        async function init(){
            let newData = await getInitialProdData(params.id);
            setData({
                name:newData.name[lang] || "",
                description:newData.description[lang] || "",
                reference:newData.ref || "",
                quantity:newData.quantity || "",
                weight:newData.weight || "",
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
                    </CRow>
                </CCol>
            </CForm>
        </div>
    );
}

export default SDProductInfo;
