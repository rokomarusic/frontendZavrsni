import React, { Component } from 'react';
import axios from 'axios';

class DodajStadion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nazivstadion: '',
      kapacitet: '',
      errMsg: '',
      idgrad: '',
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
      nazivstadion: '',
      kapacitet: '',
      errMsg: '',
      idgrad: '',
    });

    const { nazivstadion, kapacitet, errMsg} = this.state;

    let idgrad = this.props.idgrad;

    const stadion = {
      nazivstadion,
      kapacitet,
      idgrad
    };

    axios
      .post('http://localhost:3001/admin/dodajstadion', stadion)
      .then(() => console.log('Dodan stadion'))
      .catch(err => {
        console.log(err)
        this.setState({
          nazivstadion: '',
          kapacitet: '',
          errMsg: 'Greška pri dodavanju stadiona',
        });
      });
      
      if(!this.state.errMsg){
        window.location = '/admin/stadioni/' + idgrad;
      }
  };

  render() {
    return (
      <div>
        <div className="container">
          <h3>Dodaj novi stadion</h3>
          <form onSubmit={this.handleSubmit}>
            <div>
              <input
                type="text"
                name="nazivstadion"
                placeholder="naziv stadiona"
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <div>
              <input
                type="text"
                name="kapacitet"
                placeholder="kapacitet"
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <div>
              <button className="btn btn-success" type="submit">
                Dodaj stadion
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

export default DodajStadion;