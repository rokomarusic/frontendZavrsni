import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

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

    if(!stadion.nazivstadion.trim()){
      this.setState({nazivstadion: ''})
      this.setState({errMsg: "Naziv stadiona ne smije biti prazan!"})
      return;
  }

    if(isNaN(stadion.kapacitet) || stadion.kapacitet < 0){
      this.setState({kapacitet: ''})
      this.setState({errMsg: "Kapacitet stadiona mora biti broj veći od nule!"})
      return;
    }

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
          <Form onSubmit={this.handleSubmit}>
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
                type="number"
                name="kapacitet"
                placeholder="kapacitet"
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <div>
              <Button className="btn btn-success" type="submit">
                Dodaj stadion
              </Button>
            </div>
          </Form>
        </div>
        {this.state.errMsg ? <div style={{color: "red"}}>{this.state.errMsg}</div> : null}
      </div>
    );
  }
}

export default DodajStadion;