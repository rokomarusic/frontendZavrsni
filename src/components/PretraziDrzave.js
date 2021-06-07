import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Select from 'react-select'

class PretraziDrzave extends Component {
	constructor(props) {
		super(props)

		this.state = {
      drzave: [],
	  drzaveBaza:[],
	  filter: '',
      errorMsg: '',
      sezone:[],
      options:[],
      godinasezona:null,
		}
	}

    handleSelectSezonaChange = (selectedOption) => {
        this.setState({godinasezona: selectedOption.value});
    }

	componentDidMount() {
		axios
			.get('http://localhost:3001/admin/drzave')
			.then(response => {
				console.log(response)
				this.setState({ drzave: [],
								drzaveBaza: response.data })
			})
			.catch(error => {
        console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
			})

        axios
			.get('http://localhost:3001/admin/sezone')
			.then(response => {
				this.setState({ sezone: response.data});
                console.log(this.state.sezone)
                let temp = []
                for(let i = 0; i < this.state.sezone.length; i++){
                    temp[i] = {value:"", label:""}
                    temp[i].value = this.state.sezone[i].godinasezona
                    temp[i].label = this.state.sezone[i].godinasezona
                    console.log(i + " " + temp[i].value)
                }
                this.setState({options: temp});
			})
			.catch(error => {
		console.log(error)
		this.setState({errorMsg: 'Error retrieving data'})
			})
	}

	handleInputChange = e => {
		this.setState({
		  [e.target.name]: e.target.value,
		});
	};

	handleSubmit = e => {
		e.preventDefault();

        if(this.state.godinasezona === null){
            this.setState({errorMsg: 'Morate izabrati sezonu!'})
            return
        }
        if(this.state.filter.trim()){
            this.setState({
                drzave: this.state.drzaveBaza.filter(el => el.nazivtim.toLowerCase().includes(this.state.filter.toLowerCase().trim())),
                errorMsg:''
            })
        }

	  };


	render() {
		const { drzave, errorMsg } = this.state
		return (
			<div className="container">
				<Form onSubmit={this.handleSubmit}>
					<h2>Pretraži države</h2>
                    <br/>
					<div>
                        <div>
              			<input
                			type="text"
                			name="filter"
                			placeholder="naziv države"
                			onChange={this.handleInputChange}
              			/>
                        </div> 
                        <br/>
                        <div>
                            Sezona:
                            <Select onChange={this.handleSelectSezonaChange}
                            options={this.state.options}
                            defaultValue={this.state.options[0]}/>
                        </div>
                        <br/>
						<div>
							<Button type="submit">Pretraži</Button>
						</div>
            		</div>
				</Form>
				<hr/>
				<ListGroup>
				{drzave.length
					? drzave.map(drzava => 
                    <ListGroup.Item variant="info" key={drzava.iddrzava}>
                        <h3>{drzava.nazivtim}</h3>
                        <br/>
                        <Link to={"/drzava/" + drzava.idtim +"/?sezona=" + this.state.godinasezona}>
                            <Button type="button">
							Pregledaj podatke o državi za sezonu {this.state.godinasezona}
                            </Button>
                        </Link>
                    </ListGroup.Item>)
                : null} </ListGroup>
        		{errorMsg ? <p style={{color: "red"}}>{errorMsg}</p> : null}
			</div>
		)
	}
}

export default PretraziDrzave