import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
class Igraci extends Component {
	constructor(props) {
		super(props)

		this.state = {
      igraci: [],
      errorMsg: ''
		}
	}

	componentDidMount() {
		axios
			.get('http://localhost:3001/admin/igraci')
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
			<div>
				Igraci
				{igraci.length
					? igraci.map(igrac => 
                    <div key={igrac.idigrac}>
                        {igrac.imeigrac} {igrac.prezimeigrac}
                        <br/>
                        <Link to={"/admin/igrac/" + igrac.idigrac}>
                            <button type="button">
                                Pregledaj igraca
                            </button>
                        </Link>
                    </div>)
          : null}
        {errorMsg ? <div>{errorMsg}</div> : null}
			</div>
		)
	}
}

export default Igraci