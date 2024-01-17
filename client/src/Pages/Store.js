import React from 'react';
import {Switch,Route} from "react-router-dom";
import '../components/Store/Store.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Store/components/Navbar";
import ProductList from "../components/Store/components/ProductList";
import Details from "../components/Store/components/StoreDetails";
import Cart from "../components/Store/components/Cart";
import Default from "../components/Store/components/Default";
import Modal from '../components/Store/components/Modal';
import {ProductConsumer} from '../components/Store/context';


function Store() {
  return (
    <React.Fragment>
      <Navbar />
      <Switch>
        <Route exact path="/s/:link" component={ProductList} />
        <Route path="/s/:link/details" component={Details} />
        <Route path="/s/:link/cart" component={Cart} />
        <Route component={Default} />
      </Switch>
      <Modal />
    </React.Fragment>
  );
}

export default Store;
