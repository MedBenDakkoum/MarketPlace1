import { useState,useEffect, React } from "react";
import {CButton} from '@coreui/react';
import {checkSessions} from "../../services/settingsService";
import { useNavigate } from 'react-router-dom';

const MultiSelect = props => {
  const navigate = useNavigate();
  const lang = localStorage.getItem("lang"); 
  const [adminCookie,setAdminCookie]=useState(false);
  const [employeeCookie,setEmployeeCookie]=useState(false);
  useEffect(function(){
    async function init(){
      await checkSessions().then(rslt=>{
        setAdminCookie(rslt.aExists);
        setEmployeeCookie(rslt.eExists);    
      })
    }
    init()
  },[])
  return (
    <div style={{position:"fixed",bottom:"10px",right:"10px",display:"flex",gap:"10px",zIndex:"1"}}>
        {adminCookie? 
            <CButton onClick={(e)=>{navigate('/admin')}} style={{fontSize:"14px"}}>Admin Dashboard</CButton>
        : ""}
        {employeeCookie? 
            <CButton onClick={(e)=>{navigate('/employee')}} style={{fontSize:"14px"}}>Employee Dashboard</CButton>
        : ""}
    </div>
  )
}

export default MultiSelect;