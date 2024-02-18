import React,{useState,useEffect} from "react";
import {LineChart,PieChart} from '@mui/x-charts';
import { useNavigate ,useParams} from "react-router-dom";
import { CForm,CCol,CFormSelect,CRow,CFormInput,CButton, CFormTextarea} from '@coreui/react';
import { BsCart, BsCartCheckFill, BsCartFill } from "react-icons/bs";
import {getProductPrice,changeProductPrice} from "../../../services/dashboardService";
function SDProductPrice() {
    const navigate= useNavigate();
    const params = useParams();
    const [priceAddAmount,setPriceAddAmount]=useState(0);
    const [priceAddType,setPriceAddType]=useState("percentage");
    const [data,setData] = useState({
        initialPrice:0,
        price:0,
    });
    useEffect(function(){
        async function init(){
            let p = await getProductPrice(params.id);
            setData({
                initialPrice:p.initialPrice,
                price:p.price
            })
            setPriceAddType(p.priceAddType);
            setPriceAddAmount(p.priceAddAmount);
        }
        init();
    },[])
    useEffect(function(){
        setData({...data,price:calculate(priceAddType,parseInt(data.initialPrice),parseInt(priceAddAmount))})
    },[priceAddType,setPriceAddType])
    useEffect(function(){
        setData({...data,price:calculate(priceAddType,parseInt(data.initialPrice),parseInt(priceAddAmount))})
    },[priceAddAmount,setPriceAddAmount])
    const handleChangeAddedPrice = (e)=>{
        setPriceAddAmount(e.target.value);
    }
    const handleChangeAddType = (e)=>{
        setPriceAddType(e.target.value);
    }
    const handleSumbit = async (e)=>{
        e.preventDefault();
        let newData = {initPrice:data.initialPrice,priceAddType:priceAddType,priceAddAmount:priceAddAmount,price:data.price}
        await changeProductPrice(params.id,newData)
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
                            <CFormInput name="price" value={data.initialPrice} type="text" id="initialPrice" label="Initial Price" disabled/>
                        </CCol>
                        <CCol md={2}>
                            <label htmlFor="priceAddType">Type</label><br></br>
                            <CFormSelect value={priceAddType} onChange={handleChangeAddType} id="priceAddType" name="priceAddType" className="mb-3">
                                <option value="percentage">Percentage</option>
                                <option value="fixed">Fixed</option>
                            </CFormSelect>                        
                        </CCol>
                        <CCol md={6}>
                            <CFormInput name="priceAddAmount" onChange={handleChangeAddedPrice} value={priceAddAmount} type="text" id="priceAddAmount" label="Price to add" />
                        </CCol>
                        <CCol md={8}>
                            <CFormInput name="price" value={data.price} type="text" id="price" label="New price" disabled/>
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
