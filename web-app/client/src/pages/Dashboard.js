import React, { Component } from 'react';
import Portfolio from '../components/Portfolio';
import PortfolioAdmin from '../components/PortfolioAdmin';
import logo from "../assets/logo-white.svg";
import './Dashboard.css';

import Client from '../components/Client';

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            selectedPortfolio: undefined,
            portfolios: []
        };
        
        this.editPortfolio = this.editPortfolio.bind(this);
    }

    componentWillMount() {
        Client.getPortfolios((portfoliosList) => { 
            const portfolios = portfoliosList.map(obj => obj); //Is this redundant? Check.
            this.setState({portfolios});
        });
    }
    
    editPortfolio(id) {
        console.log(id);
        this.setState({selectedPortfolio: id});
    }
    
    renderAdminPanel() {
        if (this.state.selectedPortfolio) {
            console.log("Show admin pane");
            return <PortfolioAdmin name={this.state.selectedPortfolio} />
        }
    }

    render() {
        return (
            <div className="App">
                <nav>
                    <ul>
                        <li className="nav-title">Stock.I<img src={logo} alt="O"/></li>
                        <li className="nav-button nav-account">{this.props.name}</li>
                    </ul>
                </nav>

                <div className="Dashboard">
                    {this.state.portfolios.map((portfolio, i) =>
                            <Portfolio key={i} name={portfolio.name} id={portfolio.id}
                                       editPortfolio={this.editPortfolio}
                            />)
                    }
                </div>
                
                {this.renderAdminPanel()}
            </div>
        );
    }
}

export default Dashboard;
