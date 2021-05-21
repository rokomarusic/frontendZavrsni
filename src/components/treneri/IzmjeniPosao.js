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


class IzmjeniPosao extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.trenira)
    this.state = {
      visible: false,
      datumodtrenira: '',
      datumdotrenira: '',
      tim: 0,
      idtimprosli: this.props.trenira.idtim,
      datumodtreniraprosli: this.props.trenira.datumodtrenira
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

    let podaci = this.props.trenira


    podaci.idtimprosli = this.state.idtimprosli
    podaci.datumodtreniraprosli = this.state.datumodtreniraprosli

    console.log("0000")
    console.log(this.props)
    console.log("12341" + podaci.idtimprosli)
    console.log("0000")

    if(this.state.datumodtrenira){
      console.log(this.state.datumodtrenira)
      podaci.datumodtrenira = this.add2Hours(this.state.datumodtrenira)
    }
    if(this.state.datumdotrenira){
      console.log(this.state.datumdotrenira)
      podaci.datumdotrenira = this.add2Hours(this.state.datumdotrenira)
    }

    if(podaci.datumdotrenira !== null && podaci.datumodtrenira > podaci.datumdotrenira){
        console.log(podaci.datumodtrenira)
        console.log(podaci.datumdotrenira)
        this.setState({errMsg: 'Datum dolaska u tim mora biti manji od datuma odlaska'})
        return;
    }

    if(!this.provjeriBoravak(podaci.datumodtrenira, podaci.datumdotrenira)){
        this.setState({errMsg: 'Novi boravak se preklapa sa starim boravcima'})
        return;
    }

    if(this.state.tim > 0){
        podaci.idtim = this.state.tim;
    }else{
        podaci.idtim = podaci.idtimprosli;
    }


    console.log("nesto")
    console.log(podaci)
    console.log("nesto")


    axios
      .post('http://localhost:3001/admin/izmjeniposao/', podaci)
      .then(() => {
        console.log("success!")
        window.location = '/admin/trener/' + podaci.idtrener
      })
      .catch(err => {
        console.log(err)
        this.setState({
          errMsg: 'Greška pri ubacivanju grada!',
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
        <Button type="button" onClick={this.toggleVisibility}>Izmjeni posao</Button>
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
            tim:
            <div>
              <Select onChange={this.handleSelectKlubChange}
                options={this.props.timovi}/>
            </div>
            <br/>
            <div>
              <Button className="btn btn-success" type="submit">
                Izmjeni
              </Button>
            </div>
            <br/>
          </Form>}
        </div>
        {this.state.errMsg ? <div style={{color: "red"}}>{this.state.errMsg}</div> : null}
      </div>
    );
  }
}

export default IzmjeniPosao;