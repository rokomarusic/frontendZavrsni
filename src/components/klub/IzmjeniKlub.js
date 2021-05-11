import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select'


class IzmjeniKlub extends Component {
  constructor(props) {
    super(props);

    this.state = {
        nazivklub: '',
        godosnutka: '',
        gradovi: [],
        grad: '',
        errMsg: '',
        options:[],
        visible: false
    };
  }



  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSelectChange = (selectedOption) => {
    this.setState({grad: selectedOption.value});
  }

  handleSubmit = e => {
    e.preventDefault();
    let idtim = this.props.id;
    console.log("ID TIMA KOJI SE MINJA " + idtim);
    

    const { nazivklub, godosnutka, grad} = this.state;


    const klub = {
      nazivklub,
      godosnutka,
      grad
    };

    this.setState({
        nazivklub: '',
        godosnutka: '',
        grad: '',
        errMsg: '',
        visible: false
    });

    console.log("hhhhh")
    console.log(klub)
    console.log(idtim)
    console.log("hhhhh")

    if(!klub.nazivklub.trim()){
      this.setState({nazivklub: ''})
      this.setState({errMsg: "Naziv kluba ne smije biti prazan!"})
      return;
  }

    if(isNaN(klub.godosnutka) || klub.godosnutka < 0){
      this.setState({godosnutka: ''})
      this.setState({errMsg: "Godina osnutka mora biti broj veći od nule!"})
      return;
    }

    axios
      .post('http://localhost:3001/admin/izmjeniklub/' + idtim, klub)
      .then(() => {
        window.location = '/admin/klub/' + idtim;
      })
      .catch(err => {
        console.log(err)
        this.setState({
          errMsg: 'Greška pri ubacivanju kluba!',
          visible: false
        });
      });

  };

  toggleVisibility = () => {
        this.setState({visible: (!this.state.visible)})
  }

  render() {
    return (
      <div>
        <div className="container">
          <button type="button" onClick={this.toggleVisibility}>Izmjeni klub</button>
          {this.state.visible && <form onSubmit={this.handleSubmit}>
            <div>
              <input
                type="text"
                name="nazivklub"
                placeholder="naziv kluba"
                onChange={this.handleInputChange}
              />
            </div>
            <br/>
            <div>
              <input
                type="number"
                name="godosnutka"
                placeholder="godina osnutka"
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <div>
             Grad:
              <Select onChange={this.handleSelectChange}
              options={this.props.gradovi}
              defaultValue={this.props.gradovi[0]}/>
            </div>
            <br />
            <div>
              <button className="btn btn-success" type="submit">
                Izmjeni klub
              </button>
            </div>
          </form>}
          <hr/>
        </div>
        {this.state.errMsg ? <div style={{color: "red"}}>{this.state.errMsg}</div> : null}
      </div>
    );
  }
}

export default IzmjeniKlub;