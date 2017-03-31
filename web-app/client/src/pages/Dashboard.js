import React, { Component } from 'react';
import StockList from '../components/StockList';
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
        }).catch(function(){
            // const companies = Companies.companies;
            // this.setState({companies});
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
                    {this.state.portfolios.map((list, i) => <StockList key={i} name={list.name}/>)}
                </div>
            </div>
        );
    }
}

export default Dashboard;
