import React,{useState,useEffect} from "react";
import {LineChart,PieChart} from '@mui/x-charts';
import { useNavigate } from "react-router-dom";
import { CForm,CCol,CFormSelect,CRow,CFormInput,CButton, CFormTextarea} from '@coreui/react';
import { BsCart, BsCartCheckFill, BsCartFill } from "react-icons/bs";

function SDProductPrice() {
    const navigate= useNavigate();
    const [addedPrice,setAddedPrice]=useState(0);
    const [addType,setAddType]=useState("percentage");
    const [data,setData] = useState({
        price:40,
        newPrice:0,
    });
    useEffect(function(){
        //set initial data
    },[])
    useEffect(function(){
        setData({...data,newPrice:calculate(addType,parseInt(data.price),parseInt(addedPrice))})
    },[addType,setAddType])
    useEffect(function(){
        setData({...data,newPrice:calculate(addType,parseInt(data.price),parseInt(addedPrice))})
    },[addedPrice,setAddedPrice])
    const handleChangeAddedPrice = (e)=>{
        setAddedPrice(e.target.value);
    }
    const handleChangeAddType = (e)=>{
        setAddType(e.target.value);
    }
    const handleSumbit = (e)=>{
        e.preventDefault();
        let newData = {...data, addType:addType,addedPrice:addedPrice}
        console.log(newData);
    }
    const calculate = (t,p,a)=>{
        if(isNaN(a)){
            a=0;
        }
        switch(t){
            case "percentage":
                return p+((p*a)/100);
                break;
            case "fixed":
                return p+a;
                break;
            default:
                break;
        }
    }
    return (
        <div className="sd-singleproduct-section">
            <CForm className="row g-3" onSubmit={handleSumbit}>
                <CCol md={12}>
                    <CRow>
                        <CCol md={12}>
                            <CFormInput name="price" value={data.price} type="text" id="price" label="Initial Price" disabled/>
                        </CCol>
                        <CCol md={2}>
                            <label htmlFor="addType">Type</label><br></br>
                            <CFormSelect value={addType} onChange={handleChangeAddType} id="addType" name="addType" className="mb-3">
                                <option value="percentage">Percentage</option>
                                <option value="fixed">Fixed</option>
                            </CFormSelect>                        
                        </CCol>
                        <CCol md={6}>
                            <CFormInput name="addedPrice" onChange={handleChangeAddedPrice} value={data.addedPrice} type="text" id="addedPrice" label="Price to add" />
                        </CCol>
                        <CCol md={8}>
                            <CFormInput name="newPrice" value={data.newPrice} type="text" id="newPrice" label="New price" disabled/>
                        </CCol>
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

export default SDProductPrice;
