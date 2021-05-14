import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class RosterStranica extends Component {
	constructor(props) {
		super(props)
	    this.state = {
            igraci: '',
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
	}

	render() {
		const { igraci } = this.state
		return (
			<div>
                Igraci
				{igraci.length
					? igraci.map(igrac => 
                    <div key={igrac.idigrac}>
                        {igrac.nadimakigrac ? igrac.nadimakigrac : igrac.imeigrac + " " + igrac.prezimeigrac}
                        <br/>
                        <Link to={"/admin/igrac/" + igrac.idigrac}>
                            <button type="button">
                                Pregledaj igraca
                            </button>
                        </Link>
                    </div>)
          : null}
			</div>
		)
	}
}

export default RosterStranica