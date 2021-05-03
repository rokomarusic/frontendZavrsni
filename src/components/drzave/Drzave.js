import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import DodajDrzavu from './DodajDrzavu'
class Drzave extends Component {
	constructor(props) {
		super(props)

		this.state = {
      drzave: [],
      errorMsg: ''
		}
	}

	componentDidMount() {
		axios
			.get('http://localhost:3001/admin/drzave')
			.then(response => {
				console.log(response)
				this.setState({ drzave: response.data })
			})
			.catch(error => {
        console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
			})
	}

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
			<div>
				<h2>Dodaj novu državu</h2>
                <DodajDrzavu/>
				Drzave
				{drzave.length
					? drzave.map(drzava => 
                    <div key={drzava.iddrzava}>
                        {drzava.nazivtim}
                        <br/>
                        <Link to={"/admin/drzava/" + drzava.idtim}>
                            <button type="button">
                                Pregledaj drzavu
                            </button>
                        </Link>
						<br/>
						<button onClick={() => { this.izbrisiDrzavu(drzava.idtim) }}>
							Izbriši
						</button>
                    </div>)
                : null}
        		{errorMsg ? <h1 style={{color: "red"}}>{errorMsg}</h1> : null}
			</div>
		)
	}
}

export default Drzave