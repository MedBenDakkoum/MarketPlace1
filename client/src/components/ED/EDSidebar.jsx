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

function EDSidebar({openSidebarToggle, OpenSidebar}) {
    const navigate= useNavigate();
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
                <a onClick={(e)=>{navigate("/employee")}}>
                    <BsFillArchiveFill className='icon'/> Orders
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a onClick={(e)=>{navigate("/employee/sellers")}}>
                    <BsPeopleFill className='icon'/> Sellers
                </a>
            </li>
        </ul>
    </aside>
  );
}

export default EDSidebar;
