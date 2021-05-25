import Igraci from './components/igrac/igraci';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import NavbarAdmin from './components/navbar.component'
import NavbarUser from './components/navbar.component.user'
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
import Treneri from './components/treneri/Treneri'
import TrenerStranica from './components/treneri/TrenerStranica'
import HomePage from './components/HomePage'
import IgracStatistika from './components/igrac/IgracStatistika'
import GolmanStatistika from './components/igrac/GolmanStatistika'
import PretraziIgrace from './components/PretraziIgrace'
import PretraziDrzave from './components/PretraziDrzave'
import PretraziKlubove from './components/PretraziKlubove'

import './App.css';  
import 'bootstrap/dist/css/bootstrap.min.css';
import DrzavaStatistika from './components/drzave/DrzavaStatistika';
import KlubStatistika from './components/klub/KlubStatistika';


function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken;
}

function App() {

  const token = getToken();

  return (
    <Router>
      <Switch>
      <div>
      {token ? <NavbarAdmin/> : <NavbarUser/>}
      <br/>
      <Route path="/" exact component={HomePage} />
      <Route path="/igrac/:id" exact component={IgracStatistika} />
      <Route path="/drzava/:id" exact component={DrzavaStatistika} />
      <Route path="/klub/:id" exact component={KlubStatistika} />
      <Route path="/pretraziigrace" exact component={PretraziIgrace} />
      <Route path="/pretrazidrzave" exact component={PretraziDrzave} />
      <Route path="/pretraziklubove" exact component={PretraziKlubove} />
      <Route path="/golman/:id" exact component={GolmanStatistika} />
      <Route path="/admin/igraci" exact component={token ? Igraci : Login} />
      <Route path="/login" exact component={Login} />
      <Route path="/admin/drzave" exact component={token ? Drzave : Login} />
      <Route path="/admin/drzava/:id" component={token ? DrzavaStranica : Login} />
      <Route path="/admin/gradovi/:id" component={token ? DrzavaGradovi : Login} />
      <Route path="/admin/natjecanja/:id" component={token ? DrzavaNatjecanja : Login} />
      <Route path="/admin/igrac/:id" component={token ? IgracStranica : Login} />
      <Route path="/admin/grad/:id" component={token ? GradStranica : Login} />
      <Route path="/admin/stadioni/:id" component={token ? GradStadioni : Login} />
      <Route path="/admin/natjecanje/:id" component={token ? NatjecanjeStranica : Login} />
      <Route path="/admin/klubovi/:id" component={token ? DrzavaKlubovi : Login} />
      <Route path="/admin/klub/:id" component={token ? KlubStranica : Login} />
      <Route path="/admin/roster/:id" component={token ? RosterStranica : Login} />
      <Route path="/admin/utakmice/:id" component={token ? NatjecanjeUtakmice : Login}/>
      <Route path="/admin/utakmica/:id" component={token ? UtakmicaStranica : Login}/>
      <Route path="/admin/treneri" component={token ? Treneri : Login}/>
      <Route path="/admin/trener/:id" component={token ? TrenerStranica : Login}/>
      </div>
      </Switch>
    </Router>
  );
}

export default App;
