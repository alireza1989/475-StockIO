import React, { Component } from 'react';
import StockList from '../components/StockList';
import './Dashboard.css';
import './Homepage.css';
import logo from "../assets/logo.svg"
import logoWhite from "../assets/logo-white.svg"

class Homepage extends Component {
    constructor() {
        super();
    }


	render() {
        return (    		
            <div className="App">
                <nav>
                    <ul>
                        <li className="nav-title">
                            stock.I<img src={logoWhite} alt="O"/>
                        </li>
                        <li className="nav-button nav-signin">Sign Up</li>
                        <li className="nav-button nav-login">Log In</li>
                    </ul>
                </nav>                

	            <div className="Homepage">
	            	<div className="landing-brand">
	            		<div className="landing-logo">
	            			<h1>stock.I</h1>
	            			<img src={logo} alt="O"/>
	            		</div>
	            	</div>

					<div className="landing-login">
						<form action="" method="post">							
							<input type="text" name="username" placeholder="username"/>
							<input type="password" name="password" placeholder="password"/>
							<input type="submit" value="Log In"/>
							<div className="landing-login-extra">
								<a>Sign Up</a>		
								<span>    |    </span>
								<a>Forgot your password?</a>							
							</div>
						</form>
					</div>         		

		            <div className="ScrollAbout">
		            	<p>What is stock.IO?</p>
		            </div>
	            </div>

	            <div className="About">

	            </div>



            </div>

        );
    }
}

export default Homepage;