import React from 'react'
import { useNavigate ,useLocation} from "react-router-dom";

function CDNavBar() {
  const navigate= useNavigate();
  const {pathname} = useLocation();
  return (
    <div className='cd-nav-bar-container'>
        <div className="cd-nav-bar">
            <div onClick={(e)=>{navigate('/cd')}} className={(pathname === '/cd') ? 'single-nav-bar-section active' : 'single-nav-bar-section'}>
                <h1>Profile</h1>
            </div>
            <div onClick={(e)=>{navigate('/cd/orders')}} className={(pathname === '/cd/orders') ? 'single-nav-bar-section active' : 'single-nav-bar-section'}>
                <h1>Orders</h1>
            </div>
        </div>
    </div>
  )
}

export default CDNavBar