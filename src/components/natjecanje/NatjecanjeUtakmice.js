import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import DodajGrad from '../grad/DodajGrad'


class NatjecanjeUtakmice extends Component {
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
			<div>
				<h1>{naziv}</h1>
				<hr/>
                <DodajGrad iddrzava={this.props.match.params.id}/>
				Gradovi
				<hr/>
				<form onSubmit={this.handleSubmit}>
					<h2>Pretraži gradove</h2>
					<div>
              			<input
                			type="text"
                			name="filter"
                			placeholder="naziv grada"
                			onChange={this.handleInputChange}
              			/>
						<div>
							<button type="submit">Pretraži gradove</button>
						</div>
            		</div>
				</form>
				<hr/>
				{gradovi.length
					? gradovi.map(grad => 
                    <div key={grad.idgrad}>
                        {grad.nazivgrad}
                        <br/>
                        <Link to={"/admin/grad/" + grad.idgrad}>
                            <button type="button">
                                Pregledaj grad
                            </button>
                        </Link>
						<br/>
						<button onClick={() => { this.izbrisiGrad(grad.idgrad) }}>
							Izbriši
						</button>
                    </div>)
                : null}
        		{errorMsg ? <h1 style={{color: "red"}}>{errorMsg}</h1> : null}
			</div>
		)
	}
}

export default NatjecanjeUtakmice