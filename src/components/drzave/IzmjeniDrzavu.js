import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

class IzmjeniDrzavu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      nazivtim: '',
      fifakod: '',
      errMsg: '',
      idtim: '',
    };
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let id = this.props.id
    console.log("ID SUBMITA " + id);
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
      .post('http://localhost:3001/admin/izmjenidrzavu/' + id, drzava)
      .then(() => console.log('Izmjenjena drzava'))
      .catch(err => {
        console.log(err)
        this.setState({
          nazivtim: '',
          fifakod: '',
          errMsg: 'Drzava s ovim fifa kodom već postoji u bazi',
        });
      });
      
      if(!this.state.errMsg){
        window.location = '/admin/drzava/' + id
      }
  };

  toggleVisibility= () => {
    this.setState({visible: !this.state.visible})
    console.log("korner")
}

  render() {
    return (
      <div className="container">
        <hr/>
        <Button onClick={this.toggleVisibility}>Izmjeni državu</Button>
        {this.state.visible && <div>
          <h3>Izmjeni podatke o državi</h3>
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
                Izmjeni
              </button>
            </div>
          </form>
        </div>}
        {this.state.errMsg ? <div style={{color: "red"}}>{this.state.errMsg}</div> : null}
        <hr/>
      </div>
    );
  }
}

export default IzmjeniDrzavu;