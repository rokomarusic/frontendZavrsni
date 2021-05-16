import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import hr from 'date-fns/locale/hr';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
registerLocale('hr', hr);
setDefaultLocale('hr');


class DodajUtakmicu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      sezone: [],
      sezona: null,
      errMsg: '',
      timoviOpcije: [],
      domacin:{},
      gost:{},
      stadioni:[],
      stadion: '',
      brgolovadomacin: 0,
      brgolovagost: 0,
      kolo: null,
      posjecenost: 0,
      fazanatjecanje: null,
      datumutakmica: '',
      errMsg: ''
    };
  }

  add2Hours = (date) => {
    let temp = new Date(date);
    temp.setUTCHours(temp.getUTCHours()+2)
    return temp;
  }

  odrediSezonu = (datumutakmica) => {
      let temp = new Date(datumutakmica)
    for(let i = 0; i < this.state.sezone.length; i++){
        if(temp >= new Date(this.state.sezone[i].datumpocetaksezona) &&
            temp <= new Date(this.state.sezone[i].datumkrajsezona)){
                console.log("SEZONA JE " + this.state.sezone[i].godinasezona)
                return this.state.sezone[i].godinasezona;
            }
    }

    return null;
  }


  componentDidMount() {
    console.log(this.props);
    let id = this.props.iddrzava

    
    console.log("ID " + id)
    axios
        .get('http://localhost:3001/admin/sezone')
        .then(response => {
            console.log(response)
            this.setState({sezone: response.data})
        })
        .catch(error => {
    console.log(error)
    this.setState({errorMsg: 'Error retrieving data'})
        })


    console.log("idnatjecanje " + this.props.idnatjecanje)
    axios
        .get('http://localhost:3001/admin/sudionici/' + this.props.idnatjecanje)
        .then(response => {
            console.log(response)
            let sudioniciBaza = response.data;
            let temp = []
            for(let i = 0; i < sudioniciBaza.length; i++){
                temp[i] = {value:"", label:""}
                temp[i].value = sudioniciBaza[i].idtim
                temp[i].label = sudioniciBaza[i].nazivtim
                console.log(i + " " + temp[i].value + " "  + temp[i].label)
            }
            this.setState({timoviOpcije: temp});
        })
        .catch(error => {
    console.log(error)
    this.setState({errorMsg: 'Error retrieving data'})
        })

    axios
        .get('http://localhost:3001/admin/natjecanjestadioni')
        .then(response => {
            console.log(response)
            let stadioniBaza = response.data;
            let temp = []
            for(let i = 0; i < stadioniBaza.length; i++){
                temp[i] = {value:"", label:""}
                temp[i].value = stadioniBaza[i].idstadion
                temp[i].label = stadioniBaza[i].nazivstadion
                console.log(i + " " + temp[i].value + " "  + temp[i].label)
            }
            this.setState({stadioni: temp});
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
    console.log(this.state.domacin + "-" +  this.state.gost)
    console.log(this.state.stadion)
    console.log(this.state.datumutakmica)

    let utakmica = {}

    this.setState({sezona : this.odrediSezonu(this.state.datumutakmica)})

    console.log("Siezon " + this.state.sezona)

    if(this.state.sezona === null){
        this.setState({errMsg: 'Datum nije validan'});
        return;
    }

    utakmica.datumutakmica = this.state.datumutakmica;
    utakmica.godinasezona = this.state.sezona;

    if(isNaN(this.state.domacin)){
        this.setState({errMsg: 'Morate odrediti domaćina'});
        return;
    }

    if(isNaN(this.state.gost)){
        this.setState({errMsg: 'Morate odrediti gosta'});
        return;
    }

    if(this.state.domacin === this.state.gost){
        this.setState({errMsg: 'Domaćin i gost moraju biti različiti'});
        return;
    }

    utakmica.iddomacin = this.state.domacin;
    utakmica.idgost = this.state.gost;


    if(!(parseInt(this.state.posjecenost) > 0)){
        this.setState({errMsg: 'Morate odrediti posjećenost'});
        return;
    }

    utakmica.posjecenost = this.state.posjecenost

    if(isNaN(this.state.stadion)){
        this.setState({errMsg: 'Morate odrediti stadion'});
        return;
    }

    console.log("isnsn " + isNaN(this.state.kolo) + " " + this.state.kolo)

    if(isNaN(parseInt(this.state.kolo)) &&
      (this.state.fazanatjecanje === null || !this.state.fazanatjecanje)){
        this.setState({errMsg: 'Morate odrediti ili kolo ili fazu natjecanja'});
        return;
    }

    if(!isNaN(parseInt(this.state.kolo)) && this.state.fazanatjecanje){
      this.setState({errMsg: 'Ne možete odrediti i kolo i fazu natjecanja'});
      return;
  }

    utakmica.idstadion = this.state.stadion

    if(parseInt(this.state.brgolovadomacin) < 0){
      this.setState({errMsg: 'Broj golova domaćina mora bit veći od 0'});
      return;
    }

    if(parseInt(this.state.brgolovagost) < 0){
      this.setState({errMsg: 'Broj golova gosta mora bit veći od 0'});
      return;
    }

    utakmica.brgolovadomacin = this.state.brgolovadomacin
    utakmica.brgolovagost = this.state.brgolovagost

    if(this.state.kolo === null){
      utakmica.kolo = null;
    }else{
      utakmica.kolo = this.state.kolo;
    }


    if(this.state.fazanatjecanje === null || !this.state.fazanatjecanje.trim()){
      utakmica.fazanatjecanje = null;
    }else{
      utakmica.fazanatjecanje = this.state.fazanatjecanje;
    }

    utakmica.idnatjecanje = this.props.idnatjecanje

    console.log(utakmica)

    this.setState({errMsg: ''})

    axios
      .post('http://localhost:3001/admin/dodajutakmicu/', utakmica)
      .then(() => {
        console.log('Dodan igrac')
        this.setState({errMsg: ''})
        window.location = '/admin/utakmice/' + this.props.idnatjecanje
      })
      .catch(err => {
        console.log(err)
        this.setState({
          errMsg: 'Greška pri ubacivanju igraca!',
        });
      });

  }

  handleSelectDomacinChange = (selectedOption) => {
    this.setState({domacin: selectedOption.value});
  }

  handleSelectGostChange = (selectedOption) => {
    this.setState({gost: selectedOption.value});
  }

  handleSelectStadionChange = (selectedOption) => {
    this.setState({stadion: selectedOption.value});
  }



  toggleVisibility = () => {
      this.setState({visible: !this.state.visible})
  }

  render() {
    return (
      <div>
        <Button onClick={this.toggleVisibility}> Dodaj utakmicu</Button>
        {this.state.visible && <div className="container">
          <Form onSubmit={this.handleSubmit}>
            <div>
             Domaćin*:
              <Select onChange={this.handleSelectDomacinChange}
              options={this.state.timoviOpcije}/>
            </div>
            <br />
            <div>
              <input
                type="number"
                name="brgolovadomacin"
                placeholder="broj golova domaćina"
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <div>
             Gost*:
              <Select onChange={this.handleSelectGostChange}
              options={this.state.timoviOpcije}/>
            </div>
            <br />
            <div>
              <input
                type="number"
                name="brgolovagost"
                placeholder="broj golova gost"
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <div>
            Datum utakmice*:
            <DatePicker selected={this.state.datumutakmica} 
                        onChange={date => {this.setState({datumutakmica: this.add2Hours(date)})
                        this.setState({sezona : this.odrediSezonu(this.add2Hours(date))})}
    }   
                        showMonthDropdown
                        showYearDropdown
                        locale="hr" 
                        dateFormat="dd/MM/yyyy"
                        dropdownMode="select"
                        placeholderText="datum utakmice"/>
            </div>
            <br />
            <div>
             Stadion:
              <Select onChange={this.handleSelectStadionChange}
              options={this.state.stadioni}/>
            </div>
            <br />
            Posjećenost*
            <div>
              <input
                type="number"
                name="posjecenost"
                placeholder="posjećenost"
                onChange={this.handleInputChange}
                required
              />
            </div>
            <br />
            Kolo
            <div>
              <input
                type="number"
                name="kolo"
                placeholder="kolo"
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            Faza natjecanja
            <div>
              <input
                type="text"
                name="fazanatjecanje"
                placeholder="faza natjecanja"
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <div>
              <Button className="btn btn-success" type="submit">
                Dodaj utakmicu
              </Button>
            </div>
          </Form>
          <hr/>
        </div>}
        {this.state.errMsg ? <div style={{color: "red"}}>{this.state.errMsg}</div> : null}
      </div>
    );
  }
}

export default DodajUtakmicu;