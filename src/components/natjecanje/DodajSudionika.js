import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select'

class DodajSudionika extends Component {
  constructor(props) {
    super(props);

    this.state = {
        klub: '',
        kluboviOpcije: [],
        sudionici: []
    };
  }

  jeUSudionicima = (idtim) => {
    for(let i = 0; i < this.state.sudionici.length; i++){
        if(idtim === this.state.sudionici[i].idtim){
            return true;
        }
    }
    return false;
  }

  componentDidMount(){

        axios
            .get('http://localhost:3001/admin/sudionici/' + this.props.idnatjecanje)
            .then(response => {
                console.log("rizponz")
                console.log(response)
                this.setState({ sudionici: response.data})
            })
            .catch(error => {
                console.log(error)
                this.setState({errorMsg: 'Error retrieving data'})
            })

        axios
			.get('http://localhost:3001/admin/drzava/klubovi/' + 0)
			.then(response => {
                console.log("rispons")
                console.log(response)
				let temp = []
				let kluboviBaza = response.data
				for(let i = 0; i < kluboviBaza.length; i++){
                    if(!this.jeUSudionicima(kluboviBaza[i].idtim)){
                        temp[i] = {value:"", label:""}
                        temp[i].value = kluboviBaza[i].idtim
                        temp[i].label = kluboviBaza[i].nazivtim
                        console.log(i + " " + temp[i].value + temp[i].label)
                    }
				}
				this.setState({kluboviOpcije: temp});
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

  handleSubmit = e => {
    e.preventDefault();

    let idtim = this.state.klub
    let idnatjecanje = this.props.idnatjecanje

    if(!(idtim > 0)){
      this.setState({errMsg: "Morate izabrati klub!"})
      return;
    }

    let sudionik = {
        idtim,
        idnatjecanje
    }


    axios
      .post('http://localhost:3001/admin/dodajsudionika/',  sudionik)
      .then(() => console.log('Dodan sudionik'))
      .catch(err => {
        console.log(err)
        this.setState({
          errMsg: 'Greška pri dodavanju sudionika',
        });
      });
      
      if(!this.state.errMsg){
        window.location = '/admin/natjecanje/' + idnatjecanje;
      }
  };

  handleSelectKlubChange = (selectedOption) => {
    console.log("izabran id " + selectedOption.value)
  this.setState({klub: selectedOption.value});
}

  render() {
    return (
      <div>
        <div className="container">
          <h3>Dodaj novog sudionika</h3>
          <form onSubmit={this.handleSubmit}>
            <div>
            Tim:
            <div>
              <Select onChange={this.handleSelectKlubChange}
                options={this.state.kluboviOpcije}/>
            </div>
            <br/> 
              <button className="btn btn-success" type="submit">
                Dodaj sudionika
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

export default DodajSudionika;