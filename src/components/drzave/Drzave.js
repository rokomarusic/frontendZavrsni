import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import DodajDrzavu from './DodajDrzavu'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
class Drzave extends Component {
	constructor(props) {
		super(props)

		this.state = {
      drzave: [],
	  drzaveBaza:[],
	  filter: '',
      errorMsg: ''
		}
	}

	componentDidMount() {
		axios
			.get('http://localhost:3001/admin/drzave')
			.then(response => {
				console.log(response)
				this.setState({ drzave: [],
								drzaveBaza: response.data })
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
	
		this.setState({
			drzave: this.state.drzaveBaza.filter(el => el.nazivtim.toLowerCase().includes(this.state.filter.toLowerCase()))
		  })

		  this.setState({
			filter: ''
		  });
	  };

	izbrisiDrzavu(id) {
		console.log("unutar izbrisi za " + id)
		axios.delete('http://localhost:3001/admin/drzava/'+id)
		  .then(response => { console.log(response.data)});
	
		this.setState({
		  drzave: this.state.drzave.filter(el => el.idtim !== id)
		})
	  }

	render() {
		const { drzave, errorMsg } = this.state
		return (
			<div className="container">
				<h2>Dodaj novu državu</h2>
                <DodajDrzavu/>
				Drzave
				<hr/>
				<Form onSubmit={this.handleSubmit}>
					<h2>Pretraži države</h2>
					<div>
              			<input
                			type="text"
                			name="filter"
                			placeholder="naziv države"
                			onChange={this.handleInputChange}
              			/>
						<div>
							<Button type="submit">Pretraži</Button>
						</div>
            		</div>
				</Form>
				<hr/>
				<ListGroup>
				{drzave.length
					? drzave.map(drzava => 
                    <ListGroup.Item variant="info" key={drzava.iddrzava}>
                        {drzava.nazivtim}
                        <br/>
                        <Link to={"/admin/drzava/" + drzava.idtim}>
                            <Button variant="outline-primary" type="button">
                                Pregledaj drzavu
                            </Button>
                        </Link>
						<br/>
						<Button variant="outline-danger" onClick={() => { this.izbrisiDrzavu(drzava.idtim) }}>
							Izbriši
						</Button>
                    </ListGroup.Item>)
                : null} </ListGroup>
        		{errorMsg ? <h1 style={{color: "red"}}>{errorMsg}</h1> : null}
			</div>
		)
	}
}

export default Drzave