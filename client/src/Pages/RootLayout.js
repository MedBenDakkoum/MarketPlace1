// src/Pages/RootLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import SupervisorsLinks from '../components/SupervisorsLinks/SupervisorsLinks'

const RootLayout = () => {
  return (
    <>
      <Header/>
      <Outlet/>
      <SupervisorsLinks/>
      <Footer/>
    </>
  );
};

export default RootLayout;
