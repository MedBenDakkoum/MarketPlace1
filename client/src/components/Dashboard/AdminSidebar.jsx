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

function AdminSidebar({ openSidebarToggle, OpenSidebar }) {
  const navigate = useNavigate();
  const ToggleMp = () => {
    if (oc) {
      document.getElementsByClassName("marketplace-dropdown")[0].style =
        "height:0";
      oc = 0;
    } else {
      document.getElementsByClassName("marketplace-dropdown")[0].style =
        "height:160px";
      oc = 1;
    }
    navigate("/admin/mp");
  };
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand sli">
          <BsCart3 className="icon_header" /> SHOP
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <a href="/admin">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <BsFillArchiveFill className="icon" /> Products
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <BsFillGrid3X3GapFill className="icon" /> Categories
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <BsPeopleFill className="icon" /> Customers
          </a>
        </li>
        <li className="sidebar-list-item">
          <a className="sli" onClick={ToggleMp}>
            <BsListCheck className="icon" /> Marketplace
          </a>
        </li>
        <div className="marketplace-dropdown">
          <a
            className="mpa"
            onClick={(e) => {
              navigate("/admin/mp/config");
            }}
          >
            Configuration
          </a>
          <a
            className="mpa"
            onClick={(e) => {
              navigate("/admin/mp/sellers");
            }}
          >
            Sellers
          </a>
          <a
            className="mpa"
            onClick={(e) => {
              navigate("/admin/mp/products");
            }}
          >
            Products
          </a>
          <a
            className="mpa"
            onClick={(e) => {
              navigate("/admin/mp/orders");
            }}
          >
            Orders
          </a>
          <a
            className="mpa"
            onClick={(e) => {
              navigate("/admin/mp/transactions");
            }}
          >
            Transactions
          </a>
        </div>
        <li className="sidebar-list-item">
          <a href="">
            <BsMenuButtonWideFill className="icon" /> Reports
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <BsFillGearFill className="icon" /> Setting
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default AdminSidebar;
