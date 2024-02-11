// src/Pages/RootLayout.js
import '../components/SD/SD.css'
import React from 'react';
import { Outlet } from 'react-router-dom';
import SDSideBar from '../components/SD/SDSideBar'

const SellerDashLayout = () => {
  return (
    <div className='seller-dash-layout'>
      <SDSideBar/>
      <Outlet/>
    </div>
  );
};

export default SellerDashLayout;
