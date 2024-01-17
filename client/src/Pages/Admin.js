import { useState, useEffect } from 'react'
import '../components/Dashboard/Dashboard.css'
import Header from '../components/Dashboard/Header'
import Sidebar from '../components/Dashboard/Sidebar'
import Home from '../components/Dashboard/Home'
import { getUserById,getUser } from '../services/userData';

function Admin() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const [user, setUser] = useState([]);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  useEffect(() => {
    async function fetchData() {
        console.log(await getUser());
      }
      fetchData();
    
  });
  
  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Home />
    </div>
  )
}

export default Admin;