import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerProducts from './pages/CustomerProducts';
import CustomerOrders from './pages/CustomerOrders';
import { UserProvider } from './context/UserContext';
import { OrdersProvider } from './context/OrdersContext';

function App() {
  return (
    <UserProvider>
      <Switch>
        <Route exact path="/" render={ () => <Redirect to="/login" /> } />
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ Register } />
        <OrdersProvider>
          <Route exact path="/customer/products" component={ CustomerProducts } />
          <Route exact path="/customer/checkout" component={ CustomerProducts } />
          <Route exact path="/customer/orders" component={ CustomerOrders } />
        </OrdersProvider>
      </Switch>
    </UserProvider>
  );
}

export default App;
