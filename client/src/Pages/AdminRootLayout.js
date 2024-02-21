// src/Pages/RootLayout.js
import React from 'react';
import '../components/Dashboard/Dashboard.css';
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../components/Dashboard/AdminHeader';
import AdminSidebar from '../components/Dashboard/AdminSidebar';
import AdminHome from '../components/Dashboard/AdminHome';
import { getInfo } from '../services/userData';
import Error404 from '../Pages/Error404';
import { Spinner } from 'react-bootstrap';

const AdminRootLayout = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const [adminData, setAdminData] = useState([]);
  const [loading, setLoading] = useState(true);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  useEffect(() => {
    async function fetchData() {
        let u=await getInfo();
        console.log(u);
        setAdminData(u.user);
        setLoading(false);

      }
      fetchData();
    
  },[]);
  
  return (
    
    <>
    {!loading? <>
      { adminData?.isAdmin? 
      <div className='grid-container'>
        <AdminHeader OpenSidebar={OpenSidebar}/>
        <AdminSidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
        <Outlet />
      </div>
      : <Error404 />}
      </>
        : <div className="spinner">
            <Spinner animation="border" />
          </div>  
        }
    </>
  );
};

export default AdminRootLayout;
