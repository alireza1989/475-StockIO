import React, { Component } from 'react';
import './LoginPageForms.css';

class SignUpForm extends Component {


	render() {
		return (
			<div className="landing-page-form signup">
				<form action="" method="post">					
					<input type="text" name="firstname" placeholder="firstname"/>
					<input type="text" name="lastname" placeholder="lastname"/>
					<input type="text" name="username" placeholder="email"/>
					<input type="password" name="password" placeholder="password"/>
					<input type="password" name="confirmpassword" placeholder="confirm password"/>
					<input type="submit" value="Sign Up"/>
					
					<ul className="landing-page-form-extra">
						<li><a onClick={() => {this.props.showLogin();}}>Back to Login</a></li>
					</ul>
					
				</form>
			</div>
		)
	}
}

export default SignUpForm;