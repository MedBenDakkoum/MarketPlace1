// src/Pages/RootLayout.js
import '../components/SD/SD.css'
import React,{useEffect,useContext} from 'react';
import { Outlet } from 'react-router-dom';
import SDSideBar from '../components/SD/SDSideBar'
import CDNavBar from '../components/CD/CDNavBar'
import { Context } from '../ContextStore';
import Error404 from './Error404';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

const SellerDashLayout = () => {
  const navigate = useNavigate();

  const { userData, setUserData } = useContext(Context);
  useEffect(function(){
    if(userData){
      if(!userData.isSubscribed){
        Swal.fire({
          title: "Access to Your Dashboard Requires Subscription",
          text:"To access your dashboard and enjoy our services, please proceed with your subscription payment. Thank you!",
          showCancelButton: true,
          confirmButtonText: "Subscribe",
        }).then(async (result) => {
          if (result.isConfirmed) {
              navigate("/subscribe")
          }else{
            navigate("/")
          }
        });
      }
    }
  },[userData])
  return (
    <>
    {userData?.isSeller && userData?.isSubscribed? (<div className='seller-dash-layout'>
      <SDSideBar/>
      <Outlet/>
    </div>)
    :<Error404/>
    }
    </>
  );
};

export default SellerDashLayout;
