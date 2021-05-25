import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import NajboljiStrijelciTima from '../igrac/NajboljiStrijelciTima'

class KlubStatistika extends Component {
	constructor(props) {
		super(props)
	    this.state = {
            igraci: [],
			treneri: '',
            errorMsg: '',
            id: null,
            sezona:null,
            klub: null,
		}
	}

	componentDidMount() {
        console.log(this.props.match.params);
        let id = this.props.match.params.id
        let sezona = this.props.location.search.substring(8)
        console.log("ID " + id)
        console.log("SEZONA " + sezona)
        this.setState({id: id})
        this.setState({sezona: sezona})
		axios
			.get('http://localhost:3001/admin/rostertim/' + id + "/?sezona=" + sezona)
			.then(response => {
                console.log("OVDJE IGRACI REPKE")
				console.log(response)
				this.setState({ igraci: response.data})
			})
			.catch(error => {
        console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
			})

        axios
			.get('http://localhost:3001/admin/klub/' + id + "/?sezona=" + sezona)
			.then(response => {
                console.log("OVDJE IGRACI REPKE")
				console.log(response)
				this.setState({ klub: response.data})
			})
			.catch(error => {
        console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
			})

		axios
			.get('http://localhost:3001/admin/trenerisezona/' + id + "/?sezona=" + sezona)
			.then(response => {
				console.log("treneri ovdje")
				console.log(response)
				this.setState({ treneri: response.data})
			})
			.catch(error => {
        console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
			})
	}

	render() {
		const { igraci, treneri, klub } = this.state
		return (
			<div className="container">
                {klub &&<div>
                <h1>{klub.nazivtim} {this.state.sezona}</h1>
                <h2>{klub.nazivgrad}</h2>
                {klub.godosnutka? <h2>{klub.godosnutka}</h2> : null}
                </div>}
                <hr/>
				<h3>Treneri</h3>
				<br/>
				{treneri.length
					? treneri.map(trener => 
                    <div key={trener.idtrener}>
                        {trener.nadimaktrener ? trener.nadimaktrener : trener.imetrener + " " + trener.prezimetrener}
                        <br/>
                        <Link to={"/admin/trener/" + trener.idtrener}>
                            <Button type="button">
                                Pregledaj trenera
                            </Button>
                        </Link>
                    </div>)
          : null}
		  		<hr/>
		  		<br/>
                <h2>Igrači</h2>
				<br/>
				<Table responsive>
                <thead>
                    <tr>
                        <th>igrač</th>
                        <th>pozicija</th>
                        <th>dob</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {igraci.map(igrac => 
                    <tr>
                        <td>{igrac.nadimakigrac ? igrac.nadimakigrac : igrac.imeigrac + " " + igrac.prezimeigrac}</td>
                        <td>{igrac.pozicija}</td>
                        <td>{igrac.dob}</td>
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
          {this.state.id && this.state.sezona && <NajboljiStrijelciTima idtim={this.state.id} sezona={this.state.sezona}/>}
			</div>
		)
	}
}

export default KlubStatistika