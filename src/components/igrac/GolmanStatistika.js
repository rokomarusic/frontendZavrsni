import React, { Component } from 'react'
import axios from 'axios'
import { PieChart } from 'react-minimal-pie-chart';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Carousel from 'react-bootstrap/Carousel'
import Card from 'react-bootstrap/Card'
import Box from '@material-ui/core/Box';
import Select from 'react-select'


import Paper from '@material-ui/core/Paper';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

const data = [
    { year: '1950', population: 2.525 },
    { year: '1960', population: 3.018 },
    { year: '1970', population: 3.682 },
    { year: '1980', population: 4.440 },
    { year: '1990', population: 5.310 },
    { year: '2000', population: 6.127 },
    { year: '2010', population: 6.930 },
  ];


class GolmanStatistika extends Component {
	constructor(props) {
		super(props)
	    this.state = {
            ime: '',
            igrac: '',
			klubovi: '',
			kluboviOpcije: [],
			drzave:[],
			drzava: '',
			sezone: [],
			stranePenalStats:{lijevo: 0, sredina: 0, desno: 0 },
			straneUdaracStats:{lijevo: 0, sredina: 0, desno: 0 },
			straneSlobodniStats:{lijevo: 0, sredina: 0, desno: 0 },
            izletioKornerStats:{izlezio: 0, nijeizletio: 0},
            postotakkorneri: 0,
            postotakudarci: 0,
            postotakpenali: 0,
            postotakslobodni: 0,
			godinasezona: null,
			options:[],
            brigracazivizid:[{brigraca:0, count: 0},
                {brigraca:1, count: 0},
                {brigraca:2, count: 0},
                {brigraca:3, count: 0},
                {brigraca:4, count: 0},
                {brigraca:5, count: 0},
                {brigraca:6, count: 0},
                {brigraca:7, count: 0},
                {brigraca:8, count: 0},
                {brigraca:9, count: 0},
                {brigraca:10, count: 0}, ]
		}
	}

	getDrzava(){
		for(let i = 0; i < this.state.drzave.length; i++){
			if(this.state.drzave[i].value === this.state.igrac.iddrzava){
				this.setState({drzava: this.state.drzave[i].label});
				return;
			}
		}
		return null;
	}

	componentDidMount() {
        let id = this.props.match.params.id
        console.log("ID " + id)
		axios
			.get('http://localhost:3001/admin/igrac/' + id)
			.then(response => {
				this.setState({ igrac: response.data })
			})
			.catch(error => {
        console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
			})

		axios
			.get('http://localhost:3001/admin/igracklubovi/' + id)
			.then(response => {
				this.setState({ klubovi: response.data })

			})
			.catch(error => {
        		console.log(error)
        		this.setState({errorMsg: 'Error retrieving data'})
			})

		axios
			.get('http://localhost:3001/admin/drzave')
			.then(response => {
				let temp = []
				let drzaveBaza = response.data
				for(let i = 0; i < drzaveBaza.length; i++){
					temp[i] = {value:"", label:""}
					temp[i].value = drzaveBaza[i].iddrzava
					temp[i].label = drzaveBaza[i].nazivtim
				}
				this.setState({drzave: temp});
				this.getDrzava();
			})
			.catch(error => {
        		console.log(error)
        		this.setState({errorMsg: 'Error retrieving data'})
			})
		
		axios
			.get('http://localhost:3001/admin/sezone')
			.then(response => {
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
			.get('http://localhost:3001/admin/sviklubovi')
			.then(response => {
				let temp = []
				let kluboviBaza = response.data
				for(let i = 0; i < kluboviBaza.length; i++){
					temp[i] = {value:"", label:""}
					temp[i].value = kluboviBaza[i].idklub
					temp[i].label = kluboviBaza[i].nazivtim
					console.log(i + " " + temp[i].value + temp[i].label)
				}
				this.setState({kluboviOpcije: temp});
			})
			.catch(error => {
		console.log(error)
		this.setState({errorMsg: 'Error retrieving data'})
			})

        this.dataSveSezone(id)
	
	}

	handleSelectSezonaChange = (selectedOption) => {
        this.setState({godinasezona: selectedOption.value});
		console.log("SELEKTID OPŠN " + selectedOption.value)
    }

    dataSveSezone = (id) => {
        axios
			.get('http://localhost:3001/golmanstranepenala/?igrac=' + id)
			.then(response => {
				let stranePenalStats = {lijevo: 0, sredina: 0, desno: 0 }
				for(let i = 0; i < response.data.length; i++){
					if(response.data[i].stranagolmanpenal === 0){
						stranePenalStats.lijevo += parseInt(response.data[i].count)
					}else if(response.data[i].stranagolmanpenal === 1){
						stranePenalStats.sredina += parseInt(response.data[i].count)
					}else{
						stranePenalStats.desno += parseInt(response.data[i].count)
					}
				}

				this.setState({stranePenalStats: stranePenalStats})

			})
			.catch(error => {
        		console.log(error)
        		this.setState({errorMsg: 'Error retrieving data'})
			})

        axios
			.get('http://localhost:3001/golmanstraneudarci/?igrac=' + id)
			.then(response => {
				let straneUdaracStats = {lijevo: 0, sredina: 0, desno: 0 }
				for(let i = 0; i < response.data.length; i++){
					if(response.data[i].stranagolmanudarac === 0){
						straneUdaracStats.lijevo += parseInt(response.data[i].count)
					}else if(response.data[i].stranagolmanudarac === 1){
						straneUdaracStats.sredina += parseInt(response.data[i].count)
					}else{
						straneUdaracStats.desno += parseInt(response.data[i].count)
					}
				}

				this.setState({straneUdaracStats: straneUdaracStats})

			})
			.catch(error => {
        		console.log(error)
        		this.setState({errorMsg: 'Error retrieving data'})
			})

        axios
			.get('http://localhost:3001/stranagolmanslobodni/?igrac=' + id)
			.then(response => {
				let straneSlobodniStats = {lijevo: 0, sredina: 0, desno: 0 }
				for(let i = 0; i < response.data.length; i++){
					if(response.data[i].stranagolmanslobodni === 0){
						straneSlobodniStats.lijevo += parseInt(response.data[i].count)
					}else if(response.data[i].stranagolmanslobodni === 1){
						straneSlobodniStats.sredina += parseInt(response.data[i].count)
					}else{
						straneSlobodniStats.desno += parseInt(response.data[i].count)
					}
				}

				this.setState({straneSlobodniStats: straneSlobodniStats})

			})
			.catch(error => {
        		console.log(error)
        		this.setState({errorMsg: 'Error retrieving data'})
			})

        axios
			.get('http://localhost:3001/golmanizletiokorner/?igrac=' + id)
			.then(response => {
				let izletioKornerStats = {izletio: 0, nijeizletio: 0}
				for(let i = 0; i < response.data.length; i++){
					if(response.data[i].golmanizletio === 1){
						izletioKornerStats.izletio += parseInt(response.data[i].count)
					}else{
						izletioKornerStats.nijeizletio += parseInt(response.data[i].count);
					}
				}
                console.log("STATS ZA IZLECIVANJE")
                console.log(izletioKornerStats)
				this.setState({izletioKornerStats: izletioKornerStats})

			})
			.catch(error => {
        		console.log(error)
        		this.setState({errorMsg: 'Error retrieving data'})
			})

        axios
			.get('http://localhost:3001/postotakobranapenal/?igrac=' + id)
			.then(response => {
				let preciznost = response.data[0] && response.data[0].preciznost ? response.data[0].preciznost : 0
				console.log("PREC  " + preciznost)

				this.setState({ postotakpenali: ((Math.round(preciznost  * 100)).toString() + "%")});
			})
			.catch(error => {
		console.log(error)
		this.setState({errorMsg: 'Error retrieving data'})
			})

            axios
			.get('http://localhost:3001/postotakobranakorner/?igrac=' + id)
			.then(response => {
				let preciznost = response.data[0] && response.data[0].preciznost ? response.data[0].preciznost : 0
				console.log("PREC  " + preciznost)

				this.setState({ postotakkorneri: ((Math.round(preciznost  * 100)).toString() + "%")});
			})
			.catch(error => {
		console.log(error)
		this.setState({errorMsg: 'Error retrieving data'})
			})

        axios
			.get('http://localhost:3001/postotakobranaslobodni/?igrac=' + id)
			.then(response => {
				let preciznost = response.data[0] && response.data[0].preciznost ? response.data[0].preciznost : 0
				console.log("PREC  " + preciznost)

				this.setState({ postotakslobodni: ((Math.round(preciznost  * 100)).toString() + "%")});
			})
			.catch(error => {
		console.log(error)
		this.setState({errorMsg: 'Error retrieving data'})
			})

        axios
			.get('http://localhost:3001/postotakobranaudarac/?igrac=' + id)
			.then(response => {
				let preciznost = response.data[0] && response.data[0].preciznost ? response.data[0].preciznost : 0
				console.log("PREC  " + preciznost)

				this.setState({ postotakudarci: ((Math.round(preciznost  * 100)).toString() + "%")});
			})
			.catch(error => {
		console.log(error)
		this.setState({errorMsg: 'Error retrieving data'})
			}) 

        axios
			.get('http://localhost:3001/brojigracazivizid/?igrac=' + id)
			.then(response => {
				let temp = {0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0}
				for(let i = 0; i < response.data.length; i++){
					switch(response.data[i].brojigracazivizid){
                        case 0: temp[0] += parseInt(response.data[i].count);break;
                        case 1: temp[1] += parseInt(response.data[i].count);break;
                        case 2: temp[2] += parseInt(response.data[i].count);break;
                        case 3: temp[3] += parseInt(response.data[i].count);break;
                        case 4: temp[4] += parseInt(response.data[i].count);break;
                        case 5: temp[5] += parseInt(response.data[i].count);break;
                        case 6: temp[6] += parseInt(response.data[i].count);break;
                        case 7: temp[7] += parseInt(response.data[i].count);break;
                        case 8: temp[8] += parseInt(response.data[i].count);break;
                        case 9: temp[9] += parseInt(response.data[i].count);break;
                        case 10: temp[10] += parseInt(response.data[i].count);break;
                        default: console.log("DOSLO JE DO GRESKE")
                    }
				}

                let brigracazivizid = [{brigraca:'0', count: 0},
                    {brigraca:'1', count: 0},
                    {brigraca:'2', count: 0},
                    {brigraca:'3', count: 0},
                    {brigraca:'4', count: 0},
                    {brigraca:'5', count: 0},
                    {brigraca:'6', count: 0},
                    {brigraca:'7', count: 0},
                    {brigraca:'8', count: 0},
                    {brigraca:'9', count: 0},
                    {brigraca:'10', count: 0}, ]

                    for(let i = 0; i < brigracazivizid.length; i++){
                        brigracazivizid[i].count = temp[i];
                    }

                
				
                console.log("STATS ZA BROJ IGRACA ZIVI ZID")
                console.log(brigracazivizid)
				this.setState({brigracazivizid: brigracazivizid})

			})
			.catch(error => {
        		console.log(error)
        		this.setState({errorMsg: 'Error retrieving data'})
			})
    }

    dataSezona = (id) => {
        axios
			.get('http://localhost:3001/golmanstranepenalasezona/?igrac=' + id +'&sezona=' + this.state.godinasezona)
			.then(response => {
				let stranePenalStats = {lijevo: 0, sredina: 0, desno: 0 }
				for(let i = 0; i < response.data.length; i++){
					if(response.data[i].stranagolmanpenal === 0){
						stranePenalStats.lijevo += parseInt(response.data[i].count)
					}else if(response.data[i].stranagolmanpenal === 1){
						stranePenalStats.sredina += parseInt(response.data[i].count)
					}else{
						stranePenalStats.desno += parseInt(response.data[i].count)
					}
				}

				this.setState({stranePenalStats: stranePenalStats})

			})
			.catch(error => {
        		console.log(error)
        		this.setState({errorMsg: 'Error retrieving data'})
			})

        axios
			.get('http://localhost:3001/golmanstraneudarcisezona/?igrac=' + id +'&sezona=' + this.state.godinasezona)
			.then(response => {
				let straneUdaracStats = {lijevo: 0, sredina: 0, desno: 0 }
				for(let i = 0; i < response.data.length; i++){
					if(response.data[i].stranagolmanudarac === 0){
						straneUdaracStats.lijevo += parseInt(response.data[i].count)
					}else if(response.data[i].stranagolmanudarac === 1){
						straneUdaracStats.sredina += parseInt(response.data[i].count)
					}else{
						straneUdaracStats.desno += parseInt(response.data[i].count)
					}
				}

				this.setState({straneUdaracStats: straneUdaracStats})

			})
			.catch(error => {
        		console.log(error)
        		this.setState({errorMsg: 'Error retrieving data'})
			})

        axios
			.get('http://localhost:3001/stranagolmanslobodnisezona/?igrac=' + id +'&sezona=' + this.state.godinasezona)
			.then(response => {
				let straneSlobodniStats = {lijevo: 0, sredina: 0, desno: 0 }
				for(let i = 0; i < response.data.length; i++){
					if(response.data[i].stranagolmanslobodni === 0){
						straneSlobodniStats.lijevo += parseInt(response.data[i].count)
					}else if(response.data[i].stranagolmanslobodni === 1){
						straneSlobodniStats.sredina += parseInt(response.data[i].count)
					}else{
						straneSlobodniStats.desno += parseInt(response.data[i].count)
					}
				}

				this.setState({straneSlobodniStats: straneSlobodniStats})

			})
			.catch(error => {
        		console.log(error)
        		this.setState({errorMsg: 'Error retrieving data'})
			})

        axios
			.get('http://localhost:3001/golmanizletiokornersezona/?igrac=' + id +'&sezona=' + this.state.godinasezona)
			.then(response => {
				let izletioKornerStats = {izletio: 0, nijeizletio: 0}
				for(let i = 0; i < response.data.length; i++){
					if(response.data[i].golmanizletio === 1){
						izletioKornerStats.izletio += parseInt(response.data[i].count)
					}else{
						izletioKornerStats.nijeizletio += parseInt(response.data[i].count);
					}
				}
                console.log("STATS ZA IZLECIVANJE")
                console.log(izletioKornerStats)
				this.setState({izletioKornerStats: izletioKornerStats})

			})
			.catch(error => {
        		console.log(error)
        		this.setState({errorMsg: 'Error retrieving data'})
			})

        axios
			.get('http://localhost:3001/postotakobranapenalsezona/?igrac=' + id +'&sezona=' + this.state.godinasezona)
			.then(response => {
				let preciznost = response.data[0] && response.data[0].preciznost ? response.data[0].preciznost : 0
				console.log("PREC  " + preciznost)

				this.setState({ postotakpenali: ((Math.round(preciznost  * 100)).toString() + "%")});
			})
			.catch(error => {
		console.log(error)
		this.setState({errorMsg: 'Error retrieving data'})
			})

            axios
			.get('http://localhost:3001/postotakobranakornersezona/?igrac=' + id +'&sezona=' + this.state.godinasezona)
			.then(response => {
				let preciznost = response.data[0] && response.data[0].preciznost ? response.data[0].preciznost : 0
				console.log("PREC  " + preciznost)

				this.setState({ postotakkorneri: ((Math.round(preciznost  * 100)).toString() + "%")});
			})
			.catch(error => {
		console.log(error)
		this.setState({errorMsg: 'Error retrieving data'})
			})

        axios
			.get('http://localhost:3001/postotakobranaslobodnisezona/?igrac=' + id +'&sezona=' + this.state.godinasezona)
			.then(response => {
				let preciznost = response.data[0] && response.data[0].preciznost ? response.data[0].preciznost : 0
				console.log("PREC  " + preciznost)

				this.setState({ postotakslobodni: ((Math.round(preciznost  * 100)).toString() + "%")});
			})
			.catch(error => {
		console.log(error)
		this.setState({errorMsg: 'Error retrieving data'})
			})

        axios
			.get('http://localhost:3001/postotakobranaudaracsezona/?igrac=' + id +'&sezona=' + this.state.godinasezona)
			.then(response => {
				let preciznost = response.data[0] && response.data[0].preciznost ? response.data[0].preciznost : 0
				console.log("PREC  " + preciznost)

				this.setState({ postotakudarci: ((Math.round(preciznost  * 100)).toString() + "%")});
			})
			.catch(error => {
		console.log(error)
		this.setState({errorMsg: 'Error retrieving data'})
			}) 

        axios
			.get('http://localhost:3001/brojigracazivizidsezona/?igrac=' + id +'&sezona=' + this.state.godinasezona)
			.then(response => {
				let temp = {0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0}
				for(let i = 0; i < response.data.length; i++){
					switch(response.data[i].brojigracazivizid){
                        case 0: temp[0] += parseInt(response.data[i].count);break;
                        case 1: temp[1] += parseInt(response.data[i].count);break;
                        case 2: temp[2] += parseInt(response.data[i].count);break;
                        case 3: temp[3] += parseInt(response.data[i].count);break;
                        case 4: temp[4] += parseInt(response.data[i].count);break;
                        case 5: temp[5] += parseInt(response.data[i].count);break;
                        case 6: temp[6] += parseInt(response.data[i].count);break;
                        case 7: temp[7] += parseInt(response.data[i].count);break;
                        case 8: temp[8] += parseInt(response.data[i].count);break;
                        case 9: temp[9] += parseInt(response.data[i].count);break;
                        case 10: temp[10] += parseInt(response.data[i].count);break;
                        default: console.log("DOSLO JE DO GRESKE")
                    }
				}

                let brigracazivizid = [{brigraca:'0', count: 0},
                    {brigraca:'1', count: 0},
                    {brigraca:'2', count: 0},
                    {brigraca:'3', count: 0},
                    {brigraca:'4', count: 0},
                    {brigraca:'5', count: 0},
                    {brigraca:'6', count: 0},
                    {brigraca:'7', count: 0},
                    {brigraca:'8', count: 0},
                    {brigraca:'9', count: 0},
                    {brigraca:'10', count: 0}, ]

                    for(let i = 0; i < brigracazivizid.length; i++){
                        brigracazivizid[i].count = temp[i];
                    }

                
				
                console.log("STATS ZA BROJ IGRACA ZIVI ZID")
                console.log(brigracazivizid)
				this.setState({brigracazivizid: brigracazivizid})

			})
			.catch(error => {
        		console.log(error)
        		this.setState({errorMsg: 'Error retrieving data'})
			})
    }

	showData = () => {
		let id = this.props.match.params.id
		console.log("showin data")
		if(this.state.godinasezona === null || this.state.godinasezona === -1){
			this.dataSveSezone(id)
		}else{
            this.dataSezona(id)
        }
	}

	render() {
		const { igrac, klubovi, drzave, drzava, errorMsg, kluboviOpcije, sezone} = this.state
		return (
			<div className="container">
                {igrac.nadimakigrac ? <h1>{igrac.nadimakigrac}</h1> : <h1>{igrac.imeigrac} {igrac.prezimeigrac}</h1>}
				<h2>{igrac.pozicija}</h2>
                {errorMsg ? <div>{errorMsg}</div> : null}
				<hr/>
                <h3>Klubovi</h3>
				{klubovi.length ? klubovi.map(klub => 
				<div key={klub.datumodigrazaklub}>
					{klub.nazivtim} {klub.datumodigrazaklub} - {klub.datumdoigrazaklub ? klub.datumdoigrazaklub : " ?"}
					<div className="container">
					</div>
					<hr/>
				</div>) : null}
				<h2>{drzava}</h2>
				Datum rođenja: {igrac.datumrodenjaigrac}
				<br/>
				Preferirana noga: {igrac.jacanoga === 0 ? 'desna' : (igrac.jacanoga === 1 ? 'lijeva' : 'obje')}
				<hr/>
				<div>
                    Sezona:
                    <Select onChange={this.handleSelectSezonaChange}
                    options={this.state.options}
                    defaultValue={this.state.options[0]}/>
					<Button variant='success' onClick={this.showData} type='button'>Izaberi sezonu</Button>
                </div>
                <br/>
				<hr/>
                <Box display="flex" p={1}>
                <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Penali</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{this.state.postotakpenali}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">Strana na koju se bacio</Card.Subtitle>

                    <PieChart
                        data={[
                            { title: "lijevo", value: this.state.stranePenalStats.lijevo, color: '#ff7849' },
                            { title: "sredina", value: this.state.stranePenalStats.sredina, color: '#fbd349' },
                            { title: "desno", value: this.state.stranePenalStats.desno, color: '#bdb5d5' },
                        ]}
						label={({ dataEntry }) => dataEntry.value ? dataEntry.title : ""}
                        labelStyle={(index) => ({
                        fill: '#ffffff',
                        fontSize: '7px',
                        fontFamily: 'sans-serif',
                         })}
                        radius={40}
                        totalValue={this.state.stranePenalStats.lijevo + this.state.stranePenalStats.sredina + this.state.stranePenalStats.desno}
                        />
                </Card.Body>
                </Card>
                <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Udarci</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{this.state.postotakudarci}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">Strana na koju se bacio</Card.Subtitle>
                    <PieChart
                        data={[
                            { title: "lijevo", value: this.state.straneUdaracStats.lijevo, color: '#ff7849' },
                            { title: "sredina", value: this.state.straneUdaracStats.sredina, color: '#fbd349' },
                            { title: "desno", value: this.state.straneUdaracStats.desno, color: '#bdb5d5' },
                        ]}
						label={({ dataEntry }) => dataEntry.value ? dataEntry.title : ""}
                        labelStyle={(index) => ({
                        fill: '#ffffff',
                        fontSize: '7px',
                        fontFamily: 'sans-serif',
                         })}
                        radius={40}
                        totalValue={this.state.straneUdaracStats.lijevo + this.state.straneUdaracStats.sredina + this.state.straneUdaracStats.desno}
                        />
                </Card.Body>
                </Card>
                <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Slobodni udarci</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Postotak obrana: {this.state.postotakslobodni}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">Strana na koju se bacio</Card.Subtitle>

                    <PieChart
                        data={[
                            { title: "lijevo", value: this.state.straneSlobodniStats.lijevo, color: '#ff7849' },
                            { title: "sredina", value: this.state.straneSlobodniStats.sredina, color: '#fbd349' },
                            { title: "desno", value: this.state.straneSlobodniStats.desno, color: '#bdb5d5' },
                        ]}
						label={({ dataEntry }) => dataEntry.value ? dataEntry.title : ""}
                        labelStyle={(index) => ({
                        fill: '#ffffff',
                        fontSize: '7px',
                        fontFamily: 'sans-serif',
                         })}
                        radius={40}
                        totalValue={this.state.straneSlobodniStats.lijevo + this.state.straneSlobodniStats.sredina + this.state.straneSlobodniStats.desno}
                        />
                </Card.Body>
                </Card>
                <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Korneri</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Postotak obrana: {this.state.postotakkorneri}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">Je li izletio</Card.Subtitle>
                    <PieChart
                        data={[
                            { title: "izletio", value: this.state.izletioKornerStats.izletio, color: '#ff7849' },
                            { title: "nije izletio", value: this.state.izletioKornerStats.nijeizletio, color: '#fbd349' },
                        ]}
						label={({ dataEntry }) => dataEntry.value ? dataEntry.title : ""}
                        labelStyle={(index) => ({
                        fill: '#ffffff',
                        fontSize: '7px',
                        fontFamily: 'sans-serif',
                         })}
                        radius={40}
                        totalValue={this.state.izletioKornerStats.izletio + this.state.izletioKornerStats.nijeizletio}
                        />
                </Card.Body>
                </Card>
				</Box>

                <Paper>
        <Chart
          data={this.state.brigracazivizid}
        >
          <ArgumentAxis />
          <ValueAxis max={11} />

          <BarSeries
            valueField="count"
            argumentField="brigraca"
            barWidth={1}
          />
          <Title text="Broj igrača postavljen u živi zid" />
          <Animation />
        </Chart>
      </Paper>
			</div>
		)

    
	}
}

export default GolmanStatistika