import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
            <button onClick={this.logout}>Logout</button>
          </li>
        </ul>
        </div>
        <hr/>
      </nav>
    );
  }
}