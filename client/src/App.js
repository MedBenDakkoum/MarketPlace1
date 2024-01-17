import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Categories from './Pages/Categories';
import Login from './Pages/Login';
import Register from './Pages/Register';
import LogOut from './Pages/LogOut';
import AdminLogOut from './Pages/AdminLogOut';
import Profile from './Pages/Profile';
import Details from './Pages/Details';
import Edit from './Pages/Edit';
import CreateSell from './Pages/CreateSell';
import EditProfile from './Pages/EditProfile';
import Error404 from './Pages/Error404';
import Messages from './Pages/Messages';
import Admin from './Pages/Admin';
import Store from './Pages/Store'
import {ProductProvider,ProductConsumer} from './components/Store/context';

function App() {
   return (
      <><Switch>
         
      <Route path='/admin' exact component={Admin} />
      <Route path='/admin/logout' exact render={AdminLogOut}/>
      {/* <ProductProvider ProductConsumer={Store}> 
      <Route exact path="/s/:link" component={Store} />
      <Route exact path="/s/:link/details" component={Store} />
      <Route exact path="/s/:link/cart" component={Store} />
      </ProductProvider> */}
      <Route
        path="/"
        render={({ match }) => (
          <>
            <Header />
            <Switch>
              <Route path="/" exact component={Categories} />
              <Route path="/categories/:category" exact component={Categories} />
              <Route path="/categories/:category/:id/details" component={Details} />
              <Route path="/categories/:category/:id/edit" component={Edit} />
              <Route path="/auth/login" exact component={Login} />
              <Route path="/auth/register" exact component={Register} />
              <Route path="/auth/logout" exact render={LogOut} />
              <Route path='/add-product' exact component={CreateSell} />
              <Route path='/seller/:id' exact component={Profile} />
              <Route path='/seller/:id/edit' exact component={EditProfile} />
              <Route path='/messages' exact component={Messages} />
              <Route path='/messages/:id' exact component={Messages} />
              <Route component={Error404} />
            </Switch>
            <Footer />
          </>
        )}
      />
      
    </Switch>
    
       
      </>
   );
}

export default App;
