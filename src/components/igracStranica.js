import React, { Component } from 'react'
import axios from 'axios'
//import {Link} from 'react-router-dom'

class IgracStranica extends Component {
	constructor(props) {
		super(props)
	    this.state = {
            ime: '',
            prezime: '',
            errorMsg: ''
		}
	}

	componentDidMount() {
        console.log(this.props.match.params);
        let id = this.props.match.params.id
        console.log("ID " + id)
		axios
			.get('http://localhost:3001/admin/igrac/' + id)
			.then(response => {
				console.log(response)
				this.setState({ ime: response.data.imeigrac,
                                prezime: response.data.prezimeigrac })
			})
			.catch(error => {
        console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
			})
	}

	render() {
		const { ime, prezime, errorMsg } = this.state
		return (
			<div>
                <h1>IGRAC</h1>
                {ime} {prezime}
                {errorMsg ? <div>{errorMsg}</div> : null}
			</div>
		)
	}
}

export default IgracStranica