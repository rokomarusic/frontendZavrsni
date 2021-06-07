import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import DodajGrad from '../grad/DodajGrad'
import DodajUtakmicu from '../utakmica/DodajUtakmicu'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


class NatjecanjeUtakmice extends Component {
	constructor(props) {
		super(props)

		this.state = {
            utakmice: [],
            utakmiceBaza: [],
            errorMsg: '',
            naziv: '',
            filter: ''
		}
	}

	async getRequest(id){
		await axios
			.get('http://localhost:3001/admin/utakmice/' + id)
			.then(response => {
				console.log(response)
				this.setState({ utakmice: [],
								utakmiceBaza: response.data })
			})
			.catch(error => {
        console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
			})
	}

	componentDidMount() {
        console.log(this.props.match.params);
        let id = this.props.match.params.id
		this.getRequest(id)
        console.log("ID " + id)
		
	}

	handleInputChange = e => {
		this.setState({
		  [e.target.name]: e.target.value,
		});
	};

	handleSubmit = e => {
		e.preventDefault();
	
		this.setState({
			utakmice: this.state.utakmiceBaza.filter(el => el.nazivdomacin.toLowerCase().includes(this.state.filter.toLowerCase())||
						el.nazivgost.toLowerCase().includes(this.state.filter.toLowerCase()))
		  })

		  this.setState({
			filter: ''
		  });
	  };

	izbrisiUtakmicu(id) {
		console.log("unutar izbrisi za " + id)
		axios.delete('http://localhost:3001/admin/utakmica/'+id)
		  .then(response => { console.log(response.data)});
	
		this.setState({
		  utakmice: this.state.utakmiceBaza.filter(el => el.idutakmica !== id)
		})
	  }

	render() {
		const { utakmice, errorMsg, naziv } = this.state
		return (
			<div className="container">
				<h1>{naziv}</h1>
				<DodajUtakmicu idnatjecanje={this.props.match.params.id}/>
				<Form onSubmit={this.handleSubmit}>
					<h2>Pretraži utakmice</h2>
					<div>
              			<input
                			type="text"
                			name="filter"
                			placeholder="naziv tima"
                			onChange={this.handleInputChange}
              			/>
						<div>
							<Button type="submit">Pretraži</Button>
						</div>
            		</div>
				</Form>
				<hr/>
				{utakmice.length
					? utakmice.map(utakmica => 
                    <div key={utakmica.idutakmica}>
						<br/>
                        {utakmica.nazivdomacin} - {utakmica.nazivgost} {utakmica.brgolovadomacin} : {utakmica.brgolovagost}
						{utakmica.kolo ? <p>kolo : {utakmica.kolo}</p> : <p>faza natjecanja: {utakmica.fazanatjecanje}</p>}
                        <Link to={"/admin/utakmica/" + utakmica.idutakmica}>
                            <Button type="button">
                                Pregledaj utakmicu
                            </Button>
                        </Link>
						<br/>
						<Button variant="danger" onClick={() => { this.izbrisiUtakmicu(utakmica.idutakmica) }}>
							Izbriši
						</Button>
						<hr/>
                    </div>)
                : null}
        		{errorMsg ? <h1 style={{color: "red"}}>{errorMsg}</h1> : null}
			</div>
		)
	}
}

export default NatjecanjeUtakmice