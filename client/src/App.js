import "bootstrap/dist/css/bootstrap.min.css";
// import './App.css';
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
import LogOut from "./Pages/LogOut";
import Store from "./Pages/Store";
import AdminHome from "./components/Dashboard/AdminHome";
import MpProducts from "./components/Dashboard/MpProducts";
import MpProductEdit from "./components/Dashboard/MpProductEdit";
import MpOrders from "./components/Dashboard/MpOrders";
import MpTransactions from "./components/Dashboard/MpTransactions";
import MpSellers from "./components/Dashboard/MpSellers";
import MpSellerEdit from "./components/Dashboard/MpSellerEdit";
import { MpConfig } from "./components/Dashboard/MpConfig";
import MpProductComboEdit from "./components/Dashboard/MpProductCombo/MpProductComboEdit";
import MpOrdersView from "./components/Dashboard/MpOrders/MpOrdersView";
import MpSingleOrderView from "./components/Dashboard/MpOrders/MpSingleOrderView";
import AdminOrders from "./components/Dashboard/AdminOrders";
import AdminInvoices from "./components/Dashboard/AdminInvoices";
import AdminCarts from "./components/Dashboard/AdminCarts";
import AddSeller from "./components/Dashboard/AddSeller";

import SingleOrder from "./components/Dashboard/SingleOrder";
import MpSingleSellerProduct from "./components/Dashboard/MpSingleSellerProduct";
import Mp from "./components/Dashboard/Mp";
import SellerDashLayout from "./Pages/SellerDashLayout";
import SDHome from "./components/SD/SDHome";
import SDProfile from "./components/SD/SDProfile";
import SDStore from "./components/SD/SDStore";
import SDProducts from "./components/SD/SDProducts";
import SDOrders from "./components/SD/SDOrders";
import SDReturns from "./components/SD/SDReturns";
import SDTransactions from "./components/SD/SDTransactions";
import SDPayment from "./components/SD/SDPayment";
import SDSubscription from "./components/SD/SDSubscription";
import SDSingleProduct from "./components/SD/SDSingleProduct";
import SellerProfile from "./components/Profile/SellerProfile";
//import {Action as logoutAction} from './pages/Logout.js'

// const router = createBrowserRouter(router)

export default function App() {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path="/" context={ContextStore} element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="s" element={<Store />} />
        <Route path="dashboard" element={<SellerDashLayout />}>
          <Route index element={<SDHome />} />
          <Route path="profile" element={<SDProfile />} />
          <Route path="store" element={<SDStore />} />
          <Route path="products" element={<SDProducts />} />
          <Route path="products/:id" element={<SDSingleProduct />} />
          <Route path="orders" element={<SDOrders />} />
          <Route path="returns" element={<SDReturns />} />
          <Route path="transactions" element={<SDTransactions />} />
          <Route path="payment" element={<SDPayment />} />
          <Route path="subscription" element={<SDSubscription />} />
        </Route>
        <Route path="/seller/:id" element={<SellerProfile />} />
      </Route>
      <Route path="/auth" element={<RootLayout />}>
        <Route index element={<Login />} />
        <Route path="login" element={<Login navigate={navigate} />} />
        <Route path="register" element={<Register navigate={navigate} />} />
        <Route path="logout" exact element={<LogOut navigate={navigate} />} />
      </Route>
      <Route path="/admin" element={<AdminRootLayout />}>
        <Route index element={<AdminHome />} />
        <Route path="mp/config" element={<MpConfig />} />
        <Route path="mp/sellers" element={<MpSellers />} />
        <Route path="mp/sellers/:id" element={<MpSellerEdit />} />
        <Route path="mp/products" element={<MpProducts />} />
        <Route path="mp/products/:id" element={<MpProductEdit />} />
        <Route path="mp/productcombo/:id" element={<MpProductComboEdit />} />
        <Route path="mp/sellers/:id/orders" element={<MpOrdersView />} />
        <Route path="mp/orders/:id" element={<MpSingleOrderView />} />
        <Route path="mp/orders" element={<MpOrders />} />
        <Route path="mp/s/:sid/p/:pid" element={<MpSingleSellerProduct />} />
        <Route path="mp" element={<Mp />} />
        <Route path="mp/seller/add" element={<AddSeller />} />

        <Route path="orders" element={<AdminOrders />} />
        <Route path="orders/:id" element={<SingleOrder />} />
        <Route path="invoices" element={<AdminInvoices />} />
        <Route path="carts" element={<AdminCarts />} />
        <Route path="register" element={<Register />} />
        <Route path="logout" exact element={LogOut} />
      </Route>

      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}
