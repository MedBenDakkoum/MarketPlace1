import { useState,useEffect, React } from "react"
import {CButton} from '@coreui/react'

const MultiSelect = props => {
  const lang = localStorage.getItem("lang"); 
  const [adminCookie,setAdminCookie]=useState(0);
  const [employeeCookie,setEmployeeCookie]=useState(0);
  useEffect(function(){
    setAdminCookie(document.cookie.indexOf('ADMIN_SESSION='));
    setEmployeeCookie(document.cookie.indexOf('EMPLOYEE_SESSION='));
  },[])
  return (
    <div style={{position:"fixed",bottom:"10px",right:"10px",display:"flex",gap:"10px",zIndex:"1"}}>
        {adminCookie? 
            <CButton style={{fontSize:"14px"}}>Employee Dashboard</CButton>
        : ""}
        {employeeCookie? 
            <CButton style={{fontSize:"14px"}}>Admin Dashboard</CButton>
        : ""}
    </div>
  )
}

export default MultiSelect;