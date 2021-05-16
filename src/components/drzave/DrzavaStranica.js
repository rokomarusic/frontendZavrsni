import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import IzmjeniDrzavu from './IzmjeniDrzavu'
import Button from 'react-bootstrap/Button'

class DrzavaStranica extends Component {
	constructor(props) {
		super(props)
	    this.state = {
            nazivtim: '',
            fifakod: '',
            errorMsg: '',
            idtim: '',
            iddrzava: ''
		}
	}

	componentDidMount() {
        console.log(this.props);
        let id = this.props.match.params.id
        console.log("ID " + id)
		axios
			.get('http://localhost:3001/admin/drzava/' + id)
			.then(response => {
				console.log(response)
				this.setState({ nazivtim: response.data.nazivtim,
                                fifakod: response.data.fifakod,
                                idtim: response.data.idtim,
                                iddrzava: response.data.iddrzava})
			})
			.catch(error => {
                console.log(error)
                this.setState({errorMsg: 'Error retrieving data'})
			})
	}

	render() {
		const { nazivtim, fifakod, errorMsg, idtim, iddrzava } = this.state
		return (
			<div>
                <h1>{nazivtim}</h1>
                <h2>{fifakod}</h2>
                <IzmjeniDrzavu id={idtim}/>
                {errorMsg ? <div>{errorMsg}</div> : null}
                <div>
                <Link to={"/admin/gradovi/" + iddrzava +"/?drzava=" + nazivtim}>
                    <Button variant="info" type="button">
                        Pregledaj gradove
                    </Button>
                </Link>
                </div>
                <br/>
                <div>
                <Link to={"/admin/natjecanja/" + iddrzava +"/?drzava=" + nazivtim}>
                    <Button variant="info" type="button">
                        Pregledaj natjecanja
                    </Button>
                </Link>
                </div>
                <br/>
                <div>
                <Link to={"/admin/klubovi/" + iddrzava +"/?drzava=" + nazivtim}>
                    <Button variant="info" type="button">
                        Pregledaj klubove
                    </Button>
                </Link>
                </div>
			</div>
		)
	}
}

export default DrzavaStranica