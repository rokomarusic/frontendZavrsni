import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import DodajGrad from '../grad/DodajGrad'
import DodajUtakmicu from './DodajUtakmicu'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


class UtakmicaUdarci extends Component {
	constructor(props) {
		super(props)

		this.state = {
            udarci: [],
            errorMsg: '',
            filter: '',
            visible: false
		}
	}

	async getRequest(id){
		await axios
			.get('http://localhost:3001/admin/udarci/' + id)
			.then(response => {
                console.log("ajde")
				console.log(response)
                console.log("ajde")
				this.setState({ udarci: response.data})
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
		axios.delete('http://localhost:3001/admin/udarac/'+id)
		  .then(response => { 
              console.log("ajde")
              console.log(response.data)
              console.log("ajde")
            });
	
		this.setState({
		  udarci: this.state.udarci.filter(el => el.idudarac !== id)
		})
	  }

      toggleVisibility= () => {
        this.setState({visible: !this.state.visible})
    }

	render() {
		const { udarci, errorMsg, visible  } = this.state
		return (
			<div>
                <Button variant="info" onClick={this.toggleVisibility}> Pregledaj udarce</Button>
                {visible &&<div className="container">
				{udarci.length
					? udarci.map(udarac => 
                    <div key={udarac.rednibrojuutakmici}>
                        {udarac.minuta}'  izvođač: {udarac.nadimakigrac? udarac.nadimakigrac : udarac.prezimeigrac} golman: {udarac.nadimakgolman? udarac.nadimakgolman : udarac.prezimegolman}  
                        <br/>
                        Gol: {udarac.zabijengol ? "da" : "ne"}  Pogođen okvir: {udarac.pogodjenokvir ? "da" : "ne"}
                        <br/>
						<Button variant="danger" onClick={() => { this.izbrisiDogadaj(udarac.idudarac) }}>
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

export default UtakmicaUdarci