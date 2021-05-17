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


class IzmjeniBoravakUKlubu extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.igrac)
    this.state = {
      visible: false,
      datumodigrazaklub: '',
      datumdoigrazaklub: '',
      klub: 0,
      idklubprosli: this.props.igra_za_klub.idklub,
      datumodigrazaklubprosli: this.props.igra_za_klub.datumodigrazaklub
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
        let date1 = new Date(this.props.boravci[i].datumodigrazaklub)
        let date2 = new Date(this.props.boravci[i].datumdoigrazaklub)   

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

    let podaci = this.props.igra_za_klub


    podaci.idklubprosli = this.state.idklubprosli
    podaci.datumodigrazaklubprosli = this.state.datumodigrazaklubprosli

    console.log("0000")
    console.log(this.props)
    console.log("0000")

    if(this.state.datumodigrazaklub){
      console.log(this.state.datumodigrazaklub)
      podaci.datumodigrazaklub = this.add2Hours(this.state.datumodigrazaklub)
    }
    if(this.state.datumdoigrazaklub){
      console.log(this.state.datumdoigrazaklub)
      podaci.datumdoigrazaklub = this.add2Hours(this.state.datumdoigrazaklub)
    }

    if(podaci.datumodigrazaklub > podaci.datumdoigrazaklub){
        this.setState({errMsg: 'Datum dolaska u klub mora biti manji od datuma odlaska'})
        return;
    }

    if(!this.provjeriBoravak(podaci.datumodigrazaklub, podaci.datumdoigrazaklub)){
        this.setState({errMsg: 'Novi boravak se preklapa sa starim boravcima'})
        return;
    }

    if(this.state.klub > 0){
        podaci.idklub = this.state.klub;
    }


    console.log("nesto")
    console.log(podaci)
    console.log("nesto")


    axios
      .post('http://localhost:3001/admin/izmjeniboravakuklubu/', podaci)
      .then(() => {
        console.log("success!")
        window.location = '/admin/igrac/' + podaci.idigrac
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
    this.setState({klub: selectedOption.value});
  }


  render() {
    return (
      <div>
        <div className="container">
          <Button type="button" onClick={this.toggleVisibility}>Izmjeni boravak u klubu</Button>
          {this.state.visible && <Form onSubmit={this.handleSubmit}>
            <div>
            <DatePicker selected={this.state.datumodigrazaklub} 
                        onChange={date => this.setState({datumodigrazaklub: date})} 
                        showMonthDropdown
                        showYearDropdown
                        locale="hr" 
                        dateFormat="dd/MM/yyyy"
                        dropdownMode="select"
                        placeholderText="datum od kojeg igra za klub"
                        minDate={new Date('1/1/2000')}
                        maxDate={new Date()}/>
                        
            </div>
            <br />
            <div>
            <DatePicker selected={this.state.datumdoigrazaklub} 
                        onChange={date => this.setState({datumdoigrazaklub: date})} 
                        showMonthDropdown
                        showYearDropdown
                        locale="hr" 
                        dateFormat="dd/MM/yyyy"
                        dropdownMode="select"
                        placeholderText="datum do kojeg je igrao za klub"/>
            </div>
            Klub:
            <div>
              <Select onChange={this.handleSelectKlubChange}
                options={this.props.klubovi}/>
            </div>
            <br/>
            <div>
              <Button className="btn btn-success" type="submit">
                Izmjeni
              </Button>
            </div>
            
          </Form>}
        </div>
        {this.state.errMsg ? <div style={{color: "red"}}>{this.state.errMsg}</div> : null}
      </div>
    );
  }
}

export default IzmjeniBoravakUKlubu;