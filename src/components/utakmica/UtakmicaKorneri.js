import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import DodajGrad from '../grad/DodajGrad'
import DodajUtakmicu from './DodajUtakmicu'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


class UtakmicaKorneri extends Component {
	constructor(props) {
		super(props)

		this.state = {
            korneri: [],
            errorMsg: '',
            filter: '',
            visible: false
		}
	}

	async getRequest(id){
        console.log("?????????????''")
		await axios
			.get('http://localhost:3001/admin/korneri/' + id)
			.then(response => {
                console.log("dejta")
				console.log(response)
                console.log("dejta")
				this.setState({ korneri: response.data})
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
        console.log("ID " + id)
		
	}



	izbrisiDogadaj(id) {
		console.log("unutar izbrisi za " + id)
		axios.delete('http://localhost:3001/admin/korner/'+id)
		  .then(response => { 
              console.log("ajde")
              console.log(response.data)
              console.log("ajde")
            });
	
		this.setState({
		  korneri: this.state.korneri.filter(el => el.idkorner !== id)
		})
	  }

      toggleVisibility= () => {
        this.setState({visible: !this.state.visible})
        console.log("korner")
    }

	render() {
		const { korneri, errorMsg, visible  } = this.state
		return (
			<div>
                <Button variant="info" onClick={this.toggleVisibility}> Pregledaj kornere</Button>
                {visible &&<div className="container">
				{korneri.length
					? korneri.map(korner => 
                    <div key={korner.rednibrojuutakmici}>
                        {korner.minuta}'  izvođač: {korner.nadimakigrac? korner.nadimakigrac : korner.prezimeigrac} golman: {korner.nadimakgolman? korner.nadimakgolman : korner.prezimegolman}  
                        <br/>
                        Gol: {korner.zabijengol ? "da" : "ne"}  Pogođen okvir: {korner.pogodjenokvir ? "da" : "ne"}
                        <br/>
						<Button variant="danger" onClick={() => { this.izbrisiDogadaj(korner.idkorner) }}>
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

export default UtakmicaKorneri