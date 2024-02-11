import React,{useState,useEffect} from "react";
import {LineChart,PieChart} from '@mui/x-charts';
import { useNavigate } from "react-router-dom";
import { CForm,CCol,CFormSelect,CRow} from '@coreui/react';
import { BsCart, BsCartCheckFill, BsCartFill } from "react-icons/bs";

function SDProductAttributes() {
    const navigate= useNavigate();
    return (
        <div>
            Attributes
        </div>
    );
}

export default SDProductAttributes;
