import React,{useState,useEffect,useContext} from "react";

import {
  BsCart3,
  BsGrid1X2Fill,
  BsBox2Fill,
  BsBagCheckFill,
  BsArrowDownUp,
  BsCreditCardFill,
  BsPersonFill,
  BsShop,
  BsFillJournalBookmarkFill,
  BsGlobe,
  BsWallet2,
} from "react-icons/bs";
import { useNavigate ,useLocation} from "react-router-dom";
import { useTranslation } from 'react-i18next'
import { Context } from "../../ContextStore";

import {getSettings} from '../../services/settingsService.js'

function SDSidebar() {
    const navigate= useNavigate();
    const {pathname} = useLocation();
    const { t } = useTranslation();
    const [settings, setSettings] = useState({});
    const { userData } = useContext(Context);

    useEffect(function(){
        async function initData(){
            await getSettings().then((s)=>{
                setSettings(s);
            })
        }
        initData()
  },[])
  return (
    <aside className="SDsidebar">
      <div className="SDsidebar-title">
        <div className="SDsidebar-brand">
          <BsWallet2 className="icon" /> {userData?.balance} TND
        </div>
      </div>

        <ul className='SDsidebar-list'>
            <li style={{cursor:"pointer"}} onClick={(e)=>{navigate('/dashboard')}} className={(pathname === '/dashboard') ? 'SDsidebar-list-item active' : 'SDsidebar-list-item'}>
                <a style={{color:"white",opacity:"0.8"}}>
                    <BsGrid1X2Fill className='icon'/> {t("sd_sidebar.Dashboard")}
                </a>
            </li>
            <li style={{cursor:"pointer"}} onClick={(e)=>{navigate('/dashboard/profile')}} className={(pathname === '/dashboard/profile') ? 'SDsidebar-list-item active' : 'SDsidebar-list-item'}>
                <a style={{color:"white",opacity:"0.8"}}>
                    <BsPersonFill className='icon'/> {t("sd_sidebar.Profile")}
                </a>
            </li>
            {settings?.SellerCanAddSocials? 
                <li style={{cursor:"pointer"}} onClick={(e)=>{navigate('/dashboard/social')}} className={(pathname === '/dashboard/social') ? 'SDsidebar-list-item active' : 'SDsidebar-list-item'}>
                    <a style={{color:"white",opacity:"0.8"}}>
                        <BsGlobe className='icon'/> {t("sd_sidebar.Social")}
                    </a>
                </li>
            : ""}
            <li style={{cursor:"pointer"}} onClick={(e)=>{navigate('/dashboard/store')}} className={(pathname === '/dashboard/store') ? 'SDsidebar-list-item active' : 'SDsidebar-list-item'}>
                <a style={{color:"white",opacity:"0.8"}}>
                    <BsShop className='icon'/> {t("sd_sidebar.Store")}
                </a>
            </li>
            <li style={{cursor:"pointer"}} onClick={(e)=>{navigate('/dashboard/products')}} className={(pathname === '/dashboard/products') ? 'SDsidebar-list-item active' : 'SDsidebar-list-item'}>
                <a style={{color:"white",opacity:"0.8"}}>
                    <BsBox2Fill className='icon'/> {t("sd_sidebar.Products")}
                </a>
            </li>
            <li style={{cursor:"pointer"}} onClick={(e)=>{navigate('/dashboard/orders')}} className={(pathname === '/dashboard/orders') ? 'SDsidebar-list-item active' : 'SDsidebar-list-item'}>
                <a style={{color:"white",opacity:"0.8"}}>
                    <BsBagCheckFill className='icon'/> {t("sd_sidebar.Orders")}
                </a>
            </li>
            <li style={{cursor:"pointer"}} onClick={(e)=>{navigate('/dashboard/transactions')}} className={(pathname === '/dashboard/transactions') ? 'SDsidebar-list-item active' : 'SDsidebar-list-item'}>
                <a style={{color:"white",opacity:"0.8"}}>
                    <BsArrowDownUp className='icon'/> {t("sd_sidebar.Transactions")}
                </a>
            </li>
            <li style={{cursor:"pointer"}} onClick={(e)=>{navigate('/dashboard/payment')}} className={(pathname === '/dashboard/payment') ? 'SDsidebar-list-item active' : 'SDsidebar-list-item'}>
                <a style={{color:"white",opacity:"0.8"}}>
                    <BsCreditCardFill className='icon'/> {t("sd_sidebar.Payment")}
                </a>
            </li>
            <li style={{cursor:"pointer"}} onClick={(e)=>{navigate('/dashboard/subscription')}} className={(pathname === '/dashboard/subscription') ? 'SDsidebar-list-item active' : 'SDsidebar-list-item'}>
                <a style={{color:"white",opacity:"0.8"}}>
                    <BsFillJournalBookmarkFill className='icon'/> {t("sd_sidebar.Subscription")}
                </a>
            </li>
        </ul>
    </aside>
  );
}

export default SDSidebar;
