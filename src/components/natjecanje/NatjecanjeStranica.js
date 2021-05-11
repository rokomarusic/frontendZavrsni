import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class NatjecanjeStranica extends Component {
	constructor(props) {
		super(props)
	    this.state = {
            nazivnatjecanje: '',
            godinasezona: '',
            errorMsg: '',
		}
	}

	componentDidMount() {
        console.log(this.props.match.params);
        let id = this.props.match.params.id
        console.log("ID " + id)
		axios
			.get('http://localhost:3001/admin/natjecanje/' + id)
			.then(response => {
				console.log(response)
				this.setState({ nazivnatjecanje: response.data.nazivnatjecanje,
                                godinasezona: response.data.godinasezona})
			})
			.catch(error => {
        console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
			})
	}

	render() {
		const { nazivnatjecanje, godinasezona, errorMsg } = this.state
		return (
			<div>
                <h1>{nazivnatjecanje} {godinasezona}</h1>
				<hr/>
			</div>
		)
	}
}

export default NatjecanjeStranica