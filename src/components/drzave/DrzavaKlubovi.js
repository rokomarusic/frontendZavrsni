import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import DodajKlub from '../klub/DodajKlub'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


class DrzavaKlubovi extends Component {
	constructor(props) {
		super(props)

		this.state = {
      klubovi: [],
	  kluboviBaza: [],
      errorMsg: '',
	  naziv: '',
	  filter: ''
		}
	}

	isSuperAdmin() {
		const tokenString = sessionStorage.getItem('token');
		const userToken = JSON.parse(tokenString);
		return userToken.authlevel === 1;
	  }

	componentDidMount() {
        console.log(this.props.match.params);
        let id = this.props.match.params.id
		console.log(this.props.location.search.substring(8));
		this.setState({naziv: this.props.location.search.substring(8)});
		
        console.log("ID " + id)
		axios
			.get('http://localhost:3001/admin/drzava/klubovi/' + id)
			.then(response => {
				console.log(response)
				this.setState({ klubovi: [],
								kluboviBaza: response.data })
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
			klubovi: this.state.kluboviBaza.filter(el => el.nazivtim.toLowerCase().includes(this.state.filter.toLowerCase()))
		  })

		  this.setState({
			filter: ''
		  });
	  };

	izbrisiKlub(id) {
		console.log("unutar izbrisi za " + id)
		axios.delete('http://localhost:3001/admin/klub/'+id)
		  .then(response => { console.log(response.data)});
	
		this.setState({
		  klubovi: this.state.klubovi.filter(el => el.idtim !== id)
		})
	  }

	render() {
		const { klubovi, errorMsg, naziv } = this.state
		return (
			<div className="container">
				<h1>{naziv}</h1>
				{this.isSuperAdmin() ? <div>
				<hr/>
                <DodajKlub iddrzava={this.props.match.params.id}/>
				</div>:null}
				<hr/>
				<Form onSubmit={this.handleSubmit}>
					<h2>Pretraži klubove</h2>
					<div>
              			<input
                			type="text"
                			name="filter"
                			placeholder="naziv kluba"
                			onChange={this.handleInputChange}
              			/>
						<div>
							<Button type="submit">Pretraži</Button>
						</div>
            		</div>
				</Form>
				<hr/>
				{klubovi.length
					? klubovi.map(klub => 
                    <div key={klub.idklub}>
                        {klub.nazivtim}
                        <br/>
                        <Link to={"/admin/klub/" + klub.idtim}>
                            <Button type="button">
                                Pregledaj klub
                            </Button>
                        </Link>
						<br/>
						{this.isSuperAdmin() ? <Button variant="danger" onClick={() => { this.izbrisiKlub(klub.idtim) }}>
							Izbriši
						</Button> : null}
                    </div>)
                : null}
        		{errorMsg ? <h1 style={{color: "red"}}>{errorMsg}</h1> : null}
			</div>
		)
	}
}

export default DrzavaKlubovi