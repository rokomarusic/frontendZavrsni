import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Select from 'react-select'
import Table from 'react-bootstrap/Table'

class PretraziIgrace extends Component {
	constructor(props) {
		super(props)

		this.state = {
      igraci: [],
      errorMsg: '',
      filterime: '',
      igraciBaza: [],
      drzave: [],
      drzava: null
		}
	}

	componentDidMount() {
		axios
			.get('http://localhost:3001/admin/igraci')
			.then(response => {
                console.log("RIIZZZZ")
				console.log(response)
				this.setState({ igraciBaza: response.data })
			})
			.catch(error => {
        console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
			})

        axios
			.get('http://localhost:3001/admin/drzave')
			.then(response => {
				let temp = []
                temp[0] = {value:"", label:""}
                temp[0].value = -1
                temp[0].label = 'Sve države'
				let drzaveBaza = response.data
				for(let i = 0; i < drzaveBaza.length; i++){
					temp[i + 1] = {value:"", label:""}
					temp[i + 1].value = drzaveBaza[i].iddrzava
					temp[i + 1].label = drzaveBaza[i].nazivtim
				}
				this.setState({drzave: temp});
			})
			.catch(error => {
        		console.log(error)
        		this.setState({errorMsg: 'Error retrieving data'})
			})

	}

    filterIgrace = () =>{

        console.log("FILTER IME " + this.state.filterime)
        let temp = this.state.igraciBaza

        if(!this.state.filterime.trim() && this.state.drzava === null){
            return;
        }
        if(this.state.filterime.trim()){
            
               temp =  this.state.igraciBaza.filter(el => el.imeigrac.toLowerCase().includes(this.state.filterime.toLowerCase()) ||
                el.prezimeigrac.toLowerCase().includes(this.state.filterime.toLowerCase()) ||
                ( el.nadimakimeigrac ? el.nadimakimeigrac.toLowerCase().includes(this.state.filterime.toLowerCase()) : false)
            )
        }

        if(this.state.drzava !== null && this.state.drzava !== -1){
            temp = temp.filter(el => el.iddrzava === this.state.drzava)
        }

        this.setState({igraci: temp})
    }

    handleInputChange = e => {
		this.setState({
		  [e.target.name]: e.target.value,
		});
	};

    handleSelectDrzavaChange = (selectedOption) => {
        this.setState({drzava: selectedOption.value});
    }


	render() {
		const { igraci, errorMsg } = this.state
		return (
			<div className="container">
            <div>
            <h2>Pretaži igrače</h2>
            <br/>
                <div>
                    država:
                    <Select onChange={this.handleSelectDrzavaChange}
                    options={this.state.drzave}/>
                </div>
            <br/>
            <div>
            <input
                type="text"
                name="filterime"
                placeholder="naziv igrača"
                onChange={this.handleInputChange}
            />
            </div>
            <br/>
              <Button className="btn btn-success" type="button" onClick={this.filterIgrace}>
                Prikaži igrače
              </Button>
            </div>
                <Table responsive>
                <thead>
                    <tr>
                        <th>igrač</th>
                        <th>pozicija</th>
                        <th>država</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {igraci.map(igrac => 
                    <tr key={igrac.idigrac}>
                        <td>{igrac.nadimakigrac ? igrac.nadimakigrac : igrac.imeigrac + " " + igrac.prezimeigrac}</td>
                        <td>{igrac.pozicija}</td>
                        <td>{igrac.fifakod}</td>
                        <td>
                            <Link to={(igrac.pozicija === 'GK' ?"/golman/" :"/igrac/") + igrac.idigrac}>
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

export default PretraziIgrace