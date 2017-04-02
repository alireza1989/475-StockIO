import React, { Component } from 'react';
import './SignUpForm.css';

class SignUpForm extends Component {


	render() {
		return (
			<div className="signUpForm">
				<h2>Create a new account</h2>
				<form action="" method="post">					
					<input type="text" name="firstname" placeholder="firstname"/>
					<input type="text" name="lastname" placeholder="lastname"/>
					<input type="text" name="username" placeholder="email"/>
					<input type="password" name="password" placeholder="password"/>
					<input type="password" name="confirmpassword" placeholder="confirm password"/>
					<input type="submit" value="Sign Up"/>
				</form>
				<a onClick={() => {this.props.showLogin();}}>Back to Login</a>
			</div>
		)
	}
}

export default SignUpForm;