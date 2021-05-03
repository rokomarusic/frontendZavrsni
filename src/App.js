import Igraci from './components/igraci';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Navbar from './components/navbar.component'
import IgracStranica from './components/igracStranica'
import Drzave from './components/drzave/Drzave'
import DrzavaStranica from './components/drzave/DrzavaStranica'
import DrzavaGradovi from './components/drzave/DrzavaGradovi'
import GradStranica from './components/grad/GradStranica'
import GradStadioni from './components/grad/GradStadioni';
import Login from './components/Login'

function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken;
}

function App() {

  const token = getToken();

  console.log("TOKEN");
  console.log(token);
  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <Router>
      <div className="container">
      <Navbar/>
      <br/>
      <Route path="/admin/igraci" exact component={Igraci} />
      <Route path="/login" exact component={Login} />
      <Route path="/admin/drzave" exact component={Drzave} />
      <Route path="/admin/drzava/:id" component={DrzavaStranica} />
      <Route path="/admin/gradovi/:id" component={DrzavaGradovi} />
      <Route path="/admin/igrac/:id" component={IgracStranica} />
      <Route path="/admin/grad/:id" component={GradStranica} />
      <Route path="/admin/stadioni/:id" component={GradStadioni} />
      </div>
    </Router>
  );
}

export default App;
