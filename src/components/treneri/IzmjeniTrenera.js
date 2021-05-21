import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import hr from 'date-fns/locale/hr';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
registerLocale('hr', hr)
setDefaultLocale('hr');



class IzmjeniTrenera extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.igrac)
    this.state = {
      visible: false,
      datumrodenjatrener: '',
      imetrener: '',
      prezimetrener: '',
      nadimaktrener: '',
      drzava: '',
      errMsg: '',
      drzave: undefined
    };
  }

  componentDidMount(){
    
        axios
			.get('http://localhost:3001/admin/drzave')
			.then(response => {
				console.log(response)
				let temp = []
				let drzaveBaza = response.data
				for(let i = 0; i < drzaveBaza.length; i++){
					temp[i] = {value:"", label:""}
					temp[i].value = drzaveBaza[i].iddrzava
					temp[i].label = drzaveBaza[i].nazivtim
					console.log(i + " " + temp[i].value + temp[i].label)
				}
				this.setState({drzave: temp});
				console.log("A111"+this.state.drzava)
			})
			.catch(error => {
        		console.log(error)
        		this.setState({errorMsg: 'Error retrieving data'})
			})
  }

  add2Hours = (date) => {
    let temp = new Date(date);
    temp.setUTCHours(temp.getUTCHours()+2)
    return temp;
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    let trener = this.props.trener

    if(this.state.drzava){
      console.log(this.state.noga)
      trener.iddrzava = this.state.drzava
    }

    if(this.state.datumrodenjatrener){
      console.log(this.state.datumrodenjatrener)
      trener.datumrodenjatrener = this.add2Hours(this.state.datumrodenjatrener)
    }
 
    if(this.state.imetrener.trim()){
      console.log(this.state.imetrener)
      trener.imetrener = this.state.imetrener
    }
    if(this.state.prezimetrener.trim()){
      console.log(this.state.prezimetrener)
      trener.prezimetrener = this.state.prezimetrener
    }
    if(this.state.nadimaktrener.trim()){
      console.log(this.state.nadimaktrener)
      trener.nadimaktrener = this.state.nadimaktrener
    }


    console.log("UUUU")
    console.log(trener)
    console.log("UUUU")

    axios
      .post('http://localhost:3001/admin/izmjenitrenera/', trener)
      .then(() => {
        console.log('Dodan trener')
        this.setState({errMsg: ''})
        window.location = '/admin/trener/' + trener.idtrener
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
          <Button type="button" onClick={this.toggleVisibility}>Izmjeni trenera</Button>
          {this.state.visible && <div className="container">
            <br/>
          <Form onSubmit={this.handleSubmit}>
            <div>
              <input
                type="text"
                name="imetrener"
                placeholder="ime trenera"
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <div>
              <input
                type="text"
                name="prezimetrener"
                placeholder="prezime trenera"
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <div>
              <input
                type="text"
                name="nadimaktrener"
                placeholder="nadimak trenera"
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            Država:
            <div>
              <Select onChange={this.handleSelectDrzavaChange}
                options={this.state.drzave}/>
            </div>
            <br />
            <div>
            <DatePicker selected={this.state.datumrodenjatrener} 
                        onChange={date => this.setState({datumrodenjatrener: date})} 
                        showMonthDropdown
                        showYearDropdown
                        locale="hr" 
                        dateFormat="dd/MM/yyyy"
                        dropdownMode="select"
                        placeholderText="datum rođenja"/>
            </div>
            <div>
                <br/>
              <button className="btn btn-success" type="submit">
                Izmjeni
              </button>
            </div>
          </Form>
        </div>}
        {this.state.errMsg ? <div style={{color: "red"}}>{this.state.errMsg}</div> : null}
      </div>
    );
  }
}

export default IzmjeniTrenera;