import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import IzmjeniKlub from './IzmjeniKlub'
import Select from 'react-select'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


class KlubStranica extends Component {
	constructor(props) {
		super(props)
	    this.state = {
            nazivtim: '',
            godinaosnutka: '',
            errorMsg: '',
            idtim: '',
            idklub: '',
            nazivgrad: '',
			iddrzava: '',
			gradovi:[],
			options:[],
			sezone:[],
			sezoneOptions:[],
			sezona: '',
			showButton: false
		}
	}

	async GetRequest(id){
		await axios
			.get('http://localhost:3001/admin/klub/' + id)
			.then(response => {
				console.log(response)
				this.setState({ nazivtim: response.data.nazivtim,
                                godosnutka: response.data.godinaosnutka,
                                idtim: response.data.idtim,
                                idklub: response.data.idklub,
                                nazivgrad: response.data.nazivgrad,
								iddrzava: response.data.iddrzava})
								console.log("---------")
								console.log(this.state)
								console.log("---------")
			})
			.catch(error => {
                console.log(error)
                this.setState({errorMsg: 'Error retrieving data'})
			})

		await axios
			.get('http://localhost:3001/admin/gradovi/' + this.state.iddrzava)
			.then(response => {
				console.log(response)
				this.setState({ gradovi: response.data});
				console.log(this.state.gradovi)
				let temp = []
			for(let i = 0; i < this.state.gradovi.length; i++){
				temp[i] = {value:"", label:""}
				temp[i].value = this.state.gradovi[i].idgrad
				temp[i].label = this.state.gradovi[i].nazivgrad
				console.log(i + " " + temp[i].value + temp[i].label)
			}
			this.setState({options: temp});
			})
				.catch(error => {
			console.log(error)
			this.setState({errorMsg: 'Error retrieving data'})
				})
			
		await axios
				.get('http://localhost:3001/admin/sezone')
				.then(response => {
					console.log(response)
					this.setState({ sezone: response.data});
					console.log(this.state.sezone)
					let temp = []
					for(let i = 0; i < this.state.sezone.length; i++){
						temp[i] = {value:"", label:""}
						temp[i].value = this.state.sezone[i].godinasezona
						temp[i].label = this.state.sezone[i].godinasezona
						console.log(i + " " + temp[i].value)
					}
					this.setState({sezoneOptions: temp});
					console.log(8888)
					console.log(this.state.sezoneOptions)
					console.log(8888)
				})
				.catch(error => {
			console.log(error)
			this.setState({errorMsg: 'Error retrieving data'})
				})

			
	}
	

	componentDidMount() {
        console.log(this.props);
        let id = this.props.match.params.id
        console.log("ID " + id)
		this.GetRequest(id);
			
	}

	handleSelectChange = (selectedOption) => {
		this.setState({sezona: selectedOption.value});
		console.log("sezona je " + this.state.sezona)
		this.setState({showButton: true})
	  }


	render() {
		const { nazivtim, godosnutka, errorMsg, idtim, nazivgrad, options} = this.state
		return (
			<div className="container">
                <h1>{nazivtim}</h1>
                <h2>{nazivgrad}</h2>
                {godosnutka? <h2>{godosnutka}</h2> : null}
				<IzmjeniKlub id={idtim} gradovi={options}/>
                {errorMsg ? <div>{errorMsg}</div> : null}

				<hr/>
				Pregledaj roster za sezonu:
				<Select onChange={this.handleSelectChange}
              		options={this.state.sezoneOptions}
             		defaultValue={this.state.sezoneOptions[0]}/>
				{this.state.showButton && 
				<Link to={"/admin/roster/" + idtim +"/?sezona=" + this.state.sezona}>
                    <Button type="button">
                            Pregledaj roster
                    </Button>
                </Link>}
			</div>
		)
	}
}

export default KlubStranica