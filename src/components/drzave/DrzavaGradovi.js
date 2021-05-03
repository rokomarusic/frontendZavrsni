import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import DodajGrad from '../grad/DodajGrad'
class DrzavaGradovi extends Component {
	constructor(props) {
		super(props)

		this.state = {
      gradovi: [],
      errorMsg: ''
		}
	}

	componentDidMount() {
        console.log(this.props.match.params);
        let id = this.props.match.params.id
        console.log("ID " + id)
		axios
			.get('http://localhost:3001/admin/drzava/gradovi/' + id)
			.then(response => {
				console.log(response)
				this.setState({ gradovi: response.data })
			})
			.catch(error => {
        console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
			})
	}

	izbrisiGrad(id) {
		console.log("unutar izbrisi za " + id)
		axios.delete('http://localhost:3001/admin/grad/'+id)
		  .then(response => { console.log(response.data)});
	
		this.setState({
		  gradovi: this.state.gradovi.filter(el => el.idgrad !== id)
		})
	  }

	render() {
		const { gradovi, errorMsg } = this.state
		return (
			<div>
                <DodajGrad iddrzava={this.props.match.params.id}/>
				Gradovi
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

export default DrzavaGradovi