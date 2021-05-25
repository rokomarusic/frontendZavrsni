import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Select from 'react-select'
import Table from 'react-bootstrap/Table'

const opcijeUdarac = [
    {value:0, label:'svi udarci'},
    {value:1, label:'penali'},
    {value:2, label:'slobodni udarci'}
  ]

class NajboljiStrijelciTima extends Component {
	constructor(props) {
		super(props)

		this.state = {
      igraci: [],
      errorMsg: '',
	  drzave: [],
      sezone:[],
      options: [],
      godinasezona: null,
      natjecanje: null,
      natjecanja: [],
      natjecanjaOpcije:[],
      topstrijelci:[],
      vrstadogadaja: null
		}
	}

	componentDidMount() {
		axios
			.get('http://localhost:3001/najboljistrijelcitima/' + this.props.idtim + "/?sezona=" + this.props.sezona)
			.then(response => {
				console.log(response)
				this.setState({ igraci: response.data})
			})
			.catch(error => {
        console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
			})
	}


	render() {
		const { igraci, errorMsg } = this.state
		return (
			<div>
                <h2>Najbolji strijelci</h2>
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
                    <tr key={igrac.idigrac}>
                        <td>{igrac.nadimakigrac ? igrac.nadimakigrac : igrac.imeigrac + " " + igrac.prezimeigrac}</td>
                        <td>{igrac.pozicija}</td>
                        <td>{igrac.brgolovakorner? (igrac.brgolova - igrac.brgolovakorner) : igrac.brgolova}</td>
                        <td>
                            <Link to={"/igrac/" + igrac.idigrac}>
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

export default NajboljiStrijelciTima