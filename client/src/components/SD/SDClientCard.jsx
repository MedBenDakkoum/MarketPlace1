import React,{useState,useEffect} from "react";
import {LineChart,PieChart} from '@mui/x-charts';
import { useNavigate } from "react-router-dom";
import { CForm,CCol,CFormSelect,CRow} from '@coreui/react';
import { BsCart, BsCartCheckFill, BsCartFill, BsEnvelope, BsFillTelephoneFill, BsMailbox, BsPhone, BsXCircleFill } from "react-icons/bs";
import {getUserById} from '../../services/userData';

function SDClientCard({active,handleCloseClientCard, setActive, clientId}) {
    const navigate= useNavigate();
    const [data,setData] = useState({});
    
    useEffect(function(){
        
        async function init(){
            if(clientId){
                let clientInfo = await getUserById(clientId);
                setData(clientInfo);
            }
        }
        init();
    },[clientId])
    
    useEffect(function(){
        if(clientId!==""){
            setActive(true);
        }
    },[data,setData])
    return (
        <>
        {active? 
            <div className="client-cart-pop-container">
                <div className="client-cart-pop">
                    <div className="exit-client-cart">
                        <BsXCircleFill onClick={handleCloseClientCard} className="x-close"/>
                    </div>
                    <div className="client-info">
                        <div className="client-avatar">
                            <img src={data?.avatar} alt="" />
                        </div>
                        <div className="client-details">
                            <div className="single-client-detail">
                                <h3>{data?.name}</h3>
                            </div>
                            <div className="single-client-detail">
                                <BsFillTelephoneFill/><span>{data.phoneNumber}</span>
                            </div>
                            <div className="single-client-detail">
                                <BsEnvelope/><span>{data.email}</span>
                            </div>
                            <div className="single-client-detail address">
                                <div><span>Adress 1: </span><span>{data?.address?.line1}</span></div>
                                <div><span>Adress 2: </span><span>{data?.address?.line2}</span></div>
                                <div><span>Country: </span><span>{data?.address?.country}</span></div>
                                <div><span>State: </span><span>{data?.address?.state}</span></div>
                                <div><span>City: </span><span>{data?.address?.city}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        : ""}
      </>
    );
}

export default SDClientCard;
