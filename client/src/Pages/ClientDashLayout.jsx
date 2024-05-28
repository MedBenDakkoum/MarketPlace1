// src/Pages/RootLayout.js
import '../components/CD/CD.css'
import React,{useContext} from 'react';
import { Outlet } from 'react-router-dom';
import CDNavBar from '../components/CD/CDNavBar'
import { Context } from '../ContextStore';
import Error404 from './Error404';

const ClientDashLayout = () => {
  const { userData, setUserData } = useContext(Context);
  return (
    <>
    {userData? (
    <div className='client-dash-layout'>
      <div className="client-dash">
        <CDNavBar/>
        <Outlet/>
      </div>
    </div>
    )
    :<Error404/>
    }
    </>
  );
};

export default ClientDashLayout;
