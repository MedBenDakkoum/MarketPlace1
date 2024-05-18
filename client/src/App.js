import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Categories from "./Pages/Categories";
import Home from "./Pages/Home";
import Error404 from "./Pages/Error404";
import RootLayout from "./Pages/RootLayout";
import { ContextStore } from "./ContextStore";
import AdminRootLayout from "./Pages/AdminRootLayout";
import AdminLogOut from "./Pages/AdminLogOut";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ForgotPassword from "./Pages/ForgotPassword"
import ResetPassword from "./Pages/ResetPassword"
import LogOut from "./Pages/LogOut";
import Store from "./Pages/Store";
import ContactUs from "./Pages/ContactUs";
import AdminLogin from "./Pages/AdminLogin";
import AdminHome from "./components/Dashboard/AdminHome";
import MpProducts from "./components/Dashboard/MpProducts";
import MpProductEdit from "./components/Dashboard/MpProductEdit";
import MpOrders from "./components/Dashboard/MpOrders";
import MpEmployees from "./components/Dashboard/MpEmployees";
import {MpEmployeeAdd} from "./components/Dashboard/MpEmployeeAdd";
import {MpEmployeeEdit} from "./components/Dashboard/MpEmployeeEdit";
import MpSellers from "./components/Dashboard/MpSellers";
import MpReviews from "./components/Dashboard/MpReviews";
import MpSingleReviews from "./components/Dashboard/MpSingleReviews";
import MpSellerEdit from "./components/Dashboard/MpSellerEdit";
import { MpConfig } from "./components/Dashboard/MpConfig";
import MpProductComboEdit from "./components/Dashboard/MpProductCombo/MpProductComboEdit";
import MpOrdersView from "./components/Dashboard/MpOrders/MpOrdersView";
import MpSingleOrderView from "./components/Dashboard/MpOrders/MpSingleOrderView";
import MpTransactions from "./components/Dashboard/MpTransactions";
import AdminOrders from "./components/Dashboard/AdminOrders";
import AdminInvoices from "./components/Dashboard/AdminInvoices";
import AdminCarts from "./components/Dashboard/AdminCarts";
import AdminCategories from "./components/Dashboard/AdminCategories";
import AdminCustomers from "./components/Dashboard/AdminCustomers";
import CustomerEdit from "./components/Dashboard/CustomerEdit/CustomerEdit";
import AdminSettings from "./components/Dashboard/AdminSettings";
import SingleOrder from './components/Dashboard/SingleOrder';
import MpSingleSellerProduct from  './components/Dashboard/MpSingleSellerProduct';
import EDRootLayout from './Pages/EDRootLayout'
import EDOrders from './components/ED/EDOrders'
import EDSellers from './components/ED/EDSellers'
import EDSeller from './components/ED/EDSeller/EDSeller'
import EDSingleOrder from './components/ED/EDSingleOrder'
import EmployeeLogOut from './Pages/EmployeeLogOut'
import Search from './Pages/Search'
import SellerDashLayout from './Pages/SellerDashLayout'
import SDHome from './components/SD/SDHome'
import SDProfile from './components/SD/SDProfile'
import SDSocial from './components/SD/SDSocial'
import SDStore from './components/SD/SDStore'
import SDProducts from './components/SD/SDProducts'
import SDOrders from './components/SD/SDOrders'
import SDReturns from './components/SD/SDReturns'
import SDTransactions from './components/SD/SDTransactions'
import SDPayment from './components/SD/SDPayment'
import SDSubscription from "./components/SD/SDSubscription";
import SDSingleProduct from "./components/SD/SDSingleProduct";
import SellerProfile from "./components/Profile/SellerProfile"
import AddSeller from "./components/Dashboard/AddSeller"
import SingleProduct from "./components/SingleProduct/SingleProduct"
import Cart from "./Pages/Cart"
import ClientDashLayout from "./Pages/ClientDashLayout"
import CDOrders from "./components/CD/CDOrders"
import CDProfile from "./components/CD/CDProfile"
import SellerSubscribe from './Pages/SellerSubscribe'
//import {Action as logoutAction} from './pages/Logout.js'

// const router = createBrowserRouter(router)

export default function App() {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path="/" context={ContextStore} element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="subscribe" element={<SellerSubscribe />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="s/:link" element={<Store />} />
        <Route path="dashboard" element={<SellerDashLayout />} >
          <Route index element={<SDHome />} />
          <Route path="profile" element={<SDProfile />} />
          <Route path="social" element={<SDSocial />} />
          <Route path="store" element={<SDStore />} />
          <Route path="products" element={<SDProducts />} />
          <Route path="products/:id" element={<SDSingleProduct />} />
          <Route path="orders" element={<SDOrders />} />
          <Route path="returns" element={<SDReturns />} />
          <Route path="transactions" element={<SDTransactions />} />
          <Route path="payment" element={<SDPayment />} />
          <Route path="subscription" element={<SDSubscription />} />
        </Route>
        <Route path="cd" element={<ClientDashLayout />} >
          <Route index element={<CDProfile />} />
          <Route path="orders" element={<CDOrders />} />
        </Route>
        <Route path="/seller/:id" element={<SellerProfile />}/>
        <Route path="/products/:id" element={<SingleProduct/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/search" element={<Search/>}/>
      </Route>
      <Route path="/auth" element={<RootLayout />}>
        <Route index element={<Login />} />
        <Route path="login" element={<Login navigate={navigate} />} />
        <Route path="register" element={<Register navigate={navigate} />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="password-reset/:userId/:resetToken" element={<ResetPassword/>} />
        <Route path="logout" exact element={<LogOut navigate={navigate} />} />
      </Route>
      <Route path="/employee" element={<EDRootLayout />}>
        <Route index element={<EDOrders />} />
        <Route path="orders/:id" element={<EDSingleOrder />} />
        <Route path="sellers" element={<EDSellers />} />
        <Route path="sellers/:id" element={<EDSeller />} />
        <Route path="logout" exact element={<EmployeeLogOut navigate={navigate}/>} />
      </Route>
      <Route path="/admin" element={<AdminRootLayout />}>
        <Route index element={<AdminHome />} />
        <Route path="mp/config" element={<MpConfig />} />
        <Route path="mp/sellers" element={<MpSellers />} />
        <Route path="mp/reviews" element={<MpReviews />} />
        <Route path="mp/reviews/:id" element={<MpSingleReviews/>} />
        <Route path="mp/sellers/:id" element={<MpSellerEdit />} />
        <Route path="mp/products" element={<MpProducts />} />
        <Route path="mp/products/:id" element={<MpProductEdit />} />
        <Route path="mp/productcombo/:id" element={<MpProductComboEdit />} />
        <Route path="mp/sellers/:id/orders" element={<MpOrdersView />} />
        <Route path="mp/orders/:id" element={<MpSingleOrderView />} />
        <Route path="mp/orders" element={<MpOrders />} />
        <Route path="mp/employees" element={<MpEmployees />} />
        <Route path="mp/employees/add" element={<MpEmployeeAdd />} />
        <Route path="mp/employees/:id" element={<MpEmployeeEdit />} />
        <Route path="mp/s/:sid/p/:pid" element={<MpSingleSellerProduct />} />
        <Route path="mp/seller/add" element={<AddSeller />} />
        <Route path="mp/transactions" element={<MpTransactions />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="customers/:id" element={<CustomerEdit />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="orders/:id" element={<SingleOrder />} />
        <Route path="invoices" element={<AdminInvoices />} />
        <Route path="carts" element={<AdminCarts />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="logout" exact element={<AdminLogOut navigate={navigate}/>} />
      </Route>
      <Route path="admin-login" element={<AdminLogin/>}/>
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}
