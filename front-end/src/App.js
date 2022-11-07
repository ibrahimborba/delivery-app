import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerProducts from './pages/CustomerProducts';
import CustomerOrders from './pages/CustomerOrders';
import CustomerCheckout from './pages/CustomerCheckout';
import Seller from './pages/Seller';
import CustomerOrderDetails from './pages/CustomerOrderDetails';
<<<<<<< HEAD
import SellerOrderDetails from './pages/SellerOrderDetails';
import { UserProvider } from './context/UserContext';
import { OrdersProvider } from './context/OrdersContext';
=======
import Admin from './pages/Admin';
>>>>>>> 2f15cf64beeb343c8da25f8da6abca38fa4434ff

function App() {
  return (
    <UserProvider>
      <Switch>
        <Route exact path="/" render={ () => <Redirect to="/login" /> } />
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ Register } />
        <Route exact path="/admin/manage" component={ Admin } />
        <OrdersProvider>
          <Route exact path="/customer/products" component={ CustomerProducts } />
          <Route exact path="/customer/orders" component={ CustomerOrders } />
          <Route exact path="/seller/orders" component={ Seller } />
          <Route exact path="/customer/checkout" component={ CustomerCheckout } />
          <Route exact path="/customer/orders/:id" component={ CustomerOrderDetails } />
          <Route exact path="/seller/orders/:id" component={ SellerOrderDetails } />
        </OrdersProvider>
      </Switch>
    </UserProvider>
  );
}

export default App;
