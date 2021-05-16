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
			utakmice: this.state.utakmiceBaza.filter(el => el.nazivdomacin.toLowerCase().includes(this.state.filter.toLowerCase()))
		  })

		  this.setState({
			filter: ''
		  });
	  };

	izbrisiGrad(id) {
		console.log("unutar izbrisi za " + id)
		axios.delete('http://localhost:3001/admin/grad/'+id)
		  .then(response => { console.log(response.data)});
	
		this.setState({
		  gradovi: this.state.gradoviBaza.filter(el => el.idgrad !== id)
		})
	  }

	render() {
		const { utakmice, errorMsg, naziv } = this.state
		return (
			<div>
				<h1>{naziv}</h1>
				<DodajUtakmicu idnatjecanje={this.props.match.params.id}/>
				<Form onSubmit={this.handleSubmit}>
					<h2>Pretraži utakmice</h2>
					<div>
              			<input
                			type="text"
                			name="filter"
                			placeholder="naziv domaćina"
                			onChange={this.handleInputChange}
              			/>
						<div>
							<button type="submit">Pretraži</button>
						</div>
            		</div>
				</Form>
				<hr/>
				{utakmice.length
					? utakmice.map(utakmica => 
                    <div key={utakmica.idutakmica}>
                        {utakmica.nazivdomacin} - {utakmica.nazivgost} {utakmica.brgolovadomacin} : {utakmica.brgolovagost}
                        <br/>
                        <Link to={"/admin/utakmica/" + utakmica.idutakmica}>
                            <Button type="button">
                                Pregledaj utakmicu
                            </Button>
                        </Link>
						<br/>
						<Button variant="danger" onClick={() => { this.izbrisiGrad(utakmica.idutakmica) }}>
							Izbriši
						</Button>
                    </div>)
                : null}
        		{errorMsg ? <h1 style={{color: "red"}}>{errorMsg}</h1> : null}
			</div>
		)
	}
}

export default NatjecanjeUtakmice