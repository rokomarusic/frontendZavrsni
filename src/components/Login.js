import React, {useState} from 'react'
import axios from 'axios'
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


const Login = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [authlevel, setAuthLevel] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();

        const user = {
            username,
            password,
            authlevel
        }


        axios
        .post('http://localhost:3001/login', user)
        .then((res) => {
            if(!res.data){
                setError(true);
                console.log("ERROR " + error)
                setUserName('');
                setPassword('');
            }else{
                console.log("REZ DEJTA")
                setToken(res.data);
                console.log("check");
                window.location = '/admin/drzave'
            }
        })
        .catch(err => {
            console.log(err)
        });

               
        
        
        
      }

      function setToken(userToken) {
        sessionStorage.setItem('token', JSON.stringify(userToken));
      }
      
    return (
        <div className="container">
            <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
                <label>
                    <p>username</p>
                    <input type="text" value={username} onChange={e => setUserName(e.target.value)}/>
                </label>
                <br/>
                <label>
                    <p>password</p>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                </label>
                {error ? <div style={{color: "red"}}>Login nije uspio!</div> : null}
                <br/>
                <div>
                    <Button type="submit">Login</Button>
                </div>
            </Form>
        </div>
    )
}

export default Login

/*Login.propTypes = {
    setToken: PropTypes.func.isRequired
}*/