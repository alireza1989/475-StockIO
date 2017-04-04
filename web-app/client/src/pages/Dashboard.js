import React, { Component } from 'react';
import Portfolio from '../components/Portfolio';
import PortfolioAdmin from '../components/PortfolioAdmin';
import logo from "../assets/logo-white.svg";
import './Dashboard.css';
import io from 'socket.io-client';
import Client from '../components/Client';

const socket = io('http://localhost:3001');

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

        socket.on('addPortfolio', (data) => {
            var portfolio = JSON.parse(data);
            this.addPortfolioHelper(portfolio);
        });

        socket.on('deletePortfolio', (data) => {
            var portfolioId = JSON.parse(data).portfolioId;
            var index = Client.getIndex(portfolioId, this.state.portfolios)
            if (index !== -1) {
                this.setState(state => {
                    this.state.portfolios.splice(index, 1);
                    return {portfolios: state.portfolios}
                });
            }
        });
    }
    
    editPortfolio = (portfolio) => {
        this.setState({
            overlay: !this.state.overlay,
            selectedPortfolio: this.state.selectedPortfolio ? undefined : portfolio
        });
    }
    
    addPortfolio = () => {
        console.log(`Add new portfolio`);
        
        Client.addPortfolio('Test', (response) => {
            this.addPortfolioHelper(response.portfolio);
        });
    }
    
    addPortfolioHelper = (portfolio) => {
        this.setState(state => {
            this.state.portfolios.push(portfolio);
            return {portfolios: state.portfolios};
        });
    }
    
    deletePortfolio = () => {
        var portfolioID = this.state.selectedPortfolio.id;
        console.log(`Delete portfolio ${portfolioID}`);
        
        Client.removePortfolio(this.state.selectedPortfolio.id, (response) => {
            this.setState({
                overlay: false,
                selectedPortfolio: undefined
            });
        });
    }
    
    renderAdminPanel() {
        if (this.state.selectedPortfolio) {
            return <PortfolioAdmin  portfolio={this.state.selectedPortfolio}
                                    currentUser={this.state.user}
                                    closeForm={this.editPortfolio}
                                    deletePortfolio={this.deletePortfolio}
                                    socket={socket}
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
                        <Portfolio key={portfolio.id} portfolio={portfolio}
                                   socket={socket}
                                   editPortfolio={this.editPortfolio}
                        />
                    )}
                    
                    <button id="new-portfolio-button" onClick={this.addPortfolio}></button>
                </div>
                
                {this.renderAdminPanel()}
            </div>
        );
    }
}

export default Dashboard;
