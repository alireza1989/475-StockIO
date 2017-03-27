import React, { Component } from 'react';
import StockList from '../components/StockList';
import './Dashboard.css';
import './Homepage.css';
import logo from "../assets/logo-white.svg"

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
                            stock.I<img src={logo} alt="O"/>
                        </li>
                        <li className="nav-button nav-signin">Sign In</li>
                        <li className="nav-button nav-login">Log In</li>
                    </ul>
                </nav>                
            </div>
        );
    }
}

export default Homepage;