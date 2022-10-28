import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import CustomerProducts from './pages/CustomerProducts';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <Switch>
        <Route exact path="/" render={ () => <Redirect to="/login" /> } />
        <Route exact path="/login" component={ Login } />
        <Route exact path="/customer/products" component={ CustomerProducts } />
      </Switch>
    </UserProvider>
  );
}

export default App;
