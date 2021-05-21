import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

class RosterStranica extends Component {
	constructor(props) {
		super(props)
	    this.state = {
            igraci: '',
			treneri: '',
            errorMsg: '',
		}
	}

	componentDidMount() {
        console.log(this.props.match.params);
        let id = this.props.match.params.id

        let sezona = this.props.location.search.substring(8)
        console.log("ID " + id)
        console.log("SEZONA " + sezona)
		axios
			.get('http://localhost:3001/admin/roster/' + id + "/?sezona=" + sezona)
			.then(response => {
				console.log(response)
				this.setState({ igraci: response.data})
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
		const { igraci, treneri } = this.state
		return (
			<div className="container">
				<h2>Treneri</h2>
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
				{igraci.length
					? igraci.map(igrac => 
                    <div key={igrac.idigrac}>
                        {igrac.nadimakigrac ? igrac.nadimakigrac : igrac.imeigrac + " " + igrac.prezimeigrac}
                        <br/>
                        <Link to={"/admin/igrac/" + igrac.idigrac}>
                            <Button type="button">
                                Pregledaj igraca
                            </Button>
                        </Link>
                    </div>)
          : null}
			</div>
		)
	}
}

export default RosterStranica