import Igraci from './components/igrac/igraci';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Navbar from './components/navbar.component'
import IgracStranica from './components/igrac/igracStranica'
import Drzave from './components/drzave/Drzave'
import DrzavaStranica from './components/drzave/DrzavaStranica'
import DrzavaGradovi from './components/drzave/DrzavaGradovi'
import GradStranica from './components/grad/GradStranica'
import GradStadioni from './components/grad/GradStadioni';
import Login from './components/Login'
import DrzavaNatjecanja from './components/drzave/DrzavaNatjecanja';
import NatjecanjeStranica from './components/natjecanje/NatjecanjeStranica'
import DrzavaKlubovi from './components/drzave/DrzavaKlubovi';
import KlubStranica from './components/klub/KlubStranica';
import RosterStranica from './components/klub/RosterStranica'
import NatjecanjeUtakmice from './components/natjecanje/NatjecanjeUtakmice';
import UtakmicaStranica from './components/utakmica/UtakmicaStranica'

import './App.css';  
import 'bootstrap/dist/css/bootstrap.min.css';

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

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <Router>
      <div>
      <Navbar/>
      <br/>
      <Route path="/admin/igraci" exact component={Igraci} />
      <Route path="/login" exact component={Login} />
      <Route path="/admin/drzave" exact component={Drzave} />
      <Route path="/admin/drzava/:id" component={DrzavaStranica} />
      <Route path="/admin/gradovi/:id" component={DrzavaGradovi} />
      <Route path="/admin/natjecanja/:id" component={DrzavaNatjecanja} />
      <Route path="/admin/igrac/:id" component={IgracStranica} />
      <Route path="/admin/grad/:id" component={GradStranica} />
      <Route path="/admin/stadioni/:id" component={GradStadioni} />
      <Route path="/admin/natjecanje/:id" component={NatjecanjeStranica} />
      <Route path="/admin/klubovi/:id" component={DrzavaKlubovi} />
      <Route path="/admin/klub/:id" component={KlubStranica} />
      <Route path="/admin/roster/:id" component={RosterStranica} />
      <Route path="/admin/utakmice/:id" component={NatjecanjeUtakmice}/>
      <Route path="/admin/utakmica/:id" component={UtakmicaStranica}/>
      </div>
    </Router>
  );
}

export default App;
