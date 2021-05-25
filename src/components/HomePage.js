import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Select from 'react-select'
import Table from 'react-bootstrap/Table'

const opcijeUdarac = [
    {value:0, label:'svi udarci'},
    {value:1, label:'penali'},
    {value:2, label:'slobodni udarci'}
  ]

class Igraci extends Component {
	constructor(props) {
		super(props)

		this.state = {
      igraci: [],
      errorMsg: '',
	  drzave: [],
      sezone:[],
      options: [],
      godinasezona: null,
      natjecanje: null,
      natjecanja: [],
      natjecanjaOpcije:[],
      topstrijelci:[],
      vrstadogadaja: null
		}
	}

	componentDidMount() {
		axios
			.get('http://localhost:3001/topstrijelci')
			.then(response => {
				console.log(response)
				this.setState({ igraci: response.data,
                                topstrijelci: response.data })
			})
			.catch(error => {
        console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
			})

    
        axios
            .get('http://localhost:3001/admin/sezone')
            .then(response => {
                console.log(response)
                this.setState({ sezone: response.data});
                console.log(this.state.sezone)
                let temp = []
                temp[0] = {value:"", label:""}
                temp[0].value = -1
                temp[0].label = "Sve sezone"
                for(let i = 0; i < this.state.sezone.length; i++){
                    temp[i + 1] = {value:"", label:""}
                    temp[i + 1].value = this.state.sezone[i].godinasezona
                    temp[i + 1].label = this.state.sezone[i].godinasezona
                    console.log(i + " " + temp[i].value)
                }
                this.setState({options: temp});
            })
            .catch(error => {
        console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
            })

        axios
            .get('http://localhost:3001/svanatjecanja')
            .then(response => {
                console.log(response)
                let natjecanjaBaza = response.data
                console.log(this.state.sezone)
                let temp = []
                temp[0] = {value:"", label:"", godinasezona:""}
                temp[0].value = -1
                temp[0].label = "Sva natjecanja"
                for(let i = 0; i < natjecanjaBaza.length; i++){
                    temp[i + 1] = {value:"", label:"", godinasezona:""}
                    temp[i + 1].value = natjecanjaBaza[i].idnatjecanje
                    temp[i + 1].godinasezona = natjecanjaBaza[i].godinasezona
                    temp[i + 1].label = natjecanjaBaza[i].nazivnatjecanje + " " + natjecanjaBaza[i].godinasezona + " (" + natjecanjaBaza[i].nazivtim + ")"
                }
                console.log("Natjecanja iz baze")
                console.log(temp)
                this.setState({natjecanja: temp});
                this.setState({natjecanjaOpcije: temp});
            })
            .catch(error => {
        console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
            })
		
	}

    handleSelectSezonaChange = (selectedOption) => {
        this.setState({godinasezona: selectedOption.value});
        if(selectedOption.value !== -1){
            this.setState({natjecanjaOpcije: this.state.natjecanja.filter(natjecanje => natjecanje.godinasezona === parseInt(selectedOption.value) || natjecanje.value === -1)})
        }
    }

    handleSelectNatjecanjeChange = (selectedOption) => {
        this.setState({natjecanje: selectedOption.value});
    }

    handleSelectDogadajChange = (selectedOption) => {
        this.setState({vrstadogadaja: selectedOption.value});
    }

    filterIgrace = () =>{

        console.log(this.state.godinasezona + " " + this.state.natjecanje)
        console.log(this.state.topstrijelci)
        let sezona = this.state.godinasezona

        if((this.state.godinasezona === null && this.state.natjecanje === null) ||
            (this.state.godinasezona === -1 && this.state.natjecanje === -1) ||
            (this.state.godinasezona === -1 && this.state.natjecanje === null)){
                console.log("OVJDEOVJDE")
            let path = null
            switch(this.state.vrstadogadaja){
                case 0:
                    path = 'http://localhost:3001/topstrijelci/'
                    break;
                case 1:
                    path = 'http://localhost:3001/topstrijelcipenali/'
                    break;
                case 2:
                    path = 'http://localhost:3001/topstrijelcislobodni/'
                    break;
                default:
                    path = 'http://localhost:3001/topstrijelci/'
                    break;
            }
            console.log("Patzh " + path)
            axios
                .get(path)
                .then(response => {
                    console.log(response)
                    this.setState({ igraci: response.data,
                                    topstrijelci: response.data })
                })
                .catch(error => {
            console.log(error)
            this.setState({errorMsg: 'Error retrieving data'})
                })
            return
        }

        if(this.state.natjecanje === null || this.state.natjecanje === -1){
            let path = null
            switch(this.state.vrstadogadaja){
                case 0:
                    path = 'http://localhost:3001/topstrijelcisezona/?sezona='
                    break;
                case 1:
                    path = 'http://localhost:3001/topstrijelcipenalisezona/?sezona='
                    break;
                case 2:
                    path = 'http://localhost:3001/topstrijelcislobodnisezona/?sezona='
                    break;
                default:
                    path = 'http://localhost:3001/topstrijelcisezona/?sezona='
                    break;
            }
            axios
                .get(path + sezona)
                .then(response => {
                    console.log(response)
                    this.setState({ igraci: response.data})
                })
                .catch(error => {
            console.log(error)
            this.setState({errorMsg: 'Error retrieving data'})
                })
        }else{
            let path = null
            switch(this.state.vrstadogadaja){
                case 0:
                    path = 'http://localhost:3001/topstrijelcinatjecanje/?natjecanje='
                    break;
                case 1:
                    path = 'http://localhost:3001/topstrijelcipenalinatjecanje/?natjecanje='
                    break;
                case 2:
                    path = 'http://localhost:3001/topstrijelcislobodninatjecanje/?natjecanje='
                    break;
                default:
                    path = 'http://localhost:3001/topstrijelcinatjecanje/?natjecanje='
                    break;
            }
            axios
                .get(path + this.state.natjecanje)
                .then(response => {
                    console.log(response)
                    this.setState({ igraci: response.data})
                })
                .catch(error => {
            console.log(error)
            this.setState({errorMsg: 'Error retrieving data'})
                })
        }
    }


	render() {
		const { igraci, errorMsg } = this.state
		return (
			<div className="container">
				<h1>Najbolji strijelci</h1>
                <hr/>
                <div>
                    Sezona:
                    <Select onChange={this.handleSelectSezonaChange}
                    options={this.state.options}
                    defaultValue={this.state.options[0]}/>
                </div>
                <br/>
                <div>
                    Natjecanje:
                    <Select onChange={this.handleSelectNatjecanjeChange}
                    options={this.state.natjecanjaOpcije}
                    defaultValue={this.state.natjecanjaOpcije[0]}/>
                </div>
                <br/>
                <div>
                    Vrsta događaja:
                    <Select onChange={this.handleSelectDogadajChange}
                    options={opcijeUdarac}
                    defaultValue={opcijeUdarac[0]}/>
                </div>
                <br/>
            <div>
              <Button className="btn btn-success" type="button" onClick={this.filterIgrace}>
                Prikaži igrače
              </Button>
            </div>
                <Table responsive>
                <thead>
                    <tr>
                        <th>igrač</th>
                        <th>pozicija</th>
                        <th>broj golova</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {igraci.map(igrac => 
                    <tr>
                        <td>{igrac.nadimakigrac ? igrac.nadimakigrac : igrac.imeigrac + " " + igrac.prezimeigrac}</td>
                        <td>{igrac.pozicija}</td>
                        <td>{igrac.brgolovakorner? (igrac.brgolova - igrac.brgolovakorner) : igrac.brgolova}</td>
                        <td>
                            <Link to={"/igrac/" + igrac.idigrac}>
                            <Button variant="outline-primary" type="button">
                                Pregledaj igraca
                            </Button>
                            </Link>
                        </td>
                    </tr>)}
                </tbody>
          </Table>
        {errorMsg ? <div>{errorMsg}</div> : null}
			</div>
		)
	}
}

export default Igraci