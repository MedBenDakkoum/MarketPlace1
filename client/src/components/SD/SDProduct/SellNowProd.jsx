import React,{useState,useEffect} from "react";
import {LineChart,PieChart} from '@mui/x-charts';
import { useNavigate,useParams } from "react-router-dom";
import { CForm,CCol,CFormSelect,CFormInput,CButton,CRow} from '@coreui/react';
import { BsCart, BsCartCheckFill, BsCartFill } from "react-icons/bs";
import {getInitProductById} from '../../../services/productData'
import {addProduct} from '../../../services/dashboardService'
import { ThreeDots } from 'react-loader-spinner'
import Swal from 'sweetalert2';

function SellNowProd({ id=""}) {
    const lang = localStorage.getItem("lang");
    const navigate= useNavigate();
    const [priceAddAmount,setPriceAddAmount]=useState(0);
    const [priceAddType,setPriceAddType]=useState("percentage");
    const [productInfo, setProductInfo] = useState({});
    const [alert, setAlert]= useState({
        msg:"",
        type:"",
        refresh:true
    })
    const [data,setData] = useState({
        initialPrice:0,
        price:0,
    });
    const [loading, setLoading] = useState(false);
    useEffect(function(){
        async function init(){
            let data1 = await getInitProductById(id);
            setProductInfo(data1);
        }
        init()
    },[])
    useEffect(function(){
        setData({price:productInfo.price || 0,initialPrice:productInfo.price || 0});
    },[productInfo,setProductInfo])
    useEffect(function(){
        setData({...data,price:calculate(priceAddType,parseFloat(data.initialPrice),parseFloat(priceAddAmount)).toFixed(2)})
    },[priceAddType,setPriceAddType])
    useEffect(function(){
        setData({...data,price:calculate(priceAddType,parseFloat(data.initialPrice),parseFloat(priceAddAmount)).toFixed(2)})
    },[priceAddAmount,setPriceAddAmount])
    const handleChangeAddedPrice = (e)=>{
        setPriceAddAmount(e.target.value);
    }
    const handleChangeAddType = (e)=>{
        setPriceAddType(e.target.value);
    }
    const handleSumbit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        let newData = {productId:id,price:{initPrice:data.initialPrice,priceAddType:priceAddType,priceAddAmount:priceAddAmount,price:data.price}}
        await addProduct(newData)
        .then(updatedData => {
            Swal.fire({
                icon: "success",
                title: "Added Successfully !",
                showConfirmButton: false,
                timer: 1500
              });
          })
          .catch(error => {
            Swal.fire({
                icon: "error",
                title: "Oops !",
                text:error.message,
              });
          });
        setLoading(false);
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
        <div className="addprod-pop-main">
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
                {!Object.keys(productInfo).length==0?
                <>
                <div className="info-prod-sell-now">
                    <img src={productInfo?.images[0]}/>
                    <div className="info-prod-info">
                        <h1>{productInfo.name[lang]}</h1>
                        <p>{productInfo.description[lang]}</p>
                    </div>
                </div>
                    <CForm className="row g-3" onSubmit={handleSumbit}>
                        <CCol md={12}>
                            <CRow>
                                <CCol md={12}>
                                    <CFormInput name="price" value={data.initialPrice+" TND"} type="text" id="initialPrice" label="Initial Price" disabled/>
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
                                    <CFormInput name="price" value={data.price+" TND"} type="text" id="price" label="New price" disabled/>
                                </CCol>
                                <CCol md={12}>
                                    <CButton type="submit">
                                        Sell product
                                    </CButton>
                                </CCol>
                            </CRow>
                        </CCol>
                    </CForm>
                </>
                :
                    <h1>test</h1>
                }
            
        </div>
    );
}

export default SellNowProd;
