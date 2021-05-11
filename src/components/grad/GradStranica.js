import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import IzmjeniGrad from './IzmjeniGrad'

class GradStranica extends Component {
	constructor(props) {
		super(props)
	    this.state = {
            nazivgrad: '',
            errorMsg: '',
		}
	}

	componentDidMount() {
        console.log(this.props.match.params);
        let id = this.props.match.params.id
        console.log("ID " + id)
		axios
			.get('http://localhost:3001/admin/grad/' + id)
			.then(response => {
				console.log(response)
				this.setState({ nazivgrad: response.data.nazivgrad})
			})
			.catch(error => {
        console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
			})
	}

	render() {
		const { nazivgrad, errorMsg } = this.state
		return (
			<div>
                <h1>{nazivgrad}</h1>
				<hr/>
				<IzmjeniGrad id={this.props.match.params.id}/>
                {errorMsg ? <div>{errorMsg}</div> : null}
				<Link to={"/admin/stadioni/" + this.props.match.params.id +"/?grad=" + nazivgrad}>
                    <button type="button">
                        Pregledaj stadione
                    </button>
                </Link>
			</div>
		)
	}
}

export default GradStranica