import React, { Component } from 'react';
import logo from "../assets/logo.svg"
import './Login.css';

class Login extends Component {
	render() {
        return (    		
            <div className="App">
	            <div className="Login">
	            	<div className="landing-brand">
	            		<div className="landing-logo">
	            			<h1>stock.I</h1>
	            			<img src={logo} alt="O"/>
	            		</div>
	            	</div>

					<div className="landing-login">
						<form action="/accounts/login" method="post">							
							<input type="text" name="username" placeholder="username"/>
							<input type="password" name="password" placeholder="password"/>
							<input type="submit" value="Log In"/>
							<div className="landing-login-extra">
								<a>Sign Up</a>		
								<span> | </span>
								<a>Forgot your password?</a>							
							</div>
						</form>
					</div>
	            </div>

	            <div className="About"></div>
            </div>
        );
    }
}

export default Login;