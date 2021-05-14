import React, { Component } from 'react'
import axios from 'axios'
import IzmjeniIgraca from './IzmjeniIgraca';
import IzmjeniBoravakUKlubu from './IzmjeniBoravakUKlubu';
import DodajBoravakUKlubu from './DodajBoravakUKlubu';
//import {Link} from 'react-router-dom'


class IgracStranica extends Component {
	constructor(props) {
		super(props)
	    this.state = {
            ime: '',
            igrac: '',
			klubovi: '',
			kluboviOpcije: [],
			drzave:[],
			drzava: '',
			sezone: []
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
        console.log(this.props.match.params);
        let id = this.props.match.params.id
        console.log("ID " + id)
		axios
			.get('http://localhost:3001/admin/igrac/' + id)
			.then(response => {
				console.log(response)
				this.setState({ igrac: response.data })
			})
			.catch(error => {
        console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
			})

		axios
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
			})
		
		axios
			.get('http://localhost:3001/admin/sviklubovi')
			.then(response => {
				console.log(response)
				let temp = []
				let kluboviBaza = response.data
				for(let i = 0; i < kluboviBaza.length; i++){
					temp[i] = {value:"", label:""}
					temp[i].value = kluboviBaza[i].idklub
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
	render() {
		const { igrac, klubovi, drzave, drzava, errorMsg, kluboviOpcije, sezone} = this.state
		return (
			<div>
                {igrac.nadimakigrac ? <h1>{igrac.nadimakigrac}</h1> : <h1>{igrac.imeigrac} {igrac.prezimeigrac}</h1>}
				<h2>{igrac.pozicija}</h2>
                {errorMsg ? <div>{errorMsg}</div> : null}
				<hr/>
				<DodajBoravakUKlubu sezone={sezone} klubovi={kluboviOpcije} idigrac={igrac.idigrac} boravci={klubovi}/>
				<hr/>
				{klubovi.length ? klubovi.map(klub => 
				<div key={klub.datumodigrazaklub}>
					{klub.nazivtim} {klub.datumodigrazaklub} - {klub.datumdoigrazaklub ? klub.datumdoigrazaklub : " ?"}
					<IzmjeniBoravakUKlubu igra_za_klub={klub} sezone={sezone} klubovi={kluboviOpcije} boravci={klubovi}/>
				</div>) : null}
				<h2>{drzava}</h2>
				Datum rođenja: {igrac.datumrodenjaigrac}
				<br/>
				Preferirana noga: {igrac.jacanoga === 0 ? 'desna' : (igrac.jacanoga === 1 ? 'lijeva' : 'obje')}
				<hr/>
				<IzmjeniIgraca igrac={igrac} drzave={drzave}/>
			</div>
		)
	}
}

export default IgracStranica