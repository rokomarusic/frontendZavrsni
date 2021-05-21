import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import DodajTrenera from './DodajTrenera'

class Treneri extends Component {
	constructor(props) {
		super(props)

		this.state = {
      treneri: undefined,
	  drzave: undefined,
      errorMsg: '',
		}
	}

	componentDidMount() {
		axios
			.get('http://localhost:3001/admin/treneri')
			.then(response => {
				console.log(response)
				this.setState({ treneri: response.data })
			})
			.catch(error => {
        console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
			})

		
			axios
			.get('http://localhost:3001/admin/drzave')
			.then(response => {
				console.log(response)
				let temp = []
				let drzaveBaza = response.data
				for(let i = 0; i < drzaveBaza.length; i++){
					temp[i] = {value:"", label:""}
					temp[i].value = drzaveBaza[i].iddrzava
					temp[i].label = drzaveBaza[i].nazivtim
					console.log(i + " " + temp[i].value + temp[i].label)
				}
				this.setState({drzave: temp});
				console.log("A111"+this.state.drzava)
			})
			.catch(error => {
        		console.log(error)
        		this.setState({errorMsg: 'Error retrieving data'})
			})


		
	}

	izbrisiTrenera(id) {
		console.log("unutar izbrisi za " + id)
		axios.delete('http://localhost:3001/admin/trener/'+id)
		  .then(response => { console.log(response.data)});
	
		this.setState({
		  treneri: this.state.treneri.filter(el => el.idtrener !== id)
		})
	  }

	render() {
		const { treneri, errorMsg, drzave} = this.state
		return (
			<div className="container">
				{treneri && <div>
				<h1>treneri</h1>
				<hr/>
				<DodajTrenera drzave={drzave}/>
				<hr/>
				{treneri.length
					? treneri.map(trener => 
                    <div key={trener.idtrener}>
                        {trener.nadimaktrener? trener.nadimaktrener : trener.imetrener + " " + trener.prezimetrener}
                        <br/>
                        <Link to={"/admin/trener/" + trener.idtrener}>
                            <Button type="button">
                                Pregledaj trenera
                            </Button>
							</Link>
						<br/>
						<Button variant="danger" onClick={() => { this.izbrisiTrenera(trener.idtrener) }}>
							Izbriši
						</Button>
                    </div>)
          : null}
		  </div>}
        {errorMsg ? <div>{errorMsg}</div> : null}
			</div>
		)
	}
}

export default Treneri