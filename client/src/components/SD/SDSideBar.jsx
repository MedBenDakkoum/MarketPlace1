import React,{useState,useEffect} from "react";

import {
  BsCart3,
  BsGrid1X2Fill,
  BsBox2Fill,
  BsBagCheckFill,
  BsArrowDownUp,
  BsCreditCardFill,
  BsPersonFill,
  BsShop,
  BsArrowCounterclockwise,
  BsFillJournalBookmarkFill,
} from "react-icons/bs";
import { useNavigate ,useLocation} from "react-router-dom";

function SDSidebar() {
    const navigate= useNavigate();
    const {pathname} = useLocation();

  return (
    <aside className="SDsidebar">
      <div className="SDsidebar-title">
        <div className="SDsidebar-brand">
          <BsCart3 className="icon_header" /> SHOP
        </div>
      </div>

        <ul className='SDsidebar-list'>
            <li style={{cursor:"pointer"}} onClick={(e)=>{navigate('/dashboard')}} className={(pathname === '/dashboard') ? 'SDsidebar-list-item active' : 'SDsidebar-list-item'}>
                <a >
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </a>
            </li>
            <li style={{cursor:"pointer"}} onClick={(e)=>{navigate('/dashboard/profile')}} className={(pathname === '/dashboard/profile') ? 'SDsidebar-list-item active' : 'SDsidebar-list-item'}>
                <a >
                    <BsPersonFill className='icon'/> Profile
                </a>
            </li>
            <li style={{cursor:"pointer"}} onClick={(e)=>{navigate('/dashboard/store')}} className={(pathname === '/dashboard/store') ? 'SDsidebar-list-item active' : 'SDsidebar-list-item'}>
                <a >
                    <BsShop className='icon'/> Store
                </a>
            </li>
            <li style={{cursor:"pointer"}} onClick={(e)=>{navigate('/dashboard/products')}} className={(pathname === '/dashboard/products') ? 'SDsidebar-list-item active' : 'SDsidebar-list-item'}>
                <a >
                    <BsBox2Fill className='icon'/> Products
                </a>
            </li>
            <li style={{cursor:"pointer"}} onClick={(e)=>{navigate('/dashboard/orders')}} className={(pathname === '/dashboard/orders') ? 'SDsidebar-list-item active' : 'SDsidebar-list-item'}>
                <a >
                    <BsBagCheckFill className='icon'/> Orders
                </a>
            </li>
            <li style={{cursor:"pointer"}} onClick={(e)=>{navigate('/dashboard/returns')}} className={(pathname === '/dashboard/returns') ? 'SDsidebar-list-item active' : 'SDsidebar-list-item'}>
                <a >
                    <BsArrowCounterclockwise className='icon'/> Returns
                </a>
            </li>
            <li style={{cursor:"pointer"}} onClick={(e)=>{navigate('/dashboard/transactions')}} className={(pathname === '/dashboard/transactions') ? 'SDsidebar-list-item active' : 'SDsidebar-list-item'}>
                <a >
                    <BsArrowDownUp className='icon'/> Transactions
                </a>
            </li>
            <li style={{cursor:"pointer"}} onClick={(e)=>{navigate('/dashboard/payment')}} className={(pathname === '/dashboard/payment') ? 'SDsidebar-list-item active' : 'SDsidebar-list-item'}>
                <a>
                    <BsCreditCardFill className='icon'/> Payment
                </a>
            </li>
            <li style={{cursor:"pointer"}} onClick={(e)=>{navigate('/dashboard/subscription')}} className={(pathname === '/dashboard/subscription') ? 'SDsidebar-list-item active' : 'SDsidebar-list-item'}>
                <a>
                    <BsFillJournalBookmarkFill className='icon'/> Subscription
                </a>
            </li>
        </ul>
    </aside>
  );
}

export default SDSidebar;
