import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

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

    if(!grad.nazivgrad.trim()){
      this.setState({nazivgrad: ''})
      this.setState({errMsg: "Naziv grada ne smije biti prazan!"})
      return;
  }

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
          <Form onSubmit={this.handleSubmit}>
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
              <Button className="btn btn-success" type="submit">
                Dodaj grad
              </Button>
            </div>
          </Form>
        </div>
        {this.state.errMsg ? <div style={{color: "red"}}>{this.state.errMsg}</div> : null}
      </div>
    );
  }
}

export default DodajGrad;