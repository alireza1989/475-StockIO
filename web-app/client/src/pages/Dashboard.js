import React, { Component } from 'react';
import Portfolio from '../components/Portfolio';
import logo from "../assets/logo-white.svg";
import './Dashboard.css';

import Client from '../components/Client';

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            portfolios : []
        };
    }

    componentWillMount() {
        Client.getPortfolios((portfoliosList) => { 
            const portfolios = portfoliosList.map(obj => obj); //Is this redundant? Check.
            this.setState({portfolios});
        });
    }

    render() {
        return (
            <div className="App">
                <nav>
                    <ul>
                        <li className="nav-title">
                            Stock.I<img src={logo} alt="O"/>
                        </li>
                        <li className="nav-button nav-account">{this.props.name}</li>
                    </ul>
                </nav>

                <div className="Dashboard">
                    {this.state.portfolios.map((portfolio, i) => <Portfolio key={i} name={portfolio.name}/>)}
                </div>
            </div>
        );
    }
}

export default Dashboard;
