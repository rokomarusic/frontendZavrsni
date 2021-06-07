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
	  treneriBaza: [],
	  drzave: undefined,
      errorMsg: '',
	  filterime: ''
		}
	}

	isSuperAdmin() {
		const tokenString = sessionStorage.getItem('token');
		const userToken = JSON.parse(tokenString);
		return userToken.authlevel === 1;
	  }

	componentDidMount() {
		axios
			.get('http://localhost:3001/admin/treneri')
			.then(response => {
				console.log(response)
				this.setState({ treneriBaza: response.data,
								treneri: [] })
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

	  filterIgrace = () =>{


        if(this.state.filterime.trim()){
            
               let temp =  this.state.treneriBaza.filter(el => el.imetrener.toLowerCase().includes(this.state.filterime.toLowerCase()) ||
                el.prezimetrener.toLowerCase().includes(this.state.filterime.toLowerCase()) ||
                ( el.nadimaktrener ? el.nadimaktrener.toLowerCase().includes(this.state.filterime.toLowerCase()) : false))
				
				this.setState({treneri: temp})
        }
    }

    handleInputChange = e => {
		this.setState({
		  [e.target.name]: e.target.value,
		});
	};

	render() {
		const { treneri, errorMsg, drzave} = this.state
		return (
			<div className="container">
				{treneri && <div>
				<h1>treneri</h1>
				 <div>
				 {this.isSuperAdmin() ?<div>
				<hr/>
				<DodajTrenera drzave={drzave}/>
				<hr/>
				</div> : null}
				<h2>Pretaži trenere</h2>
				<br/>
				<div>
				<input
					type="text"
					name="filterime"
					placeholder="naziv trenera"
					onChange={this.handleInputChange}
				/>
				</div>
				<br/>
				<Button className="btn btn-success" type="button" onClick={this.filterIgrace}>
                Prikaži trenere
				</Button>
				<br/>
				<hr/>
				</div>
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
						{this.isSuperAdmin() ? <Button variant="danger" onClick={() => { this.izbrisiTrenera(trener.idtrener) }}>
							Izbriši
						</Button> : null}
                    </div>)
          : null}
		  </div>}
        {errorMsg ? <div>{errorMsg}</div> : null}
			</div>
		)
	}
}

export default Treneri