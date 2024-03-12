// src/Pages/RootLayout.js
import '../components/SD/SD.css'
import React,{useContext} from 'react';
import { Outlet } from 'react-router-dom';
import SDSideBar from '../components/SD/SDSideBar'
import CDNavBar from '../components/CD/CDNavBar'
import { Context } from '../ContextStore';
import Error404 from './Error404';

const SellerDashLayout = () => {
  const { userData, setUserData } = useContext(Context);
  return (
    <>
    {userData?.isSeller ? (<div className='seller-dash-layout'>
      <SDSideBar/>
      <Outlet/>
    </div>)
    :<Error404/>
    }
    </>
  );
};

export default SellerDashLayout;
