import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import NajboljiStrijelciTima from '../igrac/NajboljiStrijelciTima'
import DrzavaDogadaji from './DrzavaDogadaji'

class DrzavaStatistika extends Component {
	constructor(props) {
		super(props)
	    this.state = {
            igraci: [],
			treneri: '',
            errorMsg: '',
            id: null,
            sezona:null,
            drzava:null,
            brgolovadoma: null,
            brgolovagost: null,
            posjecenost: null,
		}
	}

	componentDidMount() {
        console.log(this.props.match.params);
        let id = this.props.match.params.id
        let sezona = this.props.location.search.substring(8)
        console.log("ID " + id)
        console.log("SEZONA " + sezona)
        this.setState({id: id})
        this.setState({sezona: sezona})

        axios
			.get('http://localhost:3001/drzavaroster/' + id + "/?sezona=" + sezona)
			.then(response => {
                console.log("OVDJE IGRACI REPKE")
				console.log(response)
				this.setState({ igraci: response.data})
			})
			.catch(error => {
        console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
		})

		axios
			.get('http://localhost:3001/admin/drzava/' + id)
			.then(response => {
                console.log("OVDJE IGRACI REPKE")
				console.log(response)
				this.setState({ drzava: response.data})
			})
			.catch(error => {
        console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
			})


		axios
			.get('http://localhost:3001/admin/trenerisezona/' + id + "/?sezona=" + sezona)
			.then(response => {
				console.log("treneri ovdje")
				console.log(response)
				this.setState({ treneri: response.data})
			})
			.catch(error => {
        console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
			})
            axios
			.get('http://localhost:3001/brgolovadomasezona/' + id + "/?sezona=" + sezona)
			.then(response => {
				console.log("treneri ovdje")
				console.log(response)
				this.setState({ brgolovadoma: response.data.sum})
			})
			.catch(error => {
        console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
			})

        axios
			.get('http://localhost:3001/brgolovagostsezona/' + id + "/?sezona=" + sezona)
			.then(response => {
				console.log("treneri ovdje")
				console.log(response)
				this.setState({ brgolovagost: response.data.sum})
			})
			.catch(error => {
        console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
			})

        axios
			.get('http://localhost:3001/avgposjecenost/' + id + "/?sezona=" + sezona)
			.then(response => {
				console.log("treneri ovdje")
				console.log(response)
				this.setState({ posjecenost: response.data.avg})
			})
			.catch(error => {
        console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
			})
	}

	render() {
		const { igraci, treneri, drzava, sezona } = this.state
		return (
			<div className="container">
                {drzava && <h1>{drzava.nazivtim} {sezona}</h1>}
                {drzava && <h2>{drzava.fifakod}</h2>}
                <hr/>
                {this.state.brgolovadoma && <p>Broj golova doma u sezoni: {this.state.brgolovadoma}</p>}
                {this.state.brgolovagost && <p>Broj golova u gostima u sezoni: {this.state.brgolovagost}</p>}
                {this.state.posjecenost && <p>Prosječna posjećenost na utakmicama: {Math.round(this.state.posjecenost)}</p>}
                <hr/>
				<h2>Treneri</h2>
				<br/>
				{treneri.length
					? treneri.map(trener => 
                    <div key={trener.idtrener}>
                        {trener.nadimaktrener ? trener.nadimaktrener : trener.imetrener + " " + trener.prezimetrener}
                        <br/>
                        <Link to={"/trener/" + trener.idtrener}>
                            <Button type="button">
                                Pregledaj trenera
                            </Button>
                        </Link>
                    </div>)
          : null}
		  		<hr/>
		  		<br/>
                <h2>Igrači</h2>
				<br/>
				<Table responsive>
                <thead>
                    <tr>
                        <th>igrač</th>
                        <th>pozicija</th>
                        <th>dob</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {igraci.map(igrac => 
                    <tr>
                        <td>{igrac.nadimakigrac ? igrac.nadimakigrac : igrac.imeigrac + " " + igrac.prezimeigrac}</td>
                        <td>{igrac.pozicija}</td>
                        <td>{igrac.dob}</td>
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
          {this.state.id && this.state.sezona && <NajboljiStrijelciTima idtim={this.state.id} sezona={this.state.sezona} jeklub={0}/>}
          {this.state.drzava && <DrzavaDogadaji idtim={this.state.drzava.idtim} iddrzava={this.state.drzava.iddrzava} sezona={this.state.sezona}/> }
            </div>
		)
	}
}

export default DrzavaStatistika