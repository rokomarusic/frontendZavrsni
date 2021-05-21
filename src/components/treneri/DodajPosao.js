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


class DodajPosao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      datumodtrenira: '',
      datumdotrenira: '',
      tim: 0,
    };
  }

  add2Hours = (date) => {
    let temp = new Date(date);
    temp.setUTCHours(temp.getUTCHours()+2)
    return temp;
  }

  provjeriBoravak = (datumod, datumdo) => {
        console.log(this.props.boravci)
        

        for(let i = 0; i < this.props.boravci.length; i++){
            let date1 = new Date(this.props.boravci[i].datumodtrenira)
            let date2 = new Date(this.props.boravci[i].datumdotrenira)   
            console.log("?????")
            console.log(date1)
            console.log(date2)
            console.log(datumod)
            console.log(datumdo)
            console.log("?????")
            if(date1 < datumod &&
                date2 > datumod){
                    return false;
            }
            if(date1 < datumdo &&
                date2 > datumdo){
                    return false;
            }
        }

        return true
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    let podaci = {}
    podaci.idtrener = this.props.idtrener

    if(this.state.datumodtrenira){
      console.log(this.state.datumodtrenira)
      podaci.datumodtrenira = this.add2Hours(this.state.datumodtrenira)
    }else{
        this.setState({errMsg: 'Morate odrediti datum dolaska u klub'})
        return;
    }
    if(this.state.datumdotrenira){
      console.log(this.state.datumdotrenira)
      podaci.datumdotrenira = this.add2Hours(this.state.datumdotrenira)
    }

    if(podaci.datumodtrenira > podaci.datumdotrenira){
        this.setState({errMsg: 'Datum dolaska u klub mora biti manji od datuma odlaska'})
        return;
    }

    if(!this.provjeriBoravak(podaci.datumodtrenira, podaci.datumdotrenira)){
        this.setState({errMsg: 'Novi boravak se preklapa sa starim boravcima'})
        return;
    }

    if(this.state.tim > 0){
        podaci.idtim= this.state.tim;
    }else{
        this.setState({errMsg: 'Morate izabrati klub'})
        return;
    }


    console.log("nesto")
    console.log(podaci)
    console.log("nesto")


    axios
      .post('http://localhost:3001/admin/dodajposao/', podaci)
      .then(() => {
        console.log("success!")
        window.location = '/admin/trener/' + podaci.idtrener
      })
      .catch(err => {
        console.log(err)
        this.setState({
          errMsg: 'Greška pri ubacivanju novog posla!',
        });
      });

  };


  toggleVisibility = () => {
    this.setState({visible: (!this.state.visible)})
  }

  handleSelectKlubChange = (selectedOption) => {
      console.log("izabran id " + selectedOption.value)
    this.setState({tim: selectedOption.value});
  }


  render() {
    return (
      <div>
        <Button type="button" onClick={this.toggleVisibility}>Dodaj posao</Button>
        <div className="container">
          {this.state.visible && <Form onSubmit={this.handleSubmit}>
              <br/>
            <div>
            <DatePicker selected={this.state.datumodtrenira} 
                        onChange={date => this.setState({datumodtrenira: date})} 
                        showMonthDropdown
                        showYearDropdown
                        locale="hr" 
                        dateFormat="dd/MM/yyyy"
                        dropdownMode="select"
                        placeholderText="datum od kojeg trenira tim"
                        minDate={new Date('1/1/2000')}
                        maxDate={new Date()}/>
                        
            </div>
            <br />
            <div>
            <DatePicker selected={this.state.datumdotrenira} 
                        onChange={date => this.setState({datumdotrenira: date})} 
                        showMonthDropdown
                        showYearDropdown
                        locale="hr" 
                        dateFormat="dd/MM/yyyy"
                        dropdownMode="select"
                        placeholderText="datum do kojeg je trenirao tim"/>
            </div>
            Tim:
            <div>
              <Select onChange={this.handleSelectKlubChange}
                options={this.props.timovi}/>
            </div>
            <br/>
            <div>
              <Button className="btn btn-success" type="submit">
                Dodaj
              </Button>
            </div>
            
          </Form>}
        </div>
        {this.state.errMsg ? <div style={{color: "red"}}>{this.state.errMsg}</div> : null}
      </div>
    );
  }
}

export default DodajPosao;