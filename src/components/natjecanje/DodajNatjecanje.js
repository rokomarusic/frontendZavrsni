import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select'

class DodajNatjecanje extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nazivnatjecanje: '',
      sezone: [],
      brojtimova: 0,
      sezona: '',
      errMsg: '',
      options:[]
    };
  }

  componentDidMount() {
    console.log(this.props);
    let id = this.props.iddrzava

    
    console.log("ID " + id)
    axios
        .get('http://localhost:3001/admin/sezone')
        .then(response => {
            console.log(response)
            this.setState({ sezone: response.data});
            console.log(this.state.sezone)
            let temp = []
            for(let i = 0; i < this.state.sezone.length; i++){
                temp[i] = {value:"", label:""}
                temp[i].value = this.state.sezone[i].godinasezona
                temp[i].label = this.state.sezone[i].godinasezona
                console.log(i + " " + temp[i].value)
            }
            this.setState({options: temp});
        })
        .catch(error => {
    console.log(error)
    this.setState({errorMsg: 'Error retrieving data'})
        })
}

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSelectChange = (selectedOption) => {
    this.setState({godinasezona: selectedOption.value});
  }

  handleSubmit = e => {
    e.preventDefault();

    const { godinasezona, nazivnatjecanje, brojtimova,  errMsg} = this.state;

    let iddrzava = this.props.iddrzava


    const natjecanje = {
      nazivnatjecanje,
      godinasezona, 
      brojtimova,
      iddrzava
    };

    console.log(natjecanje)
/*
    if(!klub.nazivklub.trim()){
        this.setState({nazivklub: ''})
        this.setState({errMsg: "Naziv kluba ne smije biti prazan!"})
        return;
    }

    if(isNaN(klub.godosnutka) || klub.godosnutka < 0){
        this.setState({godosnutka: ''})
        this.setState({errMsg: "Godina osnutka ne smije biti prazna!"})
        return;
    }

    if(!klub.idgrad){
        this.setState({errMsg: "Morate izabrati grad!"})
        return;
    }
    console.log("sad ce bit post")
*/


    console.log(natjecanje)
    axios
      .post('http://localhost:3001/admin/dodajnatjecanje', natjecanje)
      .then(data => {
        console.log("ovdje " + data)
        window.location = '/admin/natjecanja/' + iddrzava;
      })
      .catch(err => {
        console.log(err)
        this.setState({
          errMsg: 'Natjecanje već dodano u bazu',
        });
      });

  };

  render() {
    return (
      <div>
        <div className="container">
            <h2>Dodaj natjecanje</h2>
          <form onSubmit={this.handleSubmit}>
            <div>
              <input
                type="text"
                name="nazivnatjecanje"
                placeholder="naziv natjecanja"
                onChange={this.handleInputChange}
                required
              />
            </div>
            <br/>
            <div>
              <input
                type="number"
                name="brojtimova"
                placeholder="broj timova"
                onChange={this.handleInputChange}
                required
              />
            </div>
            <br />
            <div>
             Sezona:
              <Select onChange={this.handleSelectChange}
              options={this.state.options}
              defaultValue={this.state.options[0]}/>
            </div>
            <br />
            <div>
              <button className="btn btn-success" type="submit">
                Dodaj natjecanje
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

export default DodajNatjecanje;