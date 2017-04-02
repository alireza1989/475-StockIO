import React, { Component } from 'react';
import logo from "../assets/logo.svg";
import './Login.css';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';

class Login extends Component {

	constructor(props) {
		super(props);

		this.state = {
			login_visible: true
		};
	}

	toggleSignUpLogin = () => {
		console.log('clicked' + this.state.login_visible)
		this.setState({			
			login_visible: !this.state.login_visible
		});
	}

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

	            	{this.state.login_visible ? 
						<LoginForm showSignUp={this.toggleSignUpLogin}/>
						: <SignUpForm showLogin={this.toggleSignUpLogin}/>
	            	}
	            </div>

	            <div className="About"></div>
            </div>
        );
    }
}

export default Login;