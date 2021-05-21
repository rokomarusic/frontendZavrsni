import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import DodajGrad from '../grad/DodajGrad'
import DodajUtakmicu from './DodajUtakmicu'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


class UtakmicaSlobodniUdarci extends Component {
	constructor(props) {
		super(props)

		this.state = {
            slobodniudarci: [],
            errorMsg: '',
            filter: '',
            visible: false
		}
	}

	async getRequest(id){
		await axios
			.get('http://localhost:3001/admin/slobodni/' + id)
			.then(response => {
                console.log("ajde")
				console.log(response)
                console.log("ajde")
				this.setState({ slobodniudarci: response.data})
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
		axios.delete('http://localhost:3001/admin/slobodni/'+id)
		  .then(response => { 
              console.log("ajde")
              console.log(response.data)
              console.log("ajde")
            });
	
		this.setState({
		  slobodniudarci: this.state.slobodniudarci.filter(el => el.idslobodni !== id)
		})
	  }

      toggleVisibility= () => {
        this.setState({visible: !this.state.visible})
    }

	render() {
		const { slobodniudarci, errorMsg, visible  } = this.state
		return (
			<div>
                <Button variant="info" onClick={this.toggleVisibility}> Pregledaj slobodne udarce</Button>
                {visible &&<div className="container">
				{slobodniudarci.length
					? slobodniudarci.map(slobodni => 
                    <div key={slobodni.rednibrojuutakmici}>
                        {slobodni.minuta}'  izvođač: {slobodni.nadimakigrac? slobodni.nadimakigrac : slobodni.prezimeigrac} golman: {slobodni.nadimakgolman? slobodni.nadimakgolman : slobodni.prezimegolman}  
                        <br/>
                        Gol: {slobodni.zabijengol ? "da" : "ne"}  Pogođen okvir: {slobodni.pogodjenokvir ? "da" : "ne"}
                        <br/>
						<Button variant="danger" onClick={() => { this.izbrisiDogadaj(slobodni.idslobodni) }}>
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

export default UtakmicaSlobodniUdarci