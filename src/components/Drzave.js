import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import DodajDrzavu from './DodajDrzavu'
class Drzave extends Component {
	constructor(props) {
		super(props)

		this.state = {
      drzave: [],
      errorMsg: ''
		}
	}

	componentDidMount() {
		axios
			.get('http://localhost:3001/admin/drzave')
			.then(response => {
				console.log(response)
				this.setState({ drzave: response.data })
			})
			.catch(error => {
        console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
			})
	}

	render() {
		const { drzave, errorMsg } = this.state
		return (
			<div>
                <DodajDrzavu/>
				Drzave
				{drzave.length
					? drzave.map(drzava => 
                    <div key={drzava.iddrzava}>
                        {drzava.nazivtim}
                        <br/>
                        <Link to={"/admin/igrac/" + drzava.iddrzava}>
                            <button type="button">
                                Pregledaj drzavu
                            </button>
                        </Link>
                    </div>)
                : null}
        {errorMsg ? <p style={{color: "red"}}>{errorMsg}</p> : null}
			</div>
		)
	}
}

export default Drzave