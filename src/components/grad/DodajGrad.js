import React, { Component } from 'react';
import axios from 'axios';

class DodajGrad extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nazivgrad: '',
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
      nazivgrad: '',
      errMsg: '',
    });

    const { nazivgrad,  errMsg} = this.state;

    let iddrzava = this.props.iddrzava

    const grad = {
      nazivgrad,
      iddrzava
    };

    axios
      .post('http://localhost:3001/admin/dodajgrad', grad)
      .then(() => console.log('Dodana grad'))
      .catch(err => {
        console.log(err)
        this.setState({
          nazivgrad: '',
          errMsg: 'Greška pri dodavanju grada',
        });
      });
      
      if(!this.state.errMsg){
        window.location = '/admin/gradovi/' + iddrzava;
      }
  };

  render() {
    return (
      <div>
        <div className="container">
            <h2>Dodaj grad</h2>
          <form onSubmit={this.handleSubmit}>
            <div>
              <input
                type="text"
                name="nazivgrad"
                placeholder="naziv grada"
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <div>
              <button className="btn btn-success" type="submit">
                Dodaj grad
              </button>
            </div>
          </form>
          <hr/>
        </div>
        {this.state.errMsg ? <div style={{color: "red"}}>{this.state.errMsg}</div> : null}
      </div>
    );
  }
}

export default DodajGrad;