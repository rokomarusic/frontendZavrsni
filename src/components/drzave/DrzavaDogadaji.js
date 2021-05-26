import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Box from '@material-ui/core/Box';
import Select from 'react-select'
import { PieChart } from 'react-minimal-pie-chart';


import Paper from '@material-ui/core/Paper';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

class DrzavaDogadaji extends Component {
	constructor(props) {
		super(props)
	    this.state = {
			treneri: '',
            errorMsg: '',
            penaliStrane: [],
            penaliVisine: [],
            kornerStative: [],
            kornerIzborenDrugi: [],
            udaracStrane: [],
            udaracPokriven: [],
            slobodniStrane: [],
            slobodniPogodioZiviZid: [],
            penaliPreciznost: 0,
            korneriPreciznost: 0,
            udarciPreciznost: 0,
            slobodniPreciznost: 0,
            udarciUdaljenost: 0,
            slobodniUdaljenost: 0,
            goloviposezonama: [],
		}
	}

	componentDidMount() {
        console.log("COMP MOUNTED")
        axios
			.get('http://localhost:3001/penalidrzava/' + this.props.idtim + "/?sezona=" + this.props.sezona + "&iddrzava=" + this.props.iddrzava)
			.then(response => {
				console.log("penali ovdje")
				let penaliStrane = {lijevo: 0, sredina: 0, desno: 0 }
                let penaliVisine = {dolje: 0, gore: 0}
                let golovi = 0
                for(let i = 0; i < response.data.length; i++){
                    if(response.data[i].zabijengol === 1){
                        golovi++
                    }
                    if(response.data[i].stranaigracpenal === 0){
                        penaliStrane.lijevo++;
                    }else if(response.data[i].stranaigracpenal === 1){
                        penaliStrane.sredina++;
                    }else{
                        penaliStrane.desno++;
                    }

                    if(response.data[i].visinaigracpenal === 0){
                        penaliVisine.dolje++;
                    }else{
                        penaliVisine.gore++;
                    }
                }
                console.log(penaliStrane)
                console.log(penaliVisine)
                console.log(golovi)
                this.setState({penaliStrane: penaliStrane})
                this.setState({penaliVisine: penaliVisine})
                this.setState({penaliPreciznost: response.data.length !== 0 ? ((Math.round(golovi/response.data.length  * 100)).toString() + "%") : "0%"})
			})
			.catch(error => {
        console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
			})

        axios
			.get('http://localhost:3001/korneridrzava/' + this.props.idtim + "/?sezona=" + this.props.sezona + "&iddrzava=" + this.props.iddrzava)
			.then(response => {
				console.log("penali ovdje")
				let kornerStative = {prva: 0, druga: 0, kratki: 0 }
                let kornerIzborenDrugi = {nije: 0, je: 0}
                let golovi = 0
                for(let i = 0; i < response.data.length; i++){
                    if(response.data[i].zabijengol === 1){
                        golovi++
                    }
                    if(response.data[i].stativa === 0){
                        kornerStative.prva++;
                    }else if(response.data[i].stativa === 1){
                        kornerStative.druga++;
                    }else{
                        kornerStative.kratki++;
                    }

                    if(response.data[i].izborendrugikorner === 0){
                        kornerIzborenDrugi.nije++;
                    }else{
                        kornerIzborenDrugi.je++;
                    }
                }
                console.log(kornerStative)
                console.log(kornerIzborenDrugi)
                console.log(golovi)
                this.setState({kornerStative: kornerStative})
                this.setState({kornerIzborenDrugi: kornerIzborenDrugi})
                this.setState({korneriPreciznost: response.data.length !== 0 ? ((Math.round(golovi/response.data.length  * 100)).toString() + "%") : "0%"})
			})
			.catch(error => {
        console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
			})

        axios
			.get('http://localhost:3001/udarcidrzava/' + this.props.idtim + "/?sezona=" + this.props.sezona + "&iddrzava=" + this.props.iddrzava)
			.then(response => {
				console.log("penali ovdje")
				let udaracStrane = {lijevo: 0, sredina: 0, desno: 0 }
                let udaracPokriven = {nije: 0, je: 0}
                let golovi = 0
                let udaljenostsuma = 0
                for(let i = 0; i < response.data.length; i++){
                    if(response.data[i].zabijengol === 1){
                        golovi++
                    }

                    udaljenostsuma += response.data[i].udaljenostudarac

                    if(response.data[i].stranaigracudarac === 0){
                        udaracStrane.lijevo++;
                    }else if(response.data[i].stranaigracudarac === 1){
                        udaracStrane.sredina++;
                    }else{
                        udaracStrane.desno++;
                    }

                    if(response.data[i].igracpokriven === 0){
                        udaracPokriven.nije++;
                    }else{
                        udaracPokriven.je++;
                    }
                }
                console.log(udaracStrane)
                console.log(udaracPokriven)
                console.log(golovi)
                this.setState({udaracStrane: udaracStrane})
                this.setState({udaracPokriven: udaracPokriven})
                this.setState({udarciPreciznost: response.data.length !== 0 ? ((Math.round(golovi/response.data.length  * 100)).toString() + "%") : "0%"})
                this.setState({udarciUdaljenost: response.data.length !== 0 ? ((Math.round(udaljenostsuma/response.data.length)).toString() + " m") : "0 m"})
            })
			.catch(error => {
        console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
			})

        axios
			.get('http://localhost:3001/slobodnidrzava/' + this.props.idtim + "/?sezona=" + this.props.sezona + "&iddrzava=" + this.props.iddrzava)
			.then(response => {
				console.log("penali ovdje")
				let slobodniStrane = {lijevo: 0, sredina: 0, desno: 0 }
                let slobodniPogodioZiviZid = {nije: 0, je: 0}
                let golovi = 0
                let udaljenostsuma = 0
                for(let i = 0; i < response.data.length; i++){
                    if(response.data[i].zabijengol === 1){
                        golovi++
                    }

                    udaljenostsuma += response.data[i].udaljenostslobodni

                    if(response.data[i].stranaigracslobodni === 0){
                        slobodniStrane.lijevo++;
                    }else if(response.data[i].stranaigracslobodni === 1){
                        slobodniStrane.sredina++;
                    }else{
                        slobodniStrane.desno++;
                    }

                    if(response.data[i].pogodiozivizid === 0){
                        slobodniPogodioZiviZid.nije++;
                    }else{
                        slobodniPogodioZiviZid.je++;
                    }
                }
                console.log(slobodniStrane)
                console.log(slobodniPogodioZiviZid)
                this.setState({slobodniStrane: slobodniStrane})
                this.setState({slobodniPogodioZiviZid: slobodniPogodioZiviZid})
                this.setState({slobodniPreciznost: response.data.length !== 0 ? ((Math.round(golovi/response.data.length  * 100)).toString() + "%") : "0%"})
                this.setState({slobodniUdaljenost: response.data.length !== 0 ? ((Math.round(udaljenostsuma/response.data.length)).toString() + " m") : "0 m"})
            })
			.catch(error => {
        console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
			})

            axios
			.get('http://localhost:3001/goloviposezonamatim/' + this.props.idtim)
			.then(response => {
                console.log("golovi tima po sezonama")
                let temp = []
                for(let i = 0; i < response.data.length; i++){
                    if(parseInt(response.data[i].sumdomaci) + parseInt(response.data[i].sumgosti) > 0){
                        temp[i] = {sezona: response.data[i].godinasezona.toString(), brgolova: parseInt(response.data[i].sumdomaci) + parseInt(response.data[i].sumgosti)}
                    }
                }
                this.setState({goloviposezonama: temp})
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
				<Box display="flex" p={1}>
				<div>
				<h2>Penali</h2>
				Preciznost: {this.state.penaliPreciznost}
                <Box display="flex" p={1}>
                <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Strana penala</Card.Title>
                    <PieChart
                        data={[
                            { title: "lijevo", value: this.state.penaliStrane.lijevo, color: '#ff7849' },
                            { title: "sredina", value: this.state.penaliStrane.sredina, color: '#fbd349' },
                            { title: "desno", value: this.state.penaliStrane.desno, color: '#bdb5d5' },
                        ]}
						label={({ dataEntry }) => dataEntry.value ? dataEntry.title : ""}
                        labelStyle={(index) => ({
                        fill: '#ffffff',
                        fontSize: '7px',
                        fontFamily: 'sans-serif',
                         })}
                        radius={40}
                        totalValue={this.state.penaliStrane.lijevo + this.state.penaliStrane.sredina + this.state.penaliStrane.desno}
                        />
                </Card.Body>
                </Card>
				<Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Visine penala</Card.Title>
                    <PieChart
                        data={[
                            { title: 'dolje', value: this.state.penaliVisine.dolje, color: '#ff7849' },
                            { title: 'gore', value: this.state.penaliVisine.gore, color: '#fbd349' },
                        ]}
                        radius={40}
                        totalValue={this.state.penaliVisine.dolje + this.state.penaliVisine.gore}
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
				Preciznost: {this.state.udarciPreciznost}  Prosječna udaljenost: {this.state.udarciUdaljenost}
                <Box display="flex" p={1}>
                <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Strana udaraca</Card.Title>
                    <PieChart
                        data={[
                            { title: "lijevo", value: this.state.udaracStrane.lijevo, color: '#ff7849' },
                            { title: "sredina", value: this.state.udaracStrane.sredina, color: '#fbd349' },
                            { title: "desno", value: this.state.udaracStrane.desno, color: '#bdb5d5' },
                        ]}
						label={({ dataEntry }) => dataEntry.value ? dataEntry.title : ""}
                        labelStyle={(index) => ({
                        fill: '#ffffff',
                        fontSize: '7px',
                        fontFamily: 'sans-serif',
                         })}
                        radius={40}
                        totalValue={this.state.udaracStrane.lijevo + this.state.udaracStrane.sredina + this.state.udaracStrane.desno}
                        />
                </Card.Body>
                </Card>
				<Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Igrač pokriven</Card.Title>
                    <PieChart
                        data={[
                            { title: 'pokriven', value: this.state.udaracPokriven.je, color: '#ff7849' },
                            { title: 'nije pokriven', value: this.state.udaracPokriven.nije, color: '#fbd349' },
                        ]}
                        radius={40}
                        totalValue={this.state.udaracPokriven.je + this.state.udaracPokriven.nije}
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
				<Box display="flex" p={1}>
				<div>
				<h2>Korneri</h2>
				Efiksanost: {this.state.korneriPreciznost}
				<Box display="flex" p={1}>
                <Card style={{ width: '18rem' }}>
					<Card.Body>
						<Card.Title>Izvođenje kornera</Card.Title>
						<PieChart
							data={[
								{ title: "prva stativa", value: this.state.kornerStative.prva, color: '#ff7849' },
								{ title: "druga stativa", value: this.state.kornerStative.druga, color: '#fbd349' },
								{ title: "kratki korner", value: this.state.kornerStative.kratki, color: '#bdb5d5' },
							]}
							label={({ dataEntry }) => dataEntry.value ? dataEntry.title : ""}
							labelStyle={(index) => ({
							fill: '#ffffff',
							fontSize: '7px',
							fontFamily: 'sans-serif',
							})}
							radius={40}
							totalValue={this.state.kornerStative.prva + this.state.kornerStative.druga + this.state.kornerStative.kratki}
							/>
					</Card.Body>
					</Card>
					<Card style={{ width: '18rem' }}>
					<Card.Body>
						<Card.Title>Izboren drugi korner</Card.Title>
						<PieChart
							data={[
								{ title: 'izboren', value: this.state.kornerIzborenDrugi.je, color: '#ff7849' },
								{ title: 'nije izboren', value: this.state.kornerIzborenDrugi.nije, color: '#fbd349' },
							]}
							radius={40}
							totalValue={this.state.kornerIzborenDrugi.je + this.state.kornerIzborenDrugi.nije}
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
				Preciznost: {this.state.slobodniPreciznost}  Prosječna udaljenost: {this.state.slobodniUdaljenost}
                <Box display="flex" p={1}>
                <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Strana slobodnih udaraca</Card.Title>
                    <PieChart
                        data={[
                            { title: "lijevo", value: this.state.slobodniStrane.lijevo, color: '#ff7849' },
                            { title: "sredina", value: this.state.slobodniStrane.sredina, color: '#fbd349' },
                            { title: "desno", value: this.state.slobodniStrane.desno, color: '#bdb5d5' },
                        ]}
						label={({ dataEntry }) => dataEntry.value ? dataEntry.title : ""}
                        labelStyle={(index) => ({
                        fill: '#ffffff',
                        fontSize: '7px',
                        fontFamily: 'sans-serif',
                         })}
                        radius={40}
                        totalValue={this.state.slobodniStrane.lijevo + this.state.slobodniStrane.sredina + this.state.slobodniStrane.desno}
                        />
                </Card.Body>
                </Card>
				<Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Pogođen živi zid</Card.Title>
                    <PieChart
                        data={[
                            { title: 'pogođen', value: this.state.slobodniPogodioZiviZid.je, color: '#ff7849' },
                            { title: 'nije pogođen', value: this.state.slobodniPogodioZiviZid.nije, color: '#fbd349' },
                        ]}
                        radius={40}
                        totalValue={this.state.slobodniPogodioZiviZid.je + this.state.slobodniPogodioZiviZid.nije}
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
                {this.state.goloviposezonama && <Paper>
					<Chart
					data={this.state.goloviposezonama}
					>
					<ArgumentAxis />
					<ValueAxis max={20} />

					<BarSeries
						valueField="brgolova"
						argumentField="sezona"
						barWidth={1}
					/>
					<Title text="Broj golova tima po sezoni" />
					<Animation />
					</Chart>
				</Paper>}
			</div>
		)
	}
}

export default DrzavaDogadaji