import React, {useState} from 'react'
import axios from 'axios'
import PropTypes from 'prop-types';

const Login = ({setToken}) => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();

        const user = {
            username,
            password
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
                console.log(res.data);
                setToken(user);
                console.log("check");
                window.location = '/admin/drzave'
            }
        })
        .catch(err => {
            console.log(err)
        });

               
        
        
        
      }
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>username</p>
                    <input type="text" value={username} onChange={e => setUserName(e.target.value)}/>
                </label>
                <label>
                    <p>password</p>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                </label>
                {error ? <div style={{color: "red"}}>Login nije uspio!</div> : null}
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}