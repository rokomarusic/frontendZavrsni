import React, { Component } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import IzmjeniTrenera from './IzmjeniTrenera'
import DodajPosao from './DodajPosao'
import IzmjeniPosao from './IzmjeniPosao'
//import {Link} from 'react-router-dom'


class TrenerStranica extends Component {
	constructor(props) {
		super(props)
	    this.state = {
            ime: '',
            trener: '',
			boravci:[],
			drzave:[],
			drzava: '',
			sezone: []
		}
	}

	getDrzava(){
		for(let i = 0; i < this.state.drzave.length; i++){
			if(this.state.drzave[i].value === this.state.trener.iddrzava){
				this.setState({drzava: this.state.drzave[i].label});
				return;
			}
		}
		return null;
	}

	componentDidMount() {
        console.log(this.props.match.params);
        let id = this.props.match.params.id
        console.log("ID " + id)
		axios
			.get('http://localhost:3001/admin/trener/' + id)
			.then(response => {
				console.log(response)
				this.setState({ trener: response.data })
			})
			.catch(error => {
        console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
			})
		
		axios
			.get('http://localhost:3001/admin/trenerboravci/' + id)
			.then(response => {
				console.log(response)
				this.setState({ boravci: response.data })
			})
			.catch(error => {
        console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
			})

		/*axios
			.get('http://localhost:3001/admin/igracklubovi/' + id)
			.then(response => {
				console.log(response)
				this.setState({ klubovi: response.data })
				console.log("aaaaa")
				console.log(this.state.klubovi[0])
				console.log("aaaaa")
			})
			.catch(error => {
        		console.log(error)
        		this.setState({errorMsg: 'Error retrieving data'})
			})

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
				this.getDrzava();
				console.log("A111"+this.state.drzava)
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
			})
			.catch(error => {
		console.log(error)
		this.setState({errorMsg: 'Error retrieving data'})
			})*/
		
		axios
			.get('http://localhost:3001/admin/timovi')
			.then(response => {
				console.log(response)
				let temp = []
				let kluboviBaza = response.data
				for(let i = 0; i < kluboviBaza.length; i++){
					temp[i] = {value:"", label:""}
					temp[i].value = kluboviBaza[i].idtim
					temp[i].label = kluboviBaza[i].nazivtim
					console.log(i + " " + temp[i].value + temp[i].label)
				}
				this.setState({kluboviOpcije: temp});
				console.log("B111"+this.state.kluboviOpcije)
			})
			.catch(error => {
		console.log(error)
		this.setState({errorMsg: 'Error retrieving data'})
			})
		
	}

	izbrisiBoravak(boravak) {
		console.log(boravak)
		axios.post('http://localhost:3001/admin/izbrisiposao/', boravak)
		  .then(response => { console.log(response.data)});
	
		this.setState({
		  boravci: this.state.boravci.filter(el => el.idtim !== boravak.idtim
			|| el.idtrener !== boravak.idtrener
			|| el.datumodtrenira !== boravak.datumodtrenira)
		})
	  }

	  isSuperAdmin() {
		const tokenString = sessionStorage.getItem('token');
		const userToken = JSON.parse(tokenString);
		return userToken.authlevel === 1;
	  }

	render() {
		const { trener, errorMsg, boravci, kluboviOpcije} = this.state
		return (
			<div className="container">
                {trener.nadimaktrener ? <h1>{trener.nadimaktrener}</h1> : <h1>{trener.imetrener} {trener.prezimetrener}</h1>}
				<h2>{trener.nazivtim}</h2>
				{this.isSuperAdmin() ? <div>
				<hr/>
				<IzmjeniTrenera trener={trener}/>
				<hr/>
				</div> : null}
				Datum rođenja: {trener.datumrodenjatrener}
				<hr/>
				<h2>Poslovi</h2>
				{this.isSuperAdmin() ? <DodajPosao timovi={kluboviOpcije} idtrener={trener.idtrener} boravci={boravci}/> :null}
				<hr/>
				{boravci.length ? boravci.map(klub => 
				<div key={klub.datumodtrenira}>
					{klub.nazivtim} {klub.datumodtrenira} - {klub.datumdotrenira? klub.datumdotrenira : " ?"}
					{this.isSuperAdmin() ? <div>
					<IzmjeniPosao timovi={kluboviOpcije} trenira={klub} boravci={boravci}/>
					<Button onClick={() => { this.izbrisiBoravak(klub) }} variant="danger">
						Izbriši
					</Button>
					</div> : null}
					<hr/>
				</div>) : null}
				{errorMsg ? <div>{errorMsg}</div> : null}
			</div>
		)
	}
}

export default TrenerStranica