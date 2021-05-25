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
          <Link to="/login" className="nav-link">
            <Button variant="outline-success" type="button">Log in</Button>
          </Link>
          </li>
        </ul>
        </div>
        <hr/>
      </nav>
    );
  }
}