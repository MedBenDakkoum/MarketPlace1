import { useState, useEffect } from 'react'
import '../components/Dashboard/Dashboard.css'
import Header from '../components/Dashboard/Header'
import Sidebar from '../components/Dashboard/Sidebar'
import Home from '../components/Dashboard/Home'
import { getInfo } from '../services/userData';
import Error404 from './Error404'
function Admin() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const [user, setUser] = useState({});
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  useEffect(() => {
    async function fetchData() {
        let u=await getInfo();
        setUser(u.user);
      }
      fetchData();
    
  },[]);
  
  return (
    <>
    { user?.isAdmin ? ( <>
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Home />
    </div>
    </>
   ) : (<><Error404/></>)}
  </>
  )
}

export default Admin;