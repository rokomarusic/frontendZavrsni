import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import DodajGrad from '../grad/DodajGrad'
import DodajNatjecanje from '../natjecanje/DodajNatjecanje'


class DrzavaNatjecanja extends Component {
	constructor(props) {
		super(props)

		this.state = {
      natjecanja: [],
      errorMsg: '',
	  naziv: ''
		}
	}

	componentDidMount() {
        console.log(this.props.match.params);
        let id = this.props.match.params.id
		console.log(this.props.location.search.substring(8));
		this.setState({naziv: decodeURI(this.props.location.search.substring(8))});
		
        console.log("ID " + id)
		axios
			.get('http://localhost:3001/admin/drzava/natjecanja/' + id)
			.then(response => {
				console.log(response)
				this.setState({ natjecanja: response.data })
			})
			.catch(error => {
        console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
			})
	}

	izbrisiNatjecanje(id) {
		console.log("unutar izbrisi za " + id)
		axios.delete('http://localhost:3001/admin/natjecanje/'+id)
		  .then(response => { console.log(response.data)});
	
		this.setState({
		  natjecanja: this.state.natjecanja.filter(el => el.idnatjecanje !== id)
		})
	  }

	render() {
		const { natjecanja, errorMsg, naziv } = this.state
		return (
			<div>
				<h1>{naziv}</h1>
				<hr/>
                <DodajNatjecanje iddrzava={this.props.match.params.id}/>
				Natjecanja
				{natjecanja.length
					? natjecanja.map(natjecanje => 
                    <div key={natjecanje.idnatjecanje}>
                        {natjecanje.nazivnatjecanje} {natjecanje.godinasezona}
                        <br/>
                        <Link to={"/admin/natjecanje/" + natjecanje.idnatjecanje}>
                            <button type="button">
                                Pregledaj natjecanje
                            </button>
                        </Link>
						<br/>
						<button onClick={() => { this.izbrisiNatjecanje(natjecanje.idnatjecanje) }}>
							Izbriši
						</button>
                    </div>)
                : null}
        		{errorMsg ? <h1 style={{color: "red"}}>{errorMsg}</h1> : null}
			</div>
		)
	}
}

export default DrzavaNatjecanja