import React,{useState,useEffect} from "react";
import {LineChart,PieChart} from '@mui/x-charts';
import { useNavigate } from "react-router-dom";
import { BsCart, BsCartCheckFill, BsCartFill } from "react-icons/bs";

function SDReturns() {
    const navigate= useNavigate();
    return (
      <main className="sd-container">
          <div className="sd-section-title">
            <h1>Returns</h1>
          </div>
          <div className="sd-section-main">
          
          </div>
      </main>
    );
}

export default SDReturns;
