import React, { Component } from 'react'
import axios from 'axios'
import { PieChart } from 'react-minimal-pie-chart';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Carousel from 'react-bootstrap/Carousel'
import Card from 'react-bootstrap/Card'
import Box from '@material-ui/core/Box';
import Select from 'react-select'


//import {Link} from 'react-router-dom'


class IgracStatistika extends Component {
	constructor(props) {
		super(props)
	    this.state = {
            ime: '',
            igrac: '',
			klubovi: '',
			kluboviOpcije: [],
			drzave:[],
			drzava: '',
			sezone: [],
			straneIgracStats:{lijevo: 0, sredina: 0, desno: 0 },
			straneGolmanStats:{lijevo: 0, sredina: 0, desno: 0 },
			visineIgracStats:{dolje: 0, gore: 0},
			pokrivenUdaracStats:{pokriven: 0, nijepokriven: 0},
			straneIgracUdaracStats:{lijevo: 0, sredina: 0, desno: 0 },
			stativaKornerStats: {prva: 0, druga:0, kratki: 0},
			izborenDrugiKornerStats: {izboren: 0, nijeizboren:0},
			straneIgracSlobodniStats:{lijevo: 0, sredina: 0, desno: 0 },
			pogodiozivizid: {pogodio: 0, nijepogodio: 0},
			preciznostslobodni: 0,
			preciznostpenala: 0,
			preciznostudaraca:0,
			preciznostkornera: 0,
			avgudaljenostudarac: 0,
			godinasezona: null,
			options:[]
		}
	}

	getDrzava(){
		for(let i = 0; i < this.state.drzave.length; i++){
			if(this.state.drzave[i].value === this.state.igrac.iddrzava){
				this.setState({drzava: this.state.drzave[i].label});
				return;
			}
		}
		return null;
	}

	componentDidMount() {
        let id = this.props.match.params.id
        console.log("ID " + id)
		axios
			.get('http://localhost:3001/admin/igrac/' + id)
			.then(response => {
				this.setState({ igrac: response.data })
			})
			.catch(error => {
        console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
			})

		axios
			.get('http://localhost:3001/admin/igracklubovi/' + id)
			.then(response => {
				this.setState({ klubovi: response.data })

			})
			.catch(error => {
        		console.log(error)
        		this.setState({errorMsg: 'Error retrieving data'})
			})

		axios
			.get('http://localhost:3001/admin/drzave')
			.then(response => {
				let temp = []
				let drzaveBaza = response.data
				for(let i = 0; i < drzaveBaza.length; i++){
					temp[i] = {value:"", label:""}
					temp[i].value = drzaveBaza[i].iddrzava
					temp[i].label = drzaveBaza[i].nazivtim
				}
				this.setState({drzave: temp});
				this.getDrzava();
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
                temp[0] = {value:"", label:""}
                temp[0].value = -1
                temp[0].label = "Sve sezone"
                for(let i = 0; i < this.state.sezone.length; i++){
                    temp[i + 1] = {value:"", label:""}
                    temp[i + 1].value = this.state.sezone[i].godinasezona
                    temp[i + 1].label = this.state.sezone[i].godinasezona
                    console.log(i + " " + temp[i].value)
                }
                this.setState({options: temp});
			})
			.catch(error => {
		console.log(error)
		this.setState({errorMsg: 'Error retrieving data'})
			})
		
		axios
			.get('http://localhost:3001/admin/sviklubovi')
			.then(response => {
				let temp = []
				let kluboviBaza = response.data
				for(let i = 0; i < kluboviBaza.length; i++){
					temp[i] = {value:"", label:""}
					temp[i].value = kluboviBaza[i].idklub
					temp[i].label = kluboviBaza[i].nazivtim
					console.log(i + " " + temp[i].value + temp[i].label)
				}
				this.setState({kluboviOpcije: temp});
			})
			.catch(error => {
		console.log(error)
		this.setState({errorMsg: 'Error retrieving data'})
			})
		
		axios
			.get('http://localhost:3001/igracstranepenala/?igrac=' + id)
			.then(response => {
				let straneIgracStats = {lijevo: 0, sredina: 0, desno: 0 }
				for(let i = 0; i < response.data.length; i++){
					if(response.data[i].stranaigracpenal === 0){
						straneIgracStats.lijevo++;
					}else if(response.data[i].stranaigracpenal === 1){
						straneIgracStats.sredina++;
					}else{
						straneIgracStats.desno++;
					}
				}

				this.setState({straneIgracStats: straneIgracStats})

			})
			.catch(error => {
        		console.log(error)
        		this.setState({errorMsg: 'Error retrieving data'})
			})

			axios
			.get('http://localhost:3001/stranaigracslobodni/?igrac=' + id)
			.then(response => {
				console.log("whahwhwh")
				console.log(response)
				let straneIgracSlobodniStats = {lijevo: 0, sredina: 0, desno: 0 }
				for(let i = 0; i < response.data.length; i++){
					if(response.data[i].stranaigracslobodni === 0){
						straneIgracSlobodniStats.lijevo++;
					}else if(response.data[i].stranaigracslobodni === 1){
						straneIgracSlobodniStats.sredina++;
					}else{
						straneIgracSlobodniStats.desno++;
					}
				}

				this.setState({straneIgracSlobodniStats: straneIgracSlobodniStats})

			})
			.catch(error => {
        		console.log(error)
        		this.setState({errorMsg: 'Error retrieving data'})
			})


		axios
			.get('http://localhost:3001/igracstraneudaraca/?igrac=' + id)
			.then(response => {
				console.log("afsfsaffasfsa")
				console.log(response)
				let straneIgracUdaracStats = {lijevo: 0, sredina: 0, desno: 0 }
				for(let i = 0; i < response.data.length; i++){
					if(response.data[i].stranaigracudarac === 0){
						straneIgracUdaracStats.lijevo++;
					}else if(response.data[i].stranaigracudarac === 1){
						straneIgracUdaracStats.sredina++;
					}else{
						straneIgracUdaracStats.desno++;
					}
				}

				this.setState({straneIgracUdaracStats: straneIgracUdaracStats})

			})
			.catch(error => {
        		this.setState({errorMsg: 'Error retrieving data'})
			})

		axios
			.get('http://localhost:3001/igracvisinepenala/?igrac=' + id)
			.then(response => {

				let visineIgracStats = {dolje: 0, gore: 0}
				for(let i = 0; i < response.data.length; i++){
					if(response.data[i].visinaigracpenal === 0){
						visineIgracStats.dolje++;
					}else{
						visineIgracStats.gore++;
					}
				}

				this.setState({visineIgracStats: visineIgracStats})

			})
			.catch(error => {
        		this.setState({errorMsg: 'Error retrieving data'})
			})

		axios
			.get('http://localhost:3001/igracpreciznostpenala/?igrac=' + id)
			.then(response => {
				let preciznost = response.data[0] && response.data[0].preciznost ? response.data[0].preciznost : 0

				this.setState({ preciznostpenala: (Number((preciznost).toFixed(2)) * 100).toString() + "%"});
			})
			.catch(error => {
		console.log(error)
		this.setState({errorMsg: 'Error retrieving data'})
			})

		axios
			.get('http://localhost:3001/igracpreciznostkorner/?igrac=' + id)
			.then(response => {
				let preciznost = response.data[0] && response.data[0].preciznost ? response.data[0].preciznost : 0

				this.setState({ preciznostkornera: (Number((preciznost).toFixed(2)) * 100).toString() + "%"});
			})
			.catch(error => {
		console.log(error)
		this.setState({errorMsg: 'Error retrieving data'})
			})

		axios
			.get('http://localhost:3001/preciznostslobodni/?igrac=' + id)
			.then(response => {
				let preciznost = response.data[0] && response.data[0].preciznost ? response.data[0].preciznost : 0

				this.setState({ preciznostslobodni: (Number((preciznost).toFixed(2)) * 100).toString() + "%"});
			})
			.catch(error => {
		console.log(error)
		this.setState({errorMsg: 'Error retrieving data'})
			})

		axios
			.get('http://localhost:3001/igracpreciznostudaraca/?igrac=' + id)
			.then(response => {
				let preciznost = response.data[0] && response.data[0].preciznost ? response.data[0].preciznost : 0

				this.setState({ preciznostudaraca: (Number((preciznost).toFixed(2)) * 100).toString() + "%"});
			})
			.catch(error => {
		console.log(error)
		this.setState({errorMsg: 'Error retrieving data'})
			})

		
		axios
			.get('http://localhost:3001/igracprosjecnaudaljenostudaraca/?igrac=' + id)
			.then(response => {
				let distance = response.data[0] && response.data[0].avgdist ? response.data[0].avgdist : 0
				console.log("AVGIST")
				console.log(response.data)
				this.setState({ avgudaljenostudarac: (Number(parseFloat(distance).toFixed(2))).toString() + " m"});
			})
			.catch(error => {
		console.log(error)
		this.setState({errorMsg: 'Error retrieving data'})
			})

		axios
			.get('http://localhost:3001/igracudaracpokriven/?igrac=' + id)
			.then(response => {

				let pokrivenUdaracStats = {pokriven: 0, nijepokriven: 0}
				for(let i = 0; i < response.data.length; i++){
					if(response.data[i].igracpokriven === 0){
						pokrivenUdaracStats.nijepokriven++;
					}else{
						pokrivenUdaracStats.pokriven++;
					}
				}
				console.log("UDARCI ")
				console.log(pokrivenUdaracStats)
				this.setState({pokrivenUdaracStats: pokrivenUdaracStats})

			})
			.catch(error => {
        		console.log(error)
        		this.setState({errorMsg: 'Error retrieving data'})
			})


		axios
			.get('http://localhost:3001/stativakorner/?igrac=' + id)
			.then(response => {

				let stativaKornerStats = {prva: 0, druga:0, kratki: 0}
				for(let i = 0; i < response.data.length; i++){
					if(response.data[i].stativa === 0){
						stativaKornerStats.prva++;
					}else if(response.data[i].stativa === 1){
						stativaKornerStats.druga++;
					}else{
						stativaKornerStats.kratki++;
					}
				}
				console.log("UDARCI ")
				console.log(stativaKornerStats)
				this.setState({stativaKornerStats: stativaKornerStats})

			})
			.catch(error => {
        		console.log(error)
        		this.setState({errorMsg: 'Error retrieving data'})
			})


		axios
			.get('http://localhost:3001/izborendrugikorner/?igrac=' + id)
			.then(response => {

				let izborenDrugiKornerStats = {izboren: 0, nijeizboren:0}
				for(let i = 0; i < response.data.length; i++){
					if(response.data[i].izborendrugikorner === 0){
						izborenDrugiKornerStats.nijeizboren++;
					}else{
						izborenDrugiKornerStats.izboren++;
					}
				}
				console.log("UDARCI ")
				console.log(izborenDrugiKornerStats)
				this.setState({izborenDrugiKornerStats: izborenDrugiKornerStats})

			})
			.catch(error => {
        		console.log(error)
        		this.setState({errorMsg: 'Error retrieving data'})
			})

		axios
			.get('http://localhost:3001/pogodiozivizid/?igrac=' + id)
			.then(response => {

				let pogodiozivizid =  {pogodio: 0, nijepogodio: 0}
				for(let i = 0; i < response.data.length; i++){
					if(response.data[i].pogodiozivizid === 0){
						pogodiozivizid.nijepogodio++;
					}else{
						pogodiozivizid.pogodio++;
					}
				}
				console.log("UDARCI ")
				console.log(pogodiozivizid)
				this.setState({pogodiozivizid: pogodiozivizid})

			})
			.catch(error => {
        		console.log(error)
        		this.setState({errorMsg: 'Error retrieving data'})
			})
		
	}

	handleSelectSezonaChange = (selectedOption) => {
        this.setState({godinasezona: selectedOption.value});
		console.log("SELEKTID OPŠN " + selectedOption.value)
    }

	showData = () => {
		let id = this.props.match.params.id
		console.log("showin data")
		if(this.state.godinasezona === null || this.state.godinasezona === -1){
			axios
			.get('http://localhost:3001/igracstranepenala/?igrac=' + id)
			.then(response => {
				let straneIgracStats = {lijevo: 0, sredina: 0, desno: 0 }
				for(let i = 0; i < response.data.length; i++){
					if(response.data[i].stranaigracpenal === 0){
						straneIgracStats.lijevo++;
					}else if(response.data[i].stranaigracpenal === 1){
						straneIgracStats.sredina++;
					}else{
						straneIgracStats.desno++;
					}
				}

				this.setState({straneIgracStats: straneIgracStats})

			})
			.catch(error => {
        		console.log(error)
        		this.setState({errorMsg: 'Error retrieving data'})
			})

			axios
			.get('http://localhost:3001/stranaigracslobodni/?igrac=' + id)
			.then(response => {
				console.log("whahwhwh")
				console.log(response)
				let straneIgracSlobodniStats = {lijevo: 0, sredina: 0, desno: 0 }
				for(let i = 0; i < response.data.length; i++){
					if(response.data[i].stranaigracslobodni === 0){
						straneIgracSlobodniStats.lijevo++;
					}else if(response.data[i].stranaigracslobodni === 1){
						straneIgracSlobodniStats.sredina++;
					}else{
						straneIgracSlobodniStats.desno++;
					}
				}

				this.setState({straneIgracSlobodniStats: straneIgracSlobodniStats})

			})
			.catch(error => {
        		console.log(error)
        		this.setState({errorMsg: 'Error retrieving data'})
			})


		axios
			.get('http://localhost:3001/igracstraneudaraca/?igrac=' + id)
			.then(response => {
				console.log("afsfsaffasfsa")
				console.log(response)
				let straneIgracUdaracStats = {lijevo: 0, sredina: 0, desno: 0 }
				for(let i = 0; i < response.data.length; i++){
					if(response.data[i].stranaigracudarac === 0){
						straneIgracUdaracStats.lijevo++;
					}else if(response.data[i].stranaigracudarac === 1){
						straneIgracUdaracStats.sredina++;
					}else{
						straneIgracUdaracStats.desno++;
					}
				}

				this.setState({straneIgracUdaracStats: straneIgracUdaracStats})

			})
			.catch(error => {
        		this.setState({errorMsg: 'Error retrieving data'})
			})

		axios
			.get('http://localhost:3001/igracvisinepenala/?igrac=' + id)
			.then(response => {

				let visineIgracStats = {dolje: 0, gore: 0}
				for(let i = 0; i < response.data.length; i++){
					if(response.data[i].visinaigracpenal === 0){
						visineIgracStats.dolje++;
					}else{
						visineIgracStats.gore++;
					}
				}

				this.setState({visineIgracStats: visineIgracStats})

			})
			.catch(error => {
        		this.setState({errorMsg: 'Error retrieving data'})
			})

		axios
			.get('http://localhost:3001/igracpreciznostpenala/?igrac=' + id)
			.then(response => {
				let preciznost = response.data[0] && response.data[0].preciznost ? response.data[0].preciznost : 0

				this.setState({ preciznostpenala: (Number((preciznost).toFixed(2)) * 100).toString() + "%"});
			})
			.catch(error => {
		console.log(error)
		this.setState({errorMsg: 'Error retrieving data'})
			})

		axios
			.get('http://localhost:3001/igracpreciznostkorner/?igrac=' + id)
			.then(response => {
				let preciznost = response.data[0] && response.data[0].preciznost ? response.data[0].preciznost : 0

				this.setState({ preciznostkornera: (Number((preciznost).toFixed(2)) * 100).toString() + "%"});
			})
			.catch(error => {
		console.log(error)
		this.setState({errorMsg: 'Error retrieving data'})
			})

		axios
			.get('http://localhost:3001/preciznostslobodni/?igrac=' + id)
			.then(response => {
				let preciznost = response.data[0] && response.data[0].preciznost ? response.data[0].preciznost : 0

				this.setState({ preciznostslobodni: (Number((preciznost).toFixed(2)) * 100).toString() + "%"});
			})
			.catch(error => {
		console.log(error)
		this.setState({errorMsg: 'Error retrieving data'})
			})

		axios
			.get('http://localhost:3001/igracpreciznostudaraca/?igrac=' + id)
			.then(response => {
				let preciznost = response.data[0] && response.data[0].preciznost ? response.data[0].preciznost : 0
				console.log("PREC  " + preciznost)

				this.setState({ preciznostudaraca: (Number((preciznost).toFixed(2)) * 100).toString() + "%"});
			})
			.catch(error => {
		console.log(error)
		this.setState({errorMsg: 'Error retrieving data'})
			})

		
		axios
			.get('http://localhost:3001/igracprosjecnaudaljenostudaraca/?igrac=' + id)
			.then(response => {
				let distance = response.data[0] && response.data[0].avgdist ? response.data[0].avgdist : 0
				console.log("AVGIST")
				console.log(response.data)
				this.setState({ avgudaljenostudarac: (Number(parseFloat(distance).toFixed(2))).toString() + " m"});
			})
			.catch(error => {
		console.log(error)
		this.setState({errorMsg: 'Error retrieving data'})
			})

		axios
			.get('http://localhost:3001/igracudaracpokriven/?igrac=' + id)
			.then(response => {

				let pokrivenUdaracStats = {pokriven: 0, nijepokriven: 0}
				for(let i = 0; i < response.data.length; i++){
					if(response.data[i].igracpokriven === 0){
						pokrivenUdaracStats.nijepokriven++;
					}else{
						pokrivenUdaracStats.pokriven++;
					}
				}
				console.log("UDARCI ")
				console.log(pokrivenUdaracStats)
				this.setState({pokrivenUdaracStats: pokrivenUdaracStats})

			})
			.catch(error => {
        		console.log(error)
        		this.setState({errorMsg: 'Error retrieving data'})
			})


		axios
			.get('http://localhost:3001/stativakorner/?igrac=' + id)
			.then(response => {

				let stativaKornerStats = {prva: 0, druga:0, kratki: 0}
				for(let i = 0; i < response.data.length; i++){
					if(response.data[i].stativa === 0){
						stativaKornerStats.prva++;
					}else if(response.data[i].stativa === 1){
						stativaKornerStats.druga++;
					}else{
						stativaKornerStats.kratki++;
					}
				}
				console.log("UDARCI ")
				console.log(stativaKornerStats)
				this.setState({stativaKornerStats: stativaKornerStats})

			})
			.catch(error => {
        		console.log(error)
        		this.setState({errorMsg: 'Error retrieving data'})
			})


		axios
			.get('http://localhost:3001/izborendrugikorner/?igrac=' + id)
			.then(response => {

				let izborenDrugiKornerStats = {izboren: 0, nijeizboren:0}
				for(let i = 0; i < response.data.length; i++){
					if(response.data[i].izborendrugikorner === 0){
						izborenDrugiKornerStats.nijeizboren++;
					}else{
						izborenDrugiKornerStats.izboren++;
					}
				}
				console.log("UDARCI ")
				console.log(izborenDrugiKornerStats)
				this.setState({izborenDrugiKornerStats: izborenDrugiKornerStats})

			})
			.catch(error => {
        		console.log(error)
        		this.setState({errorMsg: 'Error retrieving data'})
			})

		axios
			.get('http://localhost:3001/pogodiozivizid/?igrac=' + id)
			.then(response => {

				let pogodiozivizid =  {pogodio: 0, nijepogodio: 0}
				for(let i = 0; i < response.data.length; i++){
					if(response.data[i].pogodiozivizid === 0){
						pogodiozivizid.nijepogodio++;
					}else{
						pogodiozivizid.pogodio++;
					}
				}
				console.log("UDARCI ")
				console.log(pogodiozivizid)
				this.setState({pogodiozivizid: pogodiozivizid})

			})
			.catch(error => {
        		console.log(error)
        		this.setState({errorMsg: 'Error retrieving data'})
			})
		}else{
			axios
			.get('http://localhost:3001/igracstranepenalasezona/?igrac=' + id +'&sezona=' + this.state.godinasezona)
			.then(response => {
				let straneIgracStats = {lijevo: 0, sredina: 0, desno: 0 }
				for(let i = 0; i < response.data.length; i++){
					if(response.data[i].stranaigracpenal === 0){
						straneIgracStats.lijevo++;
					}else if(response.data[i].stranaigracpenal === 1){
						straneIgracStats.sredina++;
					}else{
						straneIgracStats.desno++;
					}
				}

				this.setState({straneIgracStats: straneIgracStats})

			})
			.catch(error => {
        		console.log(error)
        		this.setState({errorMsg: 'Error retrieving data'})
			})

			axios
			.get('http://localhost:3001/stranaigracslobodnisezona/?igrac=' + id +'&sezona=' + this.state.godinasezona)
			.then(response => {
				console.log("whahwhwh")
				console.log(response)
				let straneIgracSlobodniStats = {lijevo: 0, sredina: 0, desno: 0 }
				for(let i = 0; i < response.data.length; i++){
					if(response.data[i].stranaigracslobodni === 0){
						straneIgracSlobodniStats.lijevo++;
					}else if(response.data[i].stranaigracslobodni === 1){
						straneIgracSlobodniStats.sredina++;
					}else{
						straneIgracSlobodniStats.desno++;
					}
				}

				this.setState({straneIgracSlobodniStats: straneIgracSlobodniStats})

			})
			.catch(error => {
        		console.log(error)
        		this.setState({errorMsg: 'Error retrieving data'})
			})


		axios
			.get('http://localhost:3001/igracstraneudaracasezona/?igrac=' + id +'&sezona=' + this.state.godinasezona)
			.then(response => {
				console.log("afsfsaffasfsa")
				console.log(response)
				let straneIgracUdaracStats = {lijevo: 0, sredina: 0, desno: 0 }
				for(let i = 0; i < response.data.length; i++){
					if(response.data[i].stranaigracudarac === 0){
						straneIgracUdaracStats.lijevo++;
					}else if(response.data[i].stranaigracudarac === 1){
						straneIgracUdaracStats.sredina++;
					}else{
						straneIgracUdaracStats.desno++;
					}
				}

				this.setState({straneIgracUdaracStats: straneIgracUdaracStats})

			})
			.catch(error => {
        		this.setState({errorMsg: 'Error retrieving data'})
			})

		axios
			.get('http://localhost:3001/igracvisinepenalasezona/?igrac=' + id +'&sezona=' + this.state.godinasezona)
			.then(response => {

				let visineIgracStats = {dolje: 0, gore: 0}
				for(let i = 0; i < response.data.length; i++){
					if(response.data[i].visinaigracpenal === 0){
						visineIgracStats.dolje++;
					}else{
						visineIgracStats.gore++;
					}
				}

				this.setState({visineIgracStats: visineIgracStats})

			})
			.catch(error => {
        		this.setState({errorMsg: 'Error retrieving data'})
			})

		axios
			.get('http://localhost:3001/igracpreciznostpenalasezona/?igrac=' + id +'&sezona=' + this.state.godinasezona)
			.then(response => {
				let preciznost = response.data[0] && response.data[0].preciznost ? response.data[0].preciznost : 0

				this.setState({ preciznostpenala: (Number((preciznost).toFixed(2)) * 100).toString() + "%"});
			})
			.catch(error => {
		console.log(error)
		this.setState({errorMsg: 'Error retrieving data'})
			})

		axios
			.get('http://localhost:3001/igracpreciznostkornersezona/?igrac=' + id +'&sezona=' + this.state.godinasezona)
			.then(response => {
				let preciznost = response.data[0] && response.data[0] && response.data[0].preciznost ? response.data[0].preciznost : 0
				this.setState({ preciznostkornera: (Number((preciznost).toFixed(2)) * 100).toString() + "%"});
			})
			.catch(error => {
		console.log(error)
		this.setState({errorMsg: 'Error retrieving data'})
			})

		axios
			.get('http://localhost:3001/preciznostslobodnisezona/?igrac=' + id +'&sezona=' + this.state.godinasezona)
			.then(response => {
				let preciznost = response.data[0] && response.data[0].preciznost ? response.data[0].preciznost : 0

				this.setState({ preciznostslobodni: (Number((preciznost).toFixed(2)) * 100).toString() + "%"});
			})
			.catch(error => {
		console.log(error)
		this.setState({errorMsg: 'Error retrieving data'})
			})

		axios
			.get('http://localhost:3001/igracpreciznostudaracasezona/?igrac=' + id +'&sezona=' + this.state.godinasezona)
			.then(response => {
				let preciznost = response.data[0] && response.data[0].preciznost ? response.data[0].preciznost : 0
				console.log("PREC SEZONA " + preciznost)
				this.setState({ preciznostudaraca: (Number((preciznost).toFixed(2)) * 100).toString() + "%"});
			})
			.catch(error => {
		console.log(error)
		this.setState({errorMsg: 'Error retrieving data'})
			})

		
		axios
			.get('http://localhost:3001/igracprosjecnaudaljenostudaracasezona/?igrac=' + id +'&sezona=' + this.state.godinasezona)
			.then(response => {
				let distance = response.data[0] && response.data[0].avgdist ? response.data[0].avgdist : 0
				console.log("AVGISTSEZONA")
				console.log(response.data)
				this.setState({ avgudaljenostudarac: (Number(parseFloat(distance).toFixed(2))).toString() + " m"});
			})
			.catch(error => {
		console.log(error)
		this.setState({errorMsg: 'Error retrieving data'})
			})

		axios
			.get('http://localhost:3001/igracudaracpokrivensezona/?igrac=' + id +'&sezona=' + this.state.godinasezona)
			.then(response => {

				let pokrivenUdaracStats = {pokriven: 0, nijepokriven: 0}
				for(let i = 0; i < response.data.length; i++){
					if(response.data[i].igracpokriven === 0){
						pokrivenUdaracStats.nijepokriven++;
					}else{
						pokrivenUdaracStats.pokriven++;
					}
				}
				console.log("UDARCI ")
				console.log(pokrivenUdaracStats)
				this.setState({pokrivenUdaracStats: pokrivenUdaracStats})

			})
			.catch(error => {
        		console.log(error)
        		this.setState({errorMsg: 'Error retrieving data'})
			})


		axios
			.get('http://localhost:3001/stativakornersezona/?igrac=' + id +'&sezona=' + this.state.godinasezona)
			.then(response => {

				let stativaKornerStats = {prva: 0, druga:0, kratki: 0}
				for(let i = 0; i < response.data.length; i++){
					if(response.data[i].stativa === 0){
						stativaKornerStats.prva++;
					}else if(response.data[i].stativa === 1){
						stativaKornerStats.druga++;
					}else{
						stativaKornerStats.kratki++;
					}
				}
				console.log("UDARCI ")
				console.log(stativaKornerStats)
				this.setState({stativaKornerStats: stativaKornerStats})

			})
			.catch(error => {
        		console.log(error)
        		this.setState({errorMsg: 'Error retrieving data'})
			})


		axios
			.get('http://localhost:3001/izborendrugikornersezona/?igrac=' + id +'&sezona=' + this.state.godinasezona)
			.then(response => {

				let izborenDrugiKornerStats = {izboren: 0, nijeizboren:0}
				for(let i = 0; i < response.data.length; i++){
					if(response.data[i].izborendrugikorner === 0){
						izborenDrugiKornerStats.nijeizboren++;
					}else{
						izborenDrugiKornerStats.izboren++;
					}
				}
				console.log("UDARCI ")
				console.log(izborenDrugiKornerStats)
				this.setState({izborenDrugiKornerStats: izborenDrugiKornerStats})

			})
			.catch(error => {
        		console.log(error)
        		this.setState({errorMsg: 'Error retrieving data'})
			})

		axios
			.get('http://localhost:3001/pogodiozivizidsezona/?igrac=' + id +'&sezona=' + this.state.godinasezona)
			.then(response => {

				let pogodiozivizid =  {pogodio: 0, nijepogodio: 0}
				for(let i = 0; i < response.data.length; i++){
					if(response.data[i].pogodiozivizid === 0){
						pogodiozivizid.nijepogodio++;
					}else{
						pogodiozivizid.pogodio++;
					}
				}
				console.log("UDARCI ")
				console.log(pogodiozivizid)
				this.setState({pogodiozivizid: pogodiozivizid})

			})
			.catch(error => {
        		console.log(error)
        		this.setState({errorMsg: 'Error retrieving data'})
			})
		}
	}

	render() {
		const { igrac, klubovi, drzave, drzava, errorMsg, kluboviOpcije, sezone} = this.state
		return (
			<div className="container">
                {igrac.nadimakigrac ? <h1>{igrac.nadimakigrac}</h1> : <h1>{igrac.imeigrac} {igrac.prezimeigrac}</h1>}
				<h2>{igrac.pozicija}</h2>
                {errorMsg ? <div>{errorMsg}</div> : null}
				<hr/>
                <h3>Klubovi</h3>
				{klubovi.length ? klubovi.map(klub => 
				<div key={klub.datumodigrazaklub}>
					{klub.nazivtim} {klub.datumodigrazaklub} - {klub.datumdoigrazaklub ? klub.datumdoigrazaklub : " ?"}
					<div className="container">
					</div>
					<hr/>
				</div>) : null}
				<h2>{drzava}</h2>
				Datum rođenja: {igrac.datumrodenjaigrac}
				<br/>
				Preferirana noga: {igrac.jacanoga === 0 ? 'desna' : (igrac.jacanoga === 1 ? 'lijeva' : 'obje')}
				<hr/>
				<div>
                    Sezona:
                    <Select onChange={this.handleSelectSezonaChange}
                    options={this.state.options}
                    defaultValue={this.state.options[0]}/>
					<Button variant='success' onClick={this.showData} type='button'>Izaberi sezonu</Button>
                </div>
                <br/>
				<hr/>
				<Box display="flex" p={1}>
				<div>
				<h2>Penali</h2>
				Preciznost: {this.state.preciznostpenala}
                <Box display="flex" p={1}>
                <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Strana penala</Card.Title>
                    <PieChart
                        data={[
                            { title: "lijevo", value: this.state.straneIgracStats.lijevo, color: '#ff7849' },
                            { title: "sredina", value: this.state.straneIgracStats.sredina, color: '#fbd349' },
                            { title: "desno", value: this.state.straneIgracStats.desno, color: '#bdb5d5' },
                        ]}
						label={({ dataEntry }) => dataEntry.value ? dataEntry.title : ""}
                        labelStyle={(index) => ({
                        fill: '#ffffff',
                        fontSize: '7px',
                        fontFamily: 'sans-serif',
                         })}
                        radius={40}
                        totalValue={this.state.straneIgracStats.lijevo + this.state.straneIgracStats.sredina + this.state.straneIgracStats.desno}
                        />
                </Card.Body>
                </Card>
				<Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Visine penala</Card.Title>
                    <PieChart
                        data={[
                            { title: 'dolje', value: this.state.visineIgracStats.dolje, color: '#ff7849' },
                            { title: 'gore', value: this.state.visineIgracStats.gore, color: '#fbd349' },
                        ]}
                        radius={40}
                        totalValue={this.state.visineIgracStats.dolje + this.state.visineIgracStats.gore}
                        label={({ dataEntry }) => dataEntry.value ? dataEntry.title : ""}
                        labelStyle={(index) => ({
                        fill: '#ffffff',
                        fontSize: '7px',
                        fontFamily: 'sans-serif',
                         })}
                        />
                </Card.Body>
                </Card>
                </Box>
				</div>
				<div>
				<h2>Udarci</h2>
				Preciznost: {this.state.preciznostudaraca}  Prosječna udaljenost: {this.state.avgudaljenostudarac}
                <Box display="flex" p={1}>
                <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Strana udaraca</Card.Title>
                    <PieChart
                        data={[
                            { title: "lijevo", value: this.state.straneIgracUdaracStats.lijevo, color: '#ff7849' },
                            { title: "sredina", value: this.state.straneIgracUdaracStats.sredina, color: '#fbd349' },
                            { title: "desno", value: this.state.straneIgracUdaracStats.desno, color: '#bdb5d5' },
                        ]}
						label={({ dataEntry }) => dataEntry.value ? dataEntry.title : ""}
                        labelStyle={(index) => ({
                        fill: '#ffffff',
                        fontSize: '7px',
                        fontFamily: 'sans-serif',
                         })}
                        radius={40}
                        totalValue={this.state.straneIgracUdaracStats.lijevo + this.state.straneIgracUdaracStats.sredina + this.state.straneIgracUdaracStats.desno}
                        />
                </Card.Body>
                </Card>
				<Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Igrač pokriven</Card.Title>
                    <PieChart
                        data={[
                            { title: 'pokriven', value: this.state.pokrivenUdaracStats.pokriven, color: '#ff7849' },
                            { title: 'nije pokriven', value: this.state.pokrivenUdaracStats.nijepokriven, color: '#fbd349' },
                        ]}
                        radius={40}
                        totalValue={this.state.pokrivenUdaracStats.pokriven + this.state.pokrivenUdaracStats.nijepokriven}
                        label={({ dataEntry }) => dataEntry.value ? dataEntry.title : ""}
                        labelStyle={(index) => ({
                        fill: '#ffffff',
                        fontSize: '7px',
                        fontFamily: 'sans-serif',
                         })}
                        />
                </Card.Body>
                </Card>
                </Box>
				</div>
				</Box>
				<div>
				<h2>Korneri</h2>
				Efiksanost: {this.state.preciznostkornera}
				<Box display="flex" p={1}>
					<Card style={{ width: '18rem' }}>
					<Card.Body>
						<Card.Title>Izvođenje kornera</Card.Title>
						<PieChart
							data={[
								{ title: "prva stativa", value: this.state.stativaKornerStats.prva, color: '#ff7849' },
								{ title: "druga stativa", value: this.state.stativaKornerStats.druga, color: '#fbd349' },
								{ title: "kratki korner", value: this.state.stativaKornerStats.kratki, color: '#bdb5d5' },
							]}
							label={({ dataEntry }) => dataEntry.value ? dataEntry.title : ""}
							labelStyle={(index) => ({
							fill: '#ffffff',
							fontSize: '7px',
							fontFamily: 'sans-serif',
							})}
							radius={40}
							totalValue={this.state.stativaKornerStats.prva + this.state.stativaKornerStats.druga + this.state.stativaKornerStats.kratki}
							/>
					</Card.Body>
					</Card>
					<Card style={{ width: '18rem' }}>
					<Card.Body>
						<Card.Title>Izboren drugi korner</Card.Title>
						<PieChart
							data={[
								{ title: 'izboren', value: this.state.izborenDrugiKornerStats.izboren, color: '#ff7849' },
								{ title: 'nije izboren', value: this.state.izborenDrugiKornerStats.nijeizboren, color: '#fbd349' },
							]}
							radius={40}
							totalValue={this.state.izborenDrugiKornerStats.izboren + this.state.izborenDrugiKornerStats.nijeizboren}
							label={({ dataEntry }) => dataEntry.value ? dataEntry.title : ""}
							labelStyle={(index) => ({
							fill: '#ffffff',
							fontSize: '7px',
							fontFamily: 'sans-serif',
							})}
							/>
					</Card.Body>
					</Card>
				</Box>
				</div>
				<div>
				<h2>Slobodni udarci</h2>
				Preciznost: {this.state.preciznostslobodni}  Prosječna udaljenost: {this.state.avgudaljenostudarac}
                <Box display="flex" p={1}>
                <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Strana slobodnih udaraca</Card.Title>
                    <PieChart
                        data={[
                            { title: "lijevo", value: this.state.straneIgracSlobodniStats.lijevo, color: '#ff7849' },
                            { title: "sredina", value: this.state.straneIgracSlobodniStats.sredina, color: '#fbd349' },
                            { title: "desno", value: this.state.straneIgracSlobodniStats.desno, color: '#bdb5d5' },
                        ]}
						label={({ dataEntry }) => dataEntry.value ? dataEntry.title : ""}
                        labelStyle={(index) => ({
                        fill: '#ffffff',
                        fontSize: '7px',
                        fontFamily: 'sans-serif',
                         })}
                        radius={40}
                        totalValue={this.state.straneIgracSlobodniStats.lijevo + this.state.straneIgracSlobodniStats.sredina + this.state.straneIgracSlobodniStats.desno}
                        />
                </Card.Body>
                </Card>
				<Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Pogođen živi zid</Card.Title>
                    <PieChart
                        data={[
                            { title: 'pogođen', value: this.state.pogodiozivizid.pogodio, color: '#ff7849' },
                            { title: 'nije pogođen', value: this.state.pogodiozivizid.nijepogodio, color: '#fbd349' },
                        ]}
                        radius={40}
                        totalValue={this.state.pogodiozivizid.pogodio + this.state.pogodiozivizid.nijepogodio}
                        label={({ dataEntry }) => dataEntry.value ? dataEntry.title : ""}
                        labelStyle={(index) => ({
                        fill: '#ffffff',
                        fontSize: '7px',
                        fontFamily: 'sans-serif',
                         })}
                        />
                </Card.Body>
                </Card>
                </Box>
				</div>
			</div>
		)

    
	}
}

export default IgracStatistika