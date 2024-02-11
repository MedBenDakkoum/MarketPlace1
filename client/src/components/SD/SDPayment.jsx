import React,{useState,useEffect} from "react";
import {LineChart,PieChart} from '@mui/x-charts';
import { useNavigate } from "react-router-dom";
import { CForm,CCol,CFormSelect,CRow} from '@coreui/react';
import { BsCart, BsCartCheckFill, BsCartFill } from "react-icons/bs";

function SDPayment() {
    const navigate= useNavigate();
    return (
      <main className="sd-container">
          <div className="sd-section-title">
            <h1>Payment</h1>
          </div>
          <div className="sd-section-main">
            
          </div>
      </main>
    );
}

export default SDPayment;
