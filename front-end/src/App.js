import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <Switch>
        <Route exact path="/login" component={ Login } />
        <Route exact path="/" render={ () => <Redirect to="/login" /> } />
      </Switch>
    </UserProvider>
  );
}

export default App;
