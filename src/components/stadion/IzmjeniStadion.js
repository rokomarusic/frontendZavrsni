import React, { Component } from 'react';
import axios from 'axios';

class IzmjeniStadion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nazivstadion: "",
      kapacitetstadion: "",
      visible: false
    };
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let idstadion = this.props.idstadion;
    let idgrad = this.props.idgrad;
    console.log("ID STADIONA KOJI SE MINJA " + idstadion);
    this.setState({
        nazivstadion: "",
        kapacitetstadion: "",
        errMsg: '',
        visible : false
    });

    const { nazivstadion, kapacitetstadion, errMsg} = this.state;

    const stadion = {
      nazivstadion,
      kapacitetstadion
    };

    axios
      .post('http://localhost:3001/admin/izmjenistadion/' + idstadion, stadion)
      .then(() => console.log('Izmjenjen stadion'))
      .catch(err => {
        console.log(err)
        this.setState({
          nazivgrad: '',
          errMsg: 'Greška pri ubacivanju grada!',
          visible: false
        });
      });
      
      if(!this.state.errMsg){
        window.location = '/admin/stadioni/' + idgrad;
      }
  };

  toggleVisibility = () => {
        this.setState({visible: (!this.state.visible)})
  }

  render() {
    return (
      <div>
        <div className="container">
          <button type="button" onClick={this.toggleVisibility}>Izmjeni stadion</button>
          {this.state.visible && <form onSubmit={this.handleSubmit}>
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
              <button className="btn btn-success" type="submit">
                Izmjeni stadion
              </button>
            </div>
          </form>}
          <hr/>
        </div>
        {this.state.errMsg ? <div style={{color: "red"}}>{this.state.errMsg}</div> : null}
      </div>
    );
  }
}

export default IzmjeniStadion;