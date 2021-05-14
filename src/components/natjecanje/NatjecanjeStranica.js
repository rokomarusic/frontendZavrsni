import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import DodajSudionika from './DodajSudionika'

class NatjecanjeStranica extends Component {
	constructor(props) {
		super(props)
	    this.state = {
            nazivnatjecanje: '',
            godinasezona: '',
            errorMsg: '',
			sudionici: [],
			sudioniciBaza: [],
			iddrzava: '',
			filter: ''
		}
	}

	componentDidMount() {
        console.log(this.props.match.params);
        let id = this.props.match.params.id
        console.log("ID " + id)
		axios
			.get('http://localhost:3001/admin/natjecanje/' + id)
			.then(response => {
				console.log("ovo je response")
				console.log(response)
				this.setState({ nazivnatjecanje: response.data.nazivnatjecanje,
                                godinasezona: response.data.godinasezona,
								iddrzava: response.data.iddrzava})
			})
			.catch(error => {
        console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
			})
		
		axios
			.get('http://localhost:3001/admin/sudionici/' + id)
			.then(response => {
				console.log(response)
				this.setState({ sudioniciBaza: response.data})
			})
			.catch(error => {
        console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
			})

		console.log("5 " + this.state.iddrzava)
	}

	izbrisiSudionika(idtim) {
		console.log("unutar izbrisi sudionika za " + idtim)
		let idnatjecanje = this.props.match.params.id
		let podaci = {
			idtim,
			idnatjecanje
		}
		axios.post('http://localhost:3001/admin/uklonisudionika/', podaci)
		  .then(response => { console.log(response.data)});
	
		this.setState({
		  sudionici: this.state.sudionici.filter(el => el.idtim !== idtim)
		})
	  }

	handleInputChange = e => {
		this.setState({
		  [e.target.name]: e.target.value,
		});
	};

	handleSubmit = e => {
		e.preventDefault();
        console.log(this.state.filter)
		if(this.state.filter){
			this.setState({
				sudionici: this.state.sudioniciBaza.filter(el => el.nazivtim.toLowerCase().includes(this.state.filter.toLowerCase()))
			})
		}

	  };

	render() {
		const { nazivnatjecanje, godinasezona, sudionici, iddrzava, errorMsg } = this.state
		return (
			<div>
                <h1>{nazivnatjecanje} {godinasezona}</h1>
				<hr/>
				<h2>Sudionici</h2>
				<DodajSudionika idnatjecanje={this.props.match.params.id}/>
				<form onSubmit={this.handleSubmit}>
					<h2>Pretraži sudionike</h2>
					<div>
              			<input
                			type="text"
                			name="filter"
                			placeholder="naziv kluba"
                			onChange={this.handleInputChange}
              			/>
						<div>
							<button type="submit">Pretraži</button>
						</div>
            		</div>
				</form>
				{sudionici.length
					? sudionici.map(sudionik => 
                    <div key={sudionik.idtim}>
                        {sudionik.nazivtim}
						<br/>
						<button onClick={() => { this.izbrisiSudionika(sudionik.idtim) }}>
							Ukloni iz natjecanja
						</button>
                    </div>)
                : null}

				<Link to={"/admin/utakmice/" + iddrzava +"/?drzava=nazivtim"}>
                    <button type="button">
                        Pregledaj utakmice
                    </button>
                </Link>
			</div>
		)
	}
}

export default NatjecanjeStranica