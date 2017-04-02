import React, { Component } from 'react';
import './LoginForm.css';

class LoginForm extends Component {
	render() {
		return (
			<div className="landing-login">
				<form action="/api/users/login" method="post">							
					<input type="text" name="username" placeholder="username"/>
					<input type="password" name="password" placeholder="password"/>
					<input type="submit" value="Log In"/>
					
					<ul className="landing-login-extra">
						<li><a onClick={() => {this.props.showSignUp();}}>Sign Up</a></li>
						<li><a>Forgot your password?</a></li>
					</ul>
				</form>
			</div>
		)
	}
}

export default LoginForm;