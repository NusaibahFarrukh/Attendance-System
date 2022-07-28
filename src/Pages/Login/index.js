import axios from 'axios';
import React from 'react';
import App from '../../App';

import './style.css';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loggedin: false,
            email: '',
            password: '',
            error: '',
        }
    }

    changeText = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        console.log("Logging the user in...")

        axios.get('http://localhost:5000/user/login?email=' + this.state.email + '&password=' + this.state.password)
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    this.setState({
                        loggedin: true,
                        error: ''
                    })

                    // set to local storage
                    localStorage.setItem('user', JSON.stringify(response.data.data));
                }
            }).catch(error => {
                console.log(error);
            }
        )
    }

    render() {
        // get user from local storage
        let user = JSON.parse(localStorage.getItem('user'));
        if (user)
            return <App user={user} />
        else
        return (
            <div id='login'>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label htmlFor='username'>Email</label>
                        <input type='email' className='form-control' name='email' placeholder='Enter email'
                            value={this.state.email} onChange={this.changeText} />
                    </div>
                    <div className='form-group mt-4'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' className='form-control' name='password' placeholder='Enter password' 
                            value={this.state.password} onChange={this.changeText} />
                    </div>
                    <button type='submit' className='btn btn-primary mt-4'>Login</button>
                </form>
            </div>
        )
    }
}

export default Login