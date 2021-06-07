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
      klubovi: [],
	  kluboviBaza:[],
	  filter: '',
      errorMsg: '',
      sezone:[],
      options:[],
      godinasezona:null,
      drzava: null,
      drzave: []
		}
	}

    handleSelectSezonaChange = (selectedOption) => {
        this.setState({godinasezona: selectedOption.value});
    }

	componentDidMount() {
		axios
			.get('http://localhost:3001/admin/sviklubovi')
			.then(response => {
                console.log("KLUBOVI ")
				console.log(response)
				this.setState({ klubovi: [],
								kluboviBaza: response.data })
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

        axios
			.get('http://localhost:3001/admin/drzave')
			.then(response => {
				console.log(response)
				let temp = []
                temp[0] = {value:-1, label:'Sve države'}
				let drzaveBaza = response.data
				for(let i = 0; i < drzaveBaza.length; i++){
					temp[i + 1] = {value:"", label:""}
					temp[i + 1].value = drzaveBaza[i].iddrzava
					temp[i + 1].label = drzaveBaza[i].nazivtim
					console.log(i + " " + temp[i].value + temp[i].label)
				}
				this.setState({drzave: temp});
				console.log("A111"+this.state.drzava)
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
            let temp = this.state.kluboviBaza.filter(el => el.nazivtim.toLowerCase().includes(this.state.filter.toLowerCase().trim()))
            this.setState({
                klubovi: this.state.kluboviBaza.filter(el => el.nazivtim.toLowerCase().includes(this.state.filter.toLowerCase().trim())),
                errorMsg:''
            })
            if(this.state.drzava && this.state.drzava !== -1){
                this.setState({
                klubovi: temp.filter(el => el.iddrzava === this.state.drzava)
                })
            }
        }

	  };
    
      handleSelectDrzavaChange = (selectedOption) => {
        this.setState({drzava: selectedOption.value});
      }


	render() {
		const { klubovi, errorMsg } = this.state
		return (
			<div className="container">
				<Form onSubmit={this.handleSubmit}>
					<h2>Pretraži klubove</h2>
                    <br/>
					<div>
                        <div>
              			<input
                			type="text"
                			name="filter"
                			placeholder="naziv kluba"
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
                        <br />
                        Država:
                        <div>
                        <Select onChange={this.handleSelectDrzavaChange}
                            options={this.state.drzave}/>
                        </div>
                        <br />
						<div>
							<Button type="submit">Pretraži</Button>
						</div>
            		</div>
				</Form>
				<hr/>
				<ListGroup>
				{klubovi.length
					? klubovi.map(klub => 
                    <ListGroup.Item variant="info" key={klub.idklub}>
                        <h3>{klub.nazivtim}</h3>
                        <br/>
                        <Link to={"/klub/" + klub.idtim +"/?sezona=" + this.state.godinasezona}>
                            <Button type="button">
                                    Pregledaj podatke o klubu za sezonu {this.state.godinasezona}
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