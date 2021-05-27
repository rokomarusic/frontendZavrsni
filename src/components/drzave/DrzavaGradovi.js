import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import DodajGrad from '../grad/DodajGrad'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


class DrzavaGradovi extends Component {
	constructor(props) {
		super(props)

		this.state = {
      gradovi: [],
	  gradoviBaza: [],
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

	async getRequest(id){
		await axios
			.get('http://localhost:3001/admin/gradovi/' + id)
			.then(response => {
				console.log(response)
				this.setState({ gradovi: [],
								gradoviBaza: response.data })
			})
			.catch(error => {
        console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
			})
	}

	componentDidMount() {
        console.log(this.props.match.params);
        let id = this.props.match.params.id
		console.log(this.props.location.search.substring(8));
		this.setState({naziv: this.props.location.search.substring(8)});
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
			gradovi: this.state.gradoviBaza.filter(el => el.nazivgrad.toLowerCase().includes(this.state.filter.toLowerCase()))
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
		const { gradovi, errorMsg, naziv } = this.state
		return (
			<div className="container">
				<h1>{naziv}</h1>
				{this.isSuperAdmin() ? <div>
				<hr/>
                <DodajGrad iddrzava={this.props.match.params.id}/>
				<hr/>
				</div>:null}
				<Form onSubmit={this.handleSubmit}>
					<h2>Pretraži gradove</h2>
					<div>
              			<input
                			type="text"
                			name="filter"
                			placeholder="naziv grada"
                			onChange={this.handleInputChange}
              			/>
						<div>
							<Button type="submit">Pretraži gradove</Button>
						</div>
            		</div>
				</Form>
				<hr/>
				{gradovi.length
					? gradovi.map(grad => 
                    <div key={grad.idgrad}>
                        {grad.nazivgrad}
                        <br/>
                        <Link to={"/admin/grad/" + grad.idgrad}>
                            <Button type="button">
                                Pregledaj grad
                            </Button>
                        </Link>
						<br/>
						{this.isSuperAdmin() ? <Button variant="danger" onClick={() => { this.izbrisiGrad(grad.idgrad) }}>
							Izbriši
						</Button> : null}
                    </div>)
                : null}
        		{errorMsg ? <h1 style={{color: "red"}}>{errorMsg}</h1> : null}
			</div>
		)
	}
}

export default DrzavaGradovi