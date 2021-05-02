import React, { Component } from 'react';
import axios from 'axios';

class DodajDrzavu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nazivtim: '',
      fifakod: '',
      errMsg: ''
    };
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState({
      nazivtim: '',
      fifakod: '',
      errMsg: '',
    });

    const { nazivtim, fifakod, errMsg} = this.state;

    const drzava = {
      nazivtim,
      fifakod
    };

    axios
      .post('http://localhost:3001/admin/dodajdrzavu', drzava)
      .then(() => console.log('Dodana drzava'))
      .catch(err => {
        console.log(err)
        this.setState({
          nazivtim: '',
          fifakod: '',
          errMsg: 'Drzava vec dodana u bazu',
        });
      });
      
      if(this.state.errMsg){
        window.location = '/admin/drzave'
      }
  };

  render() {
    return (
      <div>
        <br />
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div>
              <input
                type="text"
                name="nazivtim"
                placeholder="naziv države"
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <div>
              <input
                type="text"
                name="fifakod"
                placeholder="FIFA kod"
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <div>
              <button className="btn btn-success" type="submit">
                Dodaj državu
              </button>
            </div>
          </form>
        </div>
        {this.state.errMsg ? <div>{this.state.errMsg}</div> : null}
      </div>
    );
  }
}

export default DodajDrzavu;