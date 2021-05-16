import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import IzmjeniUtakmicu from './IzmjeniUtakmicu'
class UtakmicaStranica extends Component {
	constructor(props) {
		super(props)
	    this.state = {
            utakmica: undefined,
            errorMsg: ''
		}
	}

	async awaitGet(id){
		await axios
		.get('http://localhost:3001/admin/utakmica/' + id)
		.then(response => {
			console.log(response)
			this.setState({ utakmica: response.data})
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

	render() {
		const { utakmica, errorMsg } = this.state
		return (
			<div>
				{utakmica &&
				<div>
                <h1>{utakmica.nazivdomacin} - {utakmica.nazivgost}</h1>
                <h2>{utakmica.brgolovadomacin} - {utakmica.brgolovagost} </h2>
				<hr/>
				<IzmjeniUtakmicu utakmica={utakmica}/>
                {errorMsg ? <div>{errorMsg}</div> : null}
				</div>}
			</div>
		)
	}
}

export default UtakmicaStranica