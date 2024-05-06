import React from "react";

import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
let oc = 0;

function AdminSidebar({openSidebarToggle, OpenSidebar}) {
    const navigate= useNavigate();
    const ToggleMp = () => {
        if(oc){
            document.getElementsByClassName('marketplace-dropdown')[0].style = "height:0"
            oc=0;    
        }else{
            document.getElementsByClassName('marketplace-dropdown')[0].style = "height:240px"
            oc=1;
        }
    }
    
    const ToggleOrders = () => {
        if(oc){
            document.getElementsByClassName('orders-dropdown')[0].style = "height:0"
            oc=0;    
        }else{
            document.getElementsByClassName('orders-dropdown')[0].style = "height:120px"
            oc=1;
        }
    }
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand sli">
          <BsCart3 className="icon_header" /> ADGHAL
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <a onClick={(e)=>{navigate("/admin")}}>
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a className="sli" onClick={ToggleOrders}>
                    <BsFillArchiveFill className='icon'/> Orders
                </a>
            </li>
            <div className='sidebar-list-dropdown orders-dropdown'>
                    <a className="drop-a" onClick={(e)=>{navigate("/admin/orders")}}>Orders</a>
                    <a className="drop-a" onClick={(e)=>{navigate("/admin/invoices")}}>Invoices</a>
                    <a className="drop-a" onClick={(e)=>{navigate("/admin/carts")}}>Shopping Cart</a>
            </div>
            <li className='sidebar-list-item'>
                <a onClick={(e)=>{navigate("/admin/categories")}}>
                    <BsFillGrid3X3GapFill className='icon'/> Categories
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a onClick={(e)=>{navigate("/admin/customers")}}>
                    <BsPeopleFill className='icon'/> Customers
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a className="sli" onClick={ToggleMp}>
                    <BsListCheck className='icon'/> Marketplace
                </a>
            </li>
            <div className='sidebar-list-dropdown marketplace-dropdown'>
                    <a className="drop-a" onClick={(e)=>{navigate("/admin/mp/config")}}>Configuration</a>
                    <a className="drop-a" onClick={(e)=>{navigate("/admin/mp/sellers")}}>Sellers</a>
                    <a className="drop-a" onClick={(e)=>{navigate("/admin/mp/products")}}>Products</a>
                    <a className="drop-a" onClick={(e)=>{navigate("/admin/mp/reviews")}}>Reviews</a>
                    <a className="drop-a" onClick={(e)=>{navigate("/admin/mp/orders")}}>Orders</a>
                    <a className="drop-a" onClick={(e)=>{navigate("/admin/mp/employees")}}>Employees</a>
            </div>
            <li className='sidebar-list-item'>
                <a onClick={(e)=>{navigate("/admin/settings")}}>
                    <BsFillGearFill className='icon'/> Settings
                </a>
            </li>
        </ul>
    </aside>
  );
}

export default AdminSidebar;
