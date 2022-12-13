import { BrowserRouter, Route, Routes as Switch, Navigate } from 'react-router-dom';
import React, { useState } from 'react'
import Login from '../views/login'
import Dashboard from '../views/dashboard'
import Preference from '../views/preference'
import Error from '../views/paginaerror'
import '../css/routes.css'

const Routes = () => {
  const [token, setToken] = useState();


  if (!token && getSession() == null) {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="*" element={<Error />} />
        </Switch >
      </BrowserRouter>
    )
  } else {
    if (getSession() !== null) {
      return (
        <div className="wrapper">
          <h1>React Redux App</h1>
          <BrowserRouter>
            <Switch>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login setToken={setToken} />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/preference" element={<Preference />} />
              <Route path="*" element={<Error />} />
            </Switch>
          </BrowserRouter>
        </div>
      )
    } else {
      setSession(token);
      return (
        <div className="wrapper">
          <h1>React Redux App</h1>
          <BrowserRouter>
            <Switch>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login setToken={setToken} />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/preference" element={<Preference />} />
              <Route path="*" element={<Error />} />
            </Switch>
          </BrowserRouter>
        </div>
      )
    }
  }
}
export default Routes

function setSession(userToken) {
  localStorage.setItem('Id-ref', JSON.stringify(userToken));
}

function getSession() {
  const tokenString = localStorage.getItem('Id-ref');
  if (tokenString !== null) {
    const userToken = JSON.parse(tokenString);
    return userToken;
  } else {
    return null;
  }
}