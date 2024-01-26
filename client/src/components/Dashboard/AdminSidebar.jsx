import React from 'react'
import { useRef } from 'react';
import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill}
 from 'react-icons/bs'

let oc = 0;
const ToggleMp = () => {
    if(oc){
        document.getElementsByClassName('marketplace-dropdown')[0].style = "height:0"
        oc=0;    
    }else{
        document.getElementsByClassName('marketplace-dropdown')[0].style = "height:160px"
        oc=1;
    }
}

function AdminSidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <BsCart3  className='icon_header'/> SHOP
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <a href="/admin">
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillArchiveFill className='icon'/> Products
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillGrid3X3GapFill className='icon'/> Categories
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsPeopleFill className='icon'/> Customers
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a onClick={ToggleMp}>
                    <BsListCheck className='icon'/> Marketplace
                </a>
            </li>
            <div className='marketplace-dropdown'>
                    <a href='/admin/mp/sellers'>Sellers</a>
                    <a href='/admin/mp/products'>Products</a>
                    <a href='/admin/mp/orders'>Orders</a>
                    <a href='/admin/mp/transactions'>Transactions</a>
            </div>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsMenuButtonWideFill className='icon'/> Reports
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillGearFill className='icon'/> Setting
                </a>
            </li>
        </ul>
    </aside>
  )
}

export default AdminSidebar