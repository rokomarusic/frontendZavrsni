import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import DodajGrad from '../grad/DodajGrad'
import DodajUtakmicu from './DodajUtakmicu'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


class UtakmicaPenali extends Component {
	constructor(props) {
		super(props)

		this.state = {
            penali: [],
            errorMsg: '',
            filter: '',
            visible: false
		}
	}

	async getRequest(id){
		await axios
			.get('http://localhost:3001/admin/penali/' + id)
			.then(response => {
                console.log("ajde")
				console.log(response)
                console.log("ajde")
				this.setState({ penali: response.data})
			})
			.catch(error => {
        console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
			})
	}

	componentDidMount() {
        console.log(this.props);
        let id = this.props.idutakmica
		this.getRequest(id)
        console.log("ID JE JE " + id)
		
	}



	izbrisiDogadaj(id) {
		console.log("unutar izbrisi za " + id)
		axios.delete('http://localhost:3001/admin/penal/'+id)
		  .then(response => { 
              console.log("ajde")
              console.log(response.data)
              console.log("ajde")
            });
	
		this.setState({
		  penali: this.state.penali.filter(el => el.idpenal !== id)
		})
	  }

      toggleVisibility= () => {
        this.setState({visible: !this.state.visible})
    }

	render() {
		const { penali, errorMsg, visible  } = this.state
		return (
			<div>
                <Button variant="info" onClick={this.toggleVisibility}> Pregledaj penale</Button>
                {visible &&<div className="container">
				{penali.length
					? penali.map(penal => 
                    <div key={penal.rednibrojuutakmici}>
                        {penal.minuta}'  izvođač: {penal.nadimakigrac? penal.nadimakigrac : penal.prezimeigrac} golman: {penal.nadimakgolman? penal.nadimakgolman : penal.prezimegolman}  
                        <br/>
                        Gol: {penal.zabijengol ? "da" : "ne"}  Pogođen okvir: {penal.pogodjenokvir ? "da" : "ne"}
                        <br/>
						<Button variant="danger" onClick={() => { this.izbrisiDogadaj(penal.idpenal) }}>
							Izbriši
						</Button>
                        <hr/>
                    </div>
                    )
                : null}
                </div>}
        		{errorMsg ? <h1 style={{color: "red"}}>{errorMsg}</h1> : null}
			</div>
		)
	}
}

export default UtakmicaPenali