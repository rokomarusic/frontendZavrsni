import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import DodajStadion from '../stadion/DodajStadion'
import IzmjeniStadion from '../stadion/IzmjeniStadion'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

class GradStadioni extends Component {
	constructor(props) {
		super(props)

		this.state = {
            stadioni: [],
			stadioniBaza:[],
            errorMsg: '',
			naziv: ''
		}
	}

	componentDidMount() {
        console.log(this.props.match.params);
        let id = this.props.match.params.id
		console.log(this.props.location.search.substring(6));
		this.setState({naziv: this.props.location.search.substring(6)});
        console.log("ID " + id)
		axios
			.get('http://localhost:3001/admin/stadioni/' + id)
			.then(response => {
				console.log(response)
				this.setState({ stadioniBaza: response.data })
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

	handleSubmit = e => {
		e.preventDefault();
        console.log(this.state.filter)
		this.setState({
			stadioni: this.state.stadioniBaza.filter(el => el.nazivstadion.toLowerCase().includes(this.state.filter.toLowerCase()))
		  })

		  this.setState({
			filter: ''
		  });
	  };

	izbrisiStadion(id) {
		console.log("unutar izbrisi stadion za " + id)
		axios.delete('http://localhost:3001/admin/stadion/'+id)
		  .then(response => { console.log(response.data)});
	
		this.setState({
		  stadioni: this.state.stadioni.filter(el => el.idstadion !== id)
		})
	  }

	render() {
		const { stadioni, errorMsg, naziv } = this.state
		return (
			<div className="container">
				<h1>{naziv}</h1>
				<hr/>
				<h1>Stadioni</h1>
                <DodajStadion idgrad={this.props.match.params.id}/>
				<hr/>
				<Form onSubmit={this.handleSubmit}>
					<h2>Pretraži stadione</h2>
					<div>
              			<input
                			type="text"
                			name="filter"
                			placeholder="naziv stadiona"
                			onChange={this.handleInputChange}
              			/>
						<div>
							<Button type="submit">Pretraži stadione</Button>
						</div>
            		</div>
				</Form>
				<hr/>
				{stadioni.length
					? stadioni.map(stadion => 
                    <div key={stadion.idstadion}>
                        {stadion.nazivstadion}
						<br/>
						<Button variant="danger" onClick={() => { this.izbrisiStadion(stadion.idstadion) }}>
							Izbriši
						</Button>
                        <IzmjeniStadion idstadion={stadion.idstadion} idgrad={stadion.idgrad}/>
                    </div>)
                : null}
        		{errorMsg ? <h1 style={{color: "red"}}>{errorMsg}</h1> : null}
			</div>
		)
	}
}

export default GradStadioni;