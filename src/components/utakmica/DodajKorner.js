import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

const opcijeIzletio = [
  {value:0, label:'golman nije izletio'},
  {value:1, label:'golman izletio'}
]

const opcijeDrugiKorner = [
    {value:0, label:'nije izboren drugi korner'},
    {value:1, label:'izboren drugi korner'}
  ]

const opcijeStativa = [
  {value:0, label:'prva stativa'},
  {value:1, label:'druga stativa'},
  {value:2, label:'kratko izveden korner'}
]

class DodajKorner extends Component {
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
      golmanizletio: null,
      izborendrugikorner: null,
      stativa: null
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
                  temp[i].label = igraciBaza[i].nadimakigrac + ((igraciBaza[i].pozicija === 'GK') ? " (GK)" : "")
              }else{
                  temp[i].label = igraciBaza[i].imeigrac + " " + igraciBaza[i].prezimeigrac + ((igraciBaza[i].pozicija === 'GK') ? " (GK)" : "")
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

  handleSelectStativaChange = (selectedOption) => {
    this.setState({stativa: selectedOption.value});
  }

  handleSelectGolmanIzletioChange = (selectedOption) => {
    this.setState({golmanizletio: selectedOption.value});
  }

  handleSelectDrugiKornerChange= (selectedOption) => {
    this.setState({izborendrugikorner: selectedOption.value});
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

    if(this.state.golmanizletio === null){
      this.setState({errMsg: 'Morate odrediti jeli golman izletio'});
      return;
    }

    if(this.state.stativa === null){
      this.setState({errMsg: 'Morate odrediti na koju stativu je išao ubačaj'});
      return;
    }

    if(this.state.izborendrugikorner === null){
      this.setState({errMsg: 'Morate odrediti je li izboren drugi korner'});
      return;
    }

    let korner = {}

    korner.idutakmica = this.props.utakmica.idutakmica;
    korner.minuta = this.state.minuta;
    korner.zabijengol = (this.state.zabijengol) ? 1 : 0;
    korner.pogodjenokvir = (this.state.pogodjenokvir) ? 1 : 0;
    korner.idigrac = (this.state.domaciigracgolman)? this.state.gostujuciigrac : this.state.domaciigrac;
    korner.idgolman = (this.state.domaciigracgolman)? this.state.domaciigrac : this.state.gostujuciigrac;
    korner.golmanizletio = this.state.golmanizletio;
    korner.stativa = this.state.stativa;
    korner.izborendrugikorner = this.state.izborendrugikorner;

    console.log(korner)

    axios
      .post('http://localhost:3001/admin/dodajkorner/', korner)
      .then(() => {
        console.log('Dodan igrac')
        this.setState({errMsg: ''})
        window.location = '/admin/utakmica/' + korner.idutakmica
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
        <Button onClick={this.toggleVisibility}> Dodaj korner</Button>
        {this.state.visible && <div className="container">
            <h2>Dodaj korner</h2>
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
            Je li golman izletio:
            <br/>
            <Select onChange={this.handleSelectGolmanIzletioChange}
              options={opcijeIzletio}/>
            </div>
            <br/>
            <div>
            Na koju stativu je išao ubačaj:
            <br/>
            <Select onChange={this.handleSelectStativaChange}
              options={opcijeStativa}/>
            </div>
            <br/>
            <div>
            Je li izboren drugi korner:
            <br/>
            <Select onChange={this.handleSelectDrugiKornerChange}
              options={opcijeDrugiKorner}/>
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

export default DodajKorner;