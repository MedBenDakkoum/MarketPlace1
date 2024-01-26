import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import Categories from './Pages/Categories';
import Home from './Pages/Home';
import Error404 from './Pages/Error404';
import RootLayout from './Pages/RootLayout';
import { ContextStore } from './ContextStore';
import AdminRootLayout from './Pages/AdminRootLayout';
import AdminLogOut from './Pages/AdminLogOut';
import Login from './Pages/Login';
import Register from './Pages/Register';
import LogOut from './Pages/LogOut';
import Store from './Pages/Store';
import AdminHome from './components/Dashboard/AdminHome';
import MpProducts from './components/Dashboard/MpProducts';
import MpOrders from './components/Dashboard/MpOrders';
import MpTransactions from './components/Dashboard/MpTransactions';
import MpSellers from './components/Dashboard/MpSellers';
import MpSellerEdit from './components/Dashboard/MpSellerEdit';

//import {Action as logoutAction} from './pages/Logout.js'

// const router = createBrowserRouter(router)

export default function App() {
  const navigate = useNavigate();
  return (
      <Routes>
        <Route path="/" context={ContextStore} element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="s" element={<Store/>} />
        </Route>
        <Route path="/auth" element={<RootLayout />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login navigate={navigate}/>} />
          <Route path="register" element={<Register navigate={navigate}/>} />
          <Route path="logout" exact element={<LogOut navigate={navigate}/>}  />
        </Route>
        <Route path="/admin" element={<AdminRootLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="mp/sellers" element={<MpSellers />} />
          <Route path="mp/sellers/:id" element={<MpSellerEdit />} />
          <Route path="register" element={<Register />} />
          <Route path="logout" exact element={LogOut} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
  );
}

