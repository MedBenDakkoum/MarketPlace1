import { useState, useEffect } from 'react';
import '../components/Dashboard/Dashboard.css';
import AdminHeader from '../components/Dashboard/AdminHeader';
import AdminSidebar from '../components/Dashboard/AdminSidebar';
import AdminHome from '../components/Dashboard/AdminHome';
import MpProducts from '../components/Dashboard/MpProducts';
import MpOrders from '../components/Dashboard/MpOrders';
import MpTransactions from '../components/Dashboard/MpTransactions';
import MpSellers from '../components/Dashboard/MpSellers';
import MpSellerEdit from '../components/Dashboard/MpSellerEdit';
import { getInfo } from '../services/userData';
import Error404 from './Error404';
// import { Switch, Route } from 'react-router-dom';
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
      <AdminHeader OpenSidebar={OpenSidebar}/>
      <AdminSidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      {/* <Switch>
        <Route exact path="/admin" component={AdminHome}></Route>
        <Route exact path="/admin/mp/sellers" component={MpSellers}></Route>
        <Route exact path="/admin/mp/sellers/:id" component={MpSellerEdit}></Route>
        <Route exact path="/admin/mp/products" component={MpProducts}></Route>
        <Route exact path="/admin/mp/orders" component={MpOrders}></Route>
        <Route exact path="/admin/mp/transactions" component={MpTransactions}></Route>
      </Switch> */}
    </div>
    </>
   ) : (<><Error404/></>)}
  </>
  )
}

export default Admin;