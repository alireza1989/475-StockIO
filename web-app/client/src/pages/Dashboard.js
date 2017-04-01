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
            user: {},
            overlay: false,
            selectedPortfolio: undefined,
            portfolios: []
        };

        Client.getUser((currentUser) => {
            this.setState({user: currentUser});
        });
        
        Client.getPortfolios((portfoliosList) => { 
            this.setState({portfolios: portfoliosList.portfolios});
        });
    }
    
    editPortfolio = (id) => {
        this.setState({
            overlay: !this.state.overlay,
            selectedPortfolio: this.state.selectedPortfolio ? undefined : id
        });
    }
    
    renderAdminPanel() {
        if (this.state.selectedPortfolio) {
            return <PortfolioAdmin  id={this.state.selectedPortfolio}
                                    currentUser={this.state.user}
                                    closeForm={this.editPortfolio}
                   />
        }
    }

    render() {
        return (
            <div className={`App ${this.state.overlay ? 'no-scroll' : ''}`}>
                <nav>
                    <ul>
                        <li className="nav-title">Stock.I<img src={logo} alt="O"/></li>
                        <li onClick={() => {Client.logout()}} className="right nav-button">Logout</li>
                        <li className="right">{this.state.user.username}</li>
                    </ul>
                </nav>

                <div className="Dashboard">
                    {this.state.portfolios.map((portfolio, i) =>
                        <Portfolio key={i} name={portfolio.name} id={portfolio.id}
                                   editPortfolio={this.editPortfolio}
                        />
                    )}
                </div>
                
                {this.renderAdminPanel()}
            </div>
        );
    }
}

export default Dashboard;
