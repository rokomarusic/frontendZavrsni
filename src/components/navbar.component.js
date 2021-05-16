import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'

export default class Navbar extends Component {

  logout = () => {
    sessionStorage.removeItem('token');
    window.location = '/';
  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Admin page</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/admin/igraci" className="nav-link">Igraci</Link>
          </li>
          <li className="navbar-item">
          <Link to="/admin/drzave" className="nav-link">Drzave</Link>
          </li>
          <li className="navbar-item">
            <Button variant="outline-warning" onClick={this.logout}>Logout</Button>
          </li>
        </ul>
        </div>
        <hr/>
      </nav>
    );
  }
}