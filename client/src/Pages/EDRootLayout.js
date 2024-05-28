// src/Pages/RootLayout.js
import React from 'react';
import '../components/Dashboard/Dashboard.css';
import { useState, useEffect } from 'react';
import { Outlet,useNavigate } from 'react-router-dom';
import EDHeader from '../components/ED/EDHeader';
import EDSidebar from '../components/ED/EDSidebar';
import { getEmployee } from '../services/userData';
import { Spinner } from 'react-bootstrap';

const EDRootLayout = () => {
  const navigate = useNavigate();

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  useEffect(() => {
    async function fetchData() {
        let u=await getEmployee();
        setEmployeeData(u.user);
        setLoading(false);
        
      }
      fetchData();
    
  },[]);
  useEffect(()=>{
    console.log(employeeData);
  },[employeeData,setEmployeeData])
  return (
    
    <>
    {!loading? <>
      { employeeData?.isActive?
      <div className='grid-container'>
        <EDHeader OpenSidebar={OpenSidebar}/>
        <EDSidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
        <Outlet />
      </div>
      : <div onClick={navigate("/")}></div>
      }
      </>
        : <div className="spinner">
            <Spinner animation="border" />
          </div>  
        }
    </>
  );
};

export default EDRootLayout;
