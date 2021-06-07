import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import '../App.css'

export default class NavbarUser extends Component {


  render() {
    return (
      <nav className="navbar color-nav navbar-expand-lg">
        <Link to="/" className="navbar-brand">FootStats</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
        <li className="navbar-item">
            <Link to="/pretraziigrace" className="nav-link">
              <Button variant="outline-dark" type="button">Pretraži igrače</Button>
            </Link>
        </li>
        <li className="navbar-item">
            <Link to="/pretraziklubove" className="nav-link">
              <Button variant="outline-dark" type="button">Pretraži klubove</Button>
            </Link>
        </li>
        <li className="navbar-item">
            <Link to="/pretrazidrzave" className="nav-link">
              <Button variant="outline-dark" type="button">Pretraži države</Button>
            </Link>
        </li>
          <li className="navbar-item">
          <Link to="/login" className="nav-link">
            <Button variant="outline-success" type="button">Prijavi se</Button>
          </Link>
          </li>
        </ul>
        </div>
        <hr/>
      </nav>
    );
  }
}