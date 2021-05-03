import React, { Component } from 'react';
import axios from 'axios';

class IzmjeniGrad extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nazivgrad: ""
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
    console.log("ID GRADA KOJI SE MINJA " + id);
    this.setState({
      nazivgrad: '',
      errMsg: '',
    });

    const { nazivgrad, errMsg} = this.state;

    const grad = {
      nazivgrad
    };

    axios
      .post('http://localhost:3001/admin/izmjenigrad/' + id, grad)
      .then(() => console.log('Izmjenjen grad'))
      .catch(err => {
        console.log(err)
        this.setState({
          nazivgrad: '',
          errMsg: 'Greška pri ubacivanju grada!',
        });
      });
      
      if(!this.state.errMsg){
        window.location = '/admin/grad/' + id
      }
  };

  render() {
    return (
      <div>
        <div className="container">
          <hr/>
          <h3>Izmjeni podatke o gradu</h3>
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
                Izmjeni grad
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

export default IzmjeniGrad;