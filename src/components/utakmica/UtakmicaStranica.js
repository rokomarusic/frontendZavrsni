import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import IzmjeniUtakmicu from './IzmjeniUtakmicu'
import DodajPenal from './DodajPenal'
import DodajKorner from './DodajKorner'
import DodajUdarac from './DodajUdarac'
import DodajSlobodanUdarac from './DodajSlobodanUdarac'
class UtakmicaStranica extends Component {
	constructor(props) {
		super(props)
	    this.state = {
            utakmica: undefined,
            errorMsg: '',
			datum: ''
		}
	}

	async awaitGet(id){
		await axios
		.get('http://localhost:3001/admin/utakmica/' + id)
		.then(response => {
			console.log(response)
			this.setState({ utakmica: response.data})
			let tempDatum = this.prikaziDatum(this.state.utakmica.datumutakmica)
			console.log(tempDatum)
			this.setState({datum: tempDatum})
		})
		.catch(error => {
	console.log(error)
	this.setState({errorMsg: 'Error retrieving data'})
		})
	}

	componentDidMount() {
        console.log(this.props.match.params);
        let id = this.props.match.params.id
        console.log("ID " + id)
		this.awaitGet(id)
	}

	prikaziDatum = (datum) => {
		let temp = new Date(datum);
		return temp.getUTCDay + "/" + temp.getUTCMonth + "/" + temp.getUTCFullYear
	}

	render() {
		const { utakmica, errorMsg, datum } = this.state
		return (
			<div className="container">
				{utakmica &&
				<div>
                <h1>{utakmica.nazivdomacin} - {utakmica.nazivgost}</h1>
                <h2>{utakmica.brgolovadomacin} - {utakmica.brgolovagost} </h2>
				<hr/>
				<IzmjeniUtakmicu utakmica={utakmica}/>
				<hr/>
				<div>
				<DodajKorner utakmica={utakmica}/>
				</div>
				<br/>
				<div>
				<DodajPenal utakmica={utakmica}/>
				</div>
				<br/>
				<div>
				<DodajUdarac utakmica={utakmica}/>
				</div>
				<br/>
				<div>
				<DodajSlobodanUdarac utakmica={utakmica}/>
				</div>
				<br/>
                {errorMsg ? <div>{errorMsg}</div> : null}
				</div>}
			</div>
		)
	}
}

export default UtakmicaStranica