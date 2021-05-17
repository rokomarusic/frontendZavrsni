import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

const opcijeVisina = [
  {value:0, label:'dolje'},
  {value:1, label:'gore'}
]

const opcijeStrana = [
  {value:0, label:'lijevo'},
  {value:1, label:'sredina'},
  {value:2, label:'desno'}
]

class DodajPenal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      minuta : '',
      zabijengol: false,
      pogodjenokvir: false,
      domaciigrac: null,
      gostujuciigrac: null,
      rosterDomacin: [],
      rosterGost: [],
      errMsg: '',
      domaciigracgolman: false,
      gostujuciigracgolman: false,
      stranaigrac: null,
      stranagolman: null,
      visinaigrac: null
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {

    let utakmica = this.props.utakmica
    
    axios
    .get('http://localhost:3001/admin/rostertim/' + utakmica.iddomacin + "?sezona=" + utakmica.godinasezona )
    .then(response => {
        console.log("rispons")
        console.log(response)
        console.log("rispons")
        let temp = []
        let igraciBaza = response.data
        for(let i = 0; i < igraciBaza.length; i++){
                temp[i] = {value:"", label:""}
                temp[i].value = igraciBaza[i].idigrac
                if(igraciBaza[i].nadimakigrac){
                    temp[i].label = igraciBaza[i].nadimakigrac
                }else{
                    temp[i].label = igraciBaza[i].imeigrac + " " + igraciBaza[i].prezimeigrac
                }
                console.log(i + " " + temp[i].value + temp[i].label)
            
        }
        this.setState({rosterDomacin: temp});
    })
    .catch(error => {
console.log(error)
this.setState({errorMsg: 'Error retrieving data'})
    })

    axios
    .get('http://localhost:3001/admin/rostertim/' + utakmica.idgost + "?sezona=" + utakmica.godinasezona )
    .then(response => {
        console.log("rispons")
        console.log(response)
        console.log("rispons")
        let temp = []
        let igraciBaza = response.data
        for(let i = 0; i < igraciBaza.length; i++){
                temp[i] = {value:"", label:""}
                temp[i].value = igraciBaza[i].idigrac
                if(igraciBaza[i].nadimakigrac){
                    temp[i].label = igraciBaza[i].nadimakigrac + ((igraciBaza[i].pozicija === 'GK') ? " (GK)" : "")
                }else{
                    temp[i].label = igraciBaza[i].imeigrac + " " + igraciBaza[i].prezimeigrac + ((igraciBaza[i].pozicija === 'GK') ? " (GK)" : "")
                }
                console.log(i + " " + temp[i].value + temp[i].label)
            
        }
        this.setState({rosterGost: temp});
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

  handleSelectDomaciIgracChange = (selectedOption) => {
    this.setState({domaciigrac: selectedOption.value});
  }


  handleSelectGostujuciIgracChange = (selectedOption) => {
    this.setState({gostujuciigrac: selectedOption.value});
  }

  handleSelectStranaIgracChange = (selectedOption) => {
    this.setState({stranaigrac: selectedOption.value});
  }

  handleSelectVisinaIgracChange = (selectedOption) => {
    this.setState({visinaigrac: selectedOption.value});
  }

  handleSelectStranaGolmanChange = (selectedOption) => {
    this.setState({stranagolman: selectedOption.value});
  }

  toggleZabijengol = () =>{
      if(this.state.zabijengol){
        this.setState({zabijengol: false})
      }else{
        this.setState({zabijengol: true})
      }
  }

  togglePogodjenOkvir= () =>{
    if(this.state.pogodjenokvir){
      this.setState({pogodjenokvir: false})
    }else{
      this.setState({pogodjenokvir: true})
    }
}

toggleDomaciIgracGolman= () =>{
    if(this.state.domaciigracgolman){
      this.setState({domaciigracgolman: false})
    }else{
      this.setState({domaciigracgolman: true})
    }
}

toggleGostujuciIgracGolman= () =>{
    if(this.state.gostujuciigracgolman){
      this.setState({gostujuciigracgolman: false})
    }else{
      this.setState({gostujuciigracgolman: true})
    }
}

  handleSubmit = e => {
    e.preventDefault();


    if(this.state.zabijengol && !this.state.pogodjenokvir){
      this.setState({errMsg: 'Ako je zabijen gol mora biti i pogođen okvir'});
      return;
    }

    if(this.state.minuta < 0 || this.state.minuta > 150){
      this.setState({errMsg: 'Minuta mora biti imzeđu 0 i 150'});
      return;
    }


    if(this.state.domaciigracgolman && this.state.gostujuciigracgolman){
      this.setState({errMsg: 'Ne mogu oba igrača bit golmani'});
      return;
    }

    if(!this.state.domaciigracgolman && !this.state.gostujuciigracgolman){
      this.setState({errMsg: 'Barem jedan igrač mora biti označen kao golman'});
      return;
    }

    if(this.state.domaciigrac === null){
      this.setState({errMsg: 'Morate odrediti igrača domaćeg tima'});
      return;
    }

    if(this.state.gostujuciigrac === null){
      this.setState({errMsg: 'Morate odrediti igrača gostujućeg tima'});
      return;
    }

    if(this.state.stranaigrac === null){
      this.setState({errMsg: 'Morate odrediti stranu na koju je igrač pucao'});
      return;
    }

    if(this.state.stranagolman === null){
      this.setState({errMsg: 'Morate odrediti stranu na koju se golman bacio'});
      return;
    }

    if(this.state.visinaigrac === null){
      this.setState({errMsg: 'Morate odrediti visinu na koju je igrač pucao'});
      return;
    }

    let penal = {}

    penal.idutakmica = this.props.utakmica.idutakmica;
    penal.minuta = this.state.minuta;
    penal.zabijengol = (this.state.zabijengol) ? 1 : 0;
    penal.pogodjenokvir = (this.state.pogodjenokvir) ? 1 : 0;
    penal.idigrac = (this.state.domaciigracgolman)? this.state.gostujuciigrac : this.state.domaciigrac;
    penal.idgolman = (this.state.domaciigracgolman)? this.state.domaciigrac : this.state.gostujuciigrac;
    penal.stranaigracpenal = this.state.stranaigrac;
    penal.stranagolmanpenal = this.state.stranagolman;
    penal.visinaigracpenal = this.state.visinaigrac;

    console.log(penal)

    axios
      .post('http://localhost:3001/admin/dodajpenal/', penal)
      .then(() => {
        console.log('Dodan igrac')
        this.setState({errMsg: ''})
        window.location = '/admin/utakmica/' + penal.idutakmica
      })
      .catch(err => {
        console.log(err)
        this.setState({
          errMsg: 'Greška pri ubacivanju igraca!',
        });
      });

  };

  toggleVisibility= () => {
    this.setState({visible: !this.state.visible})
    console.log("korner")
}


  render() {
    return (
      <div>
        <Button onClick={this.toggleVisibility}> Dodaj penal</Button>
        {this.state.visible && <div className="container">
            <h2>Dodaj penal</h2>
          <Form onSubmit={this.handleSubmit}>
            <div>
              minuta:
              <br/>        
              <input
                type="number"
                name="minuta"
                placeholder="minuta"
                onChange={this.handleInputChange}
                required
              />
            </div>
            <br/>
            Gol Zabijen
            <br/>
            <input type="checkbox" name="zabijengol" defaultChecked={false} onChange={this.toggleZabijengol}/>
            <br/> 
            <br/>
            Pogođen okvir
            <br/>
            <input type="checkbox" name="domaciigracgolman" defaultChecked={false} onChange={this.togglePogodjenOkvir}/>
            <br/> 
            <div>
            Igrač iz domaćeg tima:
             <br/>
             <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Označite je li ovaj igrač golman</Tooltip>}>
                <span>
             Golman:
            <input type="checkbox" name="gostujuciigracgolman" defaultChecked={false} onChange={this.toggleDomaciIgracGolman}/>
            </span>
            </OverlayTrigger>
              <Select onChange={this.handleSelectDomaciIgracChange}
              options={this.state.rosterDomacin}/>
            </div>
            <br />
            <div>
             Igrač iz gostujućeg tima:
             <br/>
             <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Označite je li ovaj igrač golman</Tooltip>}>
                <span>
             Golman:
            <input type="checkbox" name="pogodjenokvir" defaultChecked={false} onChange={this.toggleGostujuciIgracGolman}/>
            </span>
            </OverlayTrigger>
              <Select onChange={this.handleSelectGostujuciIgracChange}
              options={this.state.rosterGost}/>
            </div>
            <br/>
            <div>
            Strana na koju je pucao igrač:
            <br/>
            <Select onChange={this.handleSelectStranaIgracChange}
              options={opcijeStrana}/>
            </div>
            <br/>
            <div>
            Visina na koju je pucao igrač:
            <br/>
            <Select onChange={this.handleSelectVisinaIgracChange}
              options={opcijeVisina}/>
            </div>
            <br/>
            <div>
            Strana na koju se bacio golman:
            <br/>
            <Select onChange={this.handleSelectStranaGolmanChange}
              options={opcijeStrana}/>
            </div>
            <br/>
            <br />
            <div>
              <Button className="btn btn-success" type="submit">
                Dodaj 
              </Button>
            </div>
          </Form>
        </div>   }
        {this.state.errMsg ? <div style={{color: "red"}}>{this.state.errMsg}</div> : null}
      </div>
    );
  }
}

export default DodajPenal;