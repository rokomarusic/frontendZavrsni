import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import DodajIgraca from './DodajIgraca'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

class Igraci extends Component {
	constructor(props) {
		super(props)

		this.state = {
      igraci: [],
      errorMsg: '',
	  drzave: []
		}
	}

	componentDidMount() {
		axios
			.get('http://localhost:3001/admin/igraci')
			.then(response => {
				console.log(response)
				this.setState({ igraci: response.data })
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

	izbrisiIgraca(id) {
		console.log("unutar izbrisi za " + id)
		axios.delete('http://localhost:3001/admin/igrac/'+id)
		  .then(response => { console.log(response.data)});
	
		this.setState({
		  igraci: this.state.igraci.filter(el => el.idigrac !== id)
		})
	  }

	render() {
		const { igraci, errorMsg } = this.state
		return (
			<div className="container">
				<h1>Igraci</h1>
				<hr/>
				<DodajIgraca drzave={this.state.drzave}/>
				<hr/>
				{igraci.length
					? igraci.map(igrac => 
                    <div key={igrac.idigrac}>
                        {igrac.nadimakigrac ? igrac.nadimakigrac : igrac.imeigrac + " " + igrac.prezimeigrac}
                        <br/>
                        <Link to={"/admin/igrac/" + igrac.idigrac}>
                            <Button type="button">
                                Pregledaj igraca
                            </Button>
							</Link>
						<br/>
						<Button variant="danger" onClick={() => { this.izbrisiIgraca(igrac.idigrac) }}>
							Izbriši
						</Button>
                    </div>)
          : null}
        {errorMsg ? <div>{errorMsg}</div> : null}
			</div>
		)
	}
}

export default Igraci