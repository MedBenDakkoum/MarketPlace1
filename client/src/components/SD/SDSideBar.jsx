import React,{useState,useEffect,useContext,useRef} from "react";

import {
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
  BsList,
} from "react-icons/bs";
import { useNavigate ,useLocation} from "react-router-dom";
import { useTranslation } from 'react-i18next'
import { Context } from "../../ContextStore";

import {getSettings} from '../../services/settingsService.js'

function SDSidebar() {
    const navigate= useNavigate();
    const {pathname} = useLocation();
    const sideBarMenu = useRef(null);
    const { t } = useTranslation();
    const [settings, setSettings] = useState({});
    const { userData } = useContext(Context);
    const [styleSideBar,setStyleSideBar] = useState({})
    useEffect(function(){
        async function initData(){
            await getSettings().then((s)=>{
                setSettings(s);
            })
        }
        initData()
  },[])
  const toggleSideBar = ()=>{
    setStyleSideBar({maxWidth:"500px"});
  }
  const closeOpenMenus = (e)=>{
    if(styleSideBar.maxWidth=="500px" && !sideBarMenu.current?.contains(e.target)){
        setStyleSideBar({maxWidth:"0"})
    }
  }
  document.addEventListener('mousedown',closeOpenMenus)

  return (
    <>
    <BsList onClick={toggleSideBar} className="SDsidebarList"></BsList>
    <aside style={styleSideBar} ref={sideBarMenu} className="SDsidebar">
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
        </ul>
    </aside>
    </>
  );
}

export default SDSidebar;
