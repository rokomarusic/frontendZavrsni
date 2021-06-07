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
	  igraciBaza: [],
      errorMsg: '',
	  drzave: [],
	  filterime: ''
		}
	}

	componentDidMount() {
		axios
			.get('http://localhost:3001/admin/igraci')
			.then(response => {
				console.log(response)
				this.setState({ igraciBaza: response.data,
								igraci: [] })
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

	  isSuperAdmin() {
		const tokenString = sessionStorage.getItem('token');
		const userToken = JSON.parse(tokenString);
		return userToken.authlevel === 1;
	  }

	  filterIgrace = () =>{


        if(this.state.filterime.trim()){
            
               let temp =  this.state.igraciBaza.filter(el => el.imeigrac.toLowerCase().includes(this.state.filterime.toLowerCase()) ||
                el.prezimeigrac.toLowerCase().includes(this.state.filterime.toLowerCase()) ||
                ( el.nadimakigrac ? el.nadimakigrac.toLowerCase().includes(this.state.filterime.toLowerCase()) : false))
				
				this.setState({igraci: temp})
        }
    }

    handleInputChange = e => {
		this.setState({
		  [e.target.name]: e.target.value,
		});
	};

	render() {
		const { igraci, errorMsg } = this.state
		return (
			<div className="container">
				<h1>Igrači</h1>
				 <div>
				 {this.isSuperAdmin() ?<div>
				<hr/>
				<DodajIgraca drzave={this.state.drzave}/>
				<hr/>
				</div>
				:null}
				<h2>Pretraži igrače</h2>
				<br/>
				<div>
				<input
					type="text"
					name="filterime"
					placeholder="naziv igrača"
					onChange={this.handleInputChange}
				/>
				</div>
				<br/>
				<Button className="btn btn-success" type="button" onClick={this.filterIgrace}>
                Prikaži igrače
				</Button>
					<br/>
					<hr/>
					</div>
				{igraci.length
					? igraci.map(igrac => 
                    <div key={igrac.idigrac}>
                        {igrac.nadimakigrac ? igrac.nadimakigrac : igrac.imeigrac + " " + igrac.prezimeigrac}
                        <br/>
                        <Link to={"/admin/igrac/" + igrac.idigrac}>
                            <Button type="button">
                                Pregledaj igrača
                            </Button>
							</Link>
						<br/>
						{this.isSuperAdmin() ? <Button variant="danger" onClick={() => { this.izbrisiIgraca(igrac.idigrac) }}>
							Izbriši
						</Button> : null}
                    </div>)
          : null}
        {errorMsg ? <div>{errorMsg}</div> : null}
			</div>
		)
	}
}

export default Igraci