import React from 'react'
import 
 {BsFillBellFill, BsBoxArrowRight, BsJustify}
 from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
function EDHeader({OpenSidebar}) {
  const navigate = useNavigate();
  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-right'>
            <BsFillBellFill className='icon'/>
            <BsBoxArrowRight onClick={(e)=>{navigate("/employee/logout")}} style={{cursor:"pointer"}} className='icon'/>
        </div>
    </header>
  )
}

export default EDHeader;