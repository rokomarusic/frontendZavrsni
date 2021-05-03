import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import DodajStadion from '../stadion/DodajStadion'
import IzmjeniStadion from '../stadion/IzmjeniStadion'
class GradStadioni extends Component {
	constructor(props) {
		super(props)

		this.state = {
            stadioni: [],
            errorMsg: '',
		}
	}

	componentDidMount() {
        console.log(this.props.match.params);
        let id = this.props.match.params.id
        console.log("ID " + id)
		axios
			.get('http://localhost:3001/admin/stadioni/' + id)
			.then(response => {
				console.log(response)
				this.setState({ stadioni: response.data })
			})
			.catch(error => {
        console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
			})
	}

	izbrisiStadion(id) {
		console.log("unutar izbrisi stadion za " + id)
		axios.delete('http://localhost:3001/admin/stadion/'+id)
		  .then(response => { console.log(response.data)});
	
		this.setState({
		  stadioni: this.state.stadioni.filter(el => el.idstadion !== id)
		})
	  }

	render() {
		const { stadioni, errorMsg } = this.state
		return (
			<div>
				<h1>Stadioni</h1>
                <DodajStadion idgrad={this.props.match.params.id}/>
				{stadioni.length
					? stadioni.map(stadion => 
                    <div key={stadion.idstadion}>
                        {stadion.nazivstadion}
						<br/>
						<button onClick={() => { this.izbrisiStadion(stadion.idstadion) }}>
							Izbriši
						</button>
                        <IzmjeniStadion idstadion={stadion.idstadion} idgrad={stadion.idgrad}/>
                    </div>)
                : null}
        		{errorMsg ? <h1 style={{color: "red"}}>{errorMsg}</h1> : null}
			</div>
		)
	}
}

export default GradStadioni;