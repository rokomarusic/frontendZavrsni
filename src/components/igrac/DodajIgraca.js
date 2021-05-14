import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import hr from 'date-fns/locale/hr';
registerLocale('hr', hr)
setDefaultLocale('hr');

const opcijeNoga = [
  {value:0, label:'desna'},
  {value:1, label:'lijeva'},
  {value:2, label:'obe'}
]

class DodajIgraca extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.igrac)
    this.state = {
      noga: '',
      visible: false,
      datumrodenjaigrac: '',
      datumodigrazadrzavu: '',
      datumdoigrazadrzavu: '',
      imeigrac: '',
      prezimeigrac: '',
      nadimakigrac: '',
      pozicija: '',
      drzava: '',
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

    let igrac = {}

    console.log("8888")
    console.log(this.state)
    console.log("8888")

    if(this.state.noga >= 0){
      console.log(this.state.noga)
      igrac.jacanoga = this.state.noga
    }else{
      this.setState({errMsg: "Morate odrediti preferiranu nogu igrača!"})
      return
    }
    if(this.state.drzava){
      console.log(this.state.noga)
      igrac.iddrzava = this.state.drzava
    }
    else{
      this.setState({errMsg: "Morate odrediti državu igrača!"})
      return
    } 
    if(this.state.datumrodenjaigrac){
      console.log(this.state.datumrodenjaigrac)
      igrac.datumrodenjaigrac = this.state.datumrodenjaigrac
    }else{
      this.setState({errMsg: "Morate odrediti datum rođenja igrača!"})
      return
    }
    if(this.state.datumodigrazadrzavu){
      console.log(this.state.datumodigrazadrzavu)
      igrac.datumodigrazadrzavu = this.state.datumodigrazadrzavu
    }
    if(this.state.datumdoigrazadrzavu){
      console.log(this.state.datumdoigrazadrzavu)
      igrac.datumdoigrazadrzavu = this.state.datumdoigrazadrzavu
    }
    if(this.state.imeigrac.trim()){
      console.log(this.state.imeigrac)
      igrac.imeigrac = this.state.imeigrac
    }else{
      this.setState({errMsg: "Morate odrediti ime igrača!"})
      return
    }
    if(this.state.prezimeigrac.trim()){
      console.log(this.state.prezimeigrac)
      igrac.prezimeigrac = this.state.prezimeigrac
    }else{
      this.setState({errMsg: "Morate odrediti prezime igrača!"})
      return
    }
    if(this.state.nadimakigrac.trim()){
      console.log(this.state.nadimakigrac)
      igrac.nadimakigrac = this.state.nadimakigrac
    }
    

    if(this.state.pozicija.trim() && this.state.pozicija.trim().length <= 3){
      console.log(this.state.pozicija)
      igrac.pozicija = this.state.pozicija
    }else{
      this.setState({errMsg: "Morate odrediti poziciju igrača!"})
      return
    }

    this.setState({noga: '',
    visible: false,
    datumrodenjaigrac: '',
    datumodigrazadrzavu: '',
    datumdoigrazadrzavu: '',
    imeigrac: '',
    prezimeigrac: '',
    nadimakigrac: '',
    pozicija: '',
    igrac: igrac})

    console.log("UUUU")
    console.log(igrac)
    console.log("UUUU")

    axios
      .post('http://localhost:3001/admin/dodajigraca/', igrac)
      .then(() => {
        console.log('Dodan igrac')
        this.setState({errMsg: ''})
        window.location = '/admin/igraci/'
      })
      .catch(err => {
        console.log(err)
        this.setState({
          errMsg: 'Greška pri ubacivanju igraca!',
        });
      });

  };

  toggleVisibility = () => {
    this.setState({visible: (!this.state.visible)})
  }

  handleSelectNogaChange = (selectedOption) => {
    this.setState({noga: selectedOption.value});
    console.log(this.state.noga)
  }

  handleSelectDrzavaChange = (selectedOption) => {
    this.setState({drzava: selectedOption.value});
  }

  render() {
    return (
      <div>
        <div className="container">
          <button type="button" onClick={this.toggleVisibility}>Dodaj igrača</button>
          {this.state.visible && <form onSubmit={this.handleSubmit}>
            <div>
              <input
                type="text"
                name="imeigrac"
                placeholder="ime igrača"
                onChange={this.handleInputChange}
                required
              />
            </div>
            <br />
            <div>
              <input
                type="text"
                name="prezimeigrac"
                placeholder="prezime igrača"
                onChange={this.handleInputChange}
                required
              />
            </div>
            <br />
            <div>
              <input
                type="text"
                name="nadimakigrac"
                placeholder="nadimak igrača"
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            Preferirana noga:
            <div>
              <Select onChange={this.handleSelectNogaChange}
                options={opcijeNoga}/>
            </div>
            <br/>
            Država:
            <div>
              <Select onChange={this.handleSelectDrzavaChange}
                options={this.props.drzave}/>
            </div>
            <br/>
            <div>
              <input
                type="text"
                name="pozicija"
                placeholder="pozicija"
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <div>
            <DatePicker selected={this.state.datumrodenjaigrac} 
                        onChange={date => this.setState({datumrodenjaigrac: date})} 
                        showMonthDropdown
                        showYearDropdown
                        locale="hr" 
                        dateFormat="dd/MM/yyyy"
                        dropdownMode="select"
                        placeholderText="datum rođenja"/>
            </div>
            <br />
            <div>
            <DatePicker selected={this.state.datumodigrazadrzavu} 
                        onChange={date => this.setState({datumodigrazadrzavu: date})} 
                        showMonthDropdown
                        showYearDropdown
                        locale="hr" 
                        dateFormat="dd/MM/yyyy"
                        dropdownMode="select"
                        placeholderText="datum od kojeg igra za državu"/>
            </div>
            <br />
            <div>
            <DatePicker selected={this.state.datumdoigrazadrzavu} 
                        onChange={date => this.setState({datumdoigrazadrzavu: date})} 
                        showMonthDropdown
                        showYearDropdown
                        locale="hr" 
                        dateFormat="dd/MM/yyyy"
                        dropdownMode="select"
                        placeholderText="datum do kojeg je igrao za državu"/>
            </div>
            <div>
              <button className="btn btn-success" type="submit">
                Dodaj
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

export default DodajIgraca;