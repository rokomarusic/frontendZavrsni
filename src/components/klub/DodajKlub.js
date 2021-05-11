import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select'

class DodajKlub extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nazivklub: '',
      godosnutka: '',
      gradovi: [],
      grad: '',
      errMsg: '',
      options:[]
    };
  }

  componentDidMount() {
    console.log(this.props);
    let id = this.props.iddrzava

    
    console.log("ID " + id)
    axios
        .get('http://localhost:3001/admin/gradovi/' + id)
        .then(response => {
            console.log(response)
            this.setState({ gradovi: response.data});
            let temp = []
            for(let i = 0; i < this.state.gradovi.length; i++){
                temp[i] = {value:"", label:""}
                temp[i].value = this.state.gradovi[i].idgrad
                temp[i].label = this.state.gradovi[i].nazivgrad
                console.log(i + " " + temp[i].value + temp[i].label)
            }
            this.setState({options: temp});
            console.log(this.state.gradovi)
            console.log(this.state.options)
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

  handleSelectChange = (selectedOption) => {
    this.setState({grad: selectedOption});
  }

  handleSubmit = e => {
    e.preventDefault();

    const { grad, nazivklub, godosnutka, errMsg} = this.state;

    let iddrzava = this.props.iddrzava

    let idgrad = grad.value

    const klub = {
      nazivklub,
      godosnutka,
      idgrad
    };

    console.log(klub)

    if(!klub.nazivklub.trim()){
        this.setState({nazivklub: ''})
        this.setState({errMsg: "Naziv kluba ne smije biti prazan!"})
        return;
    }

    if(isNaN(klub.godosnutka) || klub.godosnutka < 0){
        this.setState({godosnutka: ''})
        this.setState({errMsg: "Godina osnutka ne smije biti prazna!"})
        return;
    }

    if(!klub.idgrad){
        this.setState({errMsg: "Morate izabrati grad!"})
        return;
    }
    console.log("sad ce bit post")

    
    this.setState({
        grad: '',
        gradovi: [],
        godosnutka: '',
        nazivklub: '',
        errMsg: '',
      });


    axios
      .post('http://localhost:3001/admin/dodajklub', klub)
      .then(() => console.log('Dodan klub'))
      .catch(err => {
        console.log(err)
        this.setState({
          nazivgrad: '',
          errMsg: 'Greška pri dodavanju kluba',
        });
      });
      
      if(!this.state.errMsg){
        window.location = '/admin/klubovi/' + iddrzava;
      }
  };

  render() {
    return (
      <div>
        <div className="container">
            <h2>Dodaj klub</h2>
          <form onSubmit={this.handleSubmit}>
            <div>
              <input
                type="text"
                name="nazivklub"
                placeholder="naziv kluba"
                onChange={this.handleInputChange}
                required
              />
            </div>
            <br/>
            <div>
              <input
                type="number"
                name="godosnutka"
                placeholder="godina osnutka"
                onChange={this.handleInputChange}
                required
              />
            </div>
            <br />
            <div>
             Grad:
              <Select onChange={this.handleSelectChange}
              options={this.state.options}
              defaultValue={this.state.options[0]}/>
            </div>
            <br />
            <div>
              <button className="btn btn-success" type="submit">
                Dodaj klub
              </button>
            </div>
          </form>
          <hr/>
        </div>
        {this.state.errMsg ? <div style={{color: "red"}}>{this.state.errMsg}</div> : null}
      </div>
    );
  }
}

export default DodajKlub;