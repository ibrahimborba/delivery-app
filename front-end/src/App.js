import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerProducts from './pages/CustomerProducts';
import { UserProvider } from './context/UserContext';
import CustomerCheckout from './pages/CustomerCheckout';
import { OrdersProvider } from './context/OrdersContext';
import Seller from './pages/Seller';

function App() {
  return (
    <UserProvider>
      <Switch>
        <Route exact path="/" render={ () => <Redirect to="/login" /> } />
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ Register } />
        <OrdersProvider>
          <Route exact path="/customer/products" component={ CustomerProducts } />          
          <Route exact path="/seller/orders" component={ Seller } />
          <Route exact path="/customer/checkout" component={ CustomerCheckout } />
        </OrdersProvider>
      </Switch>
    </UserProvider>
  );
}

export default App;
