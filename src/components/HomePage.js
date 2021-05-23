import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'

class Igraci extends Component {
	constructor(props) {
		super(props)

		this.state = {
      igraci: [],
      errorMsg: '',
	  drzave: []
		}
	}

	componentDidMount() {
		axios
			.get('http://localhost:3001/topstrijelci')
			.then(response => {
				console.log(response)
				this.setState({ igraci: response.data })
			})
			.catch(error => {
        console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
			})
		
	}


	render() {
		const { igraci, errorMsg } = this.state
		return (
			<div className="container">
				<h1>Najbolji strijelci</h1>
                <hr/>
                <Table responsive>
                <thead>
                    <tr>
                        <th>igrač</th>
                        <th>pozicija</th>
                        <th>broj golova</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {igraci.map(igrac => 
                    <tr>
                        <td>{igrac.nadimakigrac ? igrac.nadimakigrac : igrac.imeigrac + " " + igrac.prezimeigrac}</td>
                        <td>{igrac.pozicija}</td>
                        <td>{igrac.brgolova}</td>
                        <td>
                            <Link to={"/admin/igrac/" + igrac.idigrac}>
                            <Button variant="outline-primary" type="button">
                                Pregledaj igraca
                            </Button>
                            </Link>
                        </td>
                    </tr>)}
                </tbody>
          </Table>
        {errorMsg ? <div>{errorMsg}</div> : null}
			</div>
		)
	}
}

export default Igraci