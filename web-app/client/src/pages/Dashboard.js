import React, { Component } from 'react';
import Portfolio from '../components/Portfolio';
import PortfolioCreate from '../components/PortfolioCreate';
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
            newPortfolio: false,
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

        socket.on('editPortfolioName', (data) => {
            var portfolioData = JSON.parse(data);
            var portfolioId = portfolioData.id;
            var index = Client.getIndex(portfolioId, this.state.portfolios);
            if (index !== -1) {
                this.setState(state => {
                    var portfolio = this.state.portfolios[index];
                    portfolio.name = portfolioData.name;
                })
            }
        });

        socket.on('deletePortfolio', (data) => {
            var portfolioId = JSON.parse(data).portfolioId;
            var index = Client.getIndex(portfolioId, this.state.portfolios);
            if (index !== -1) {
                this.setState(state => {
                    // If user is currently editing portfolio being removed, must dismiss admin panel
                    var portfolio = this.state.portfolios[index];
                    var selected = (this.state.selectedPortfolio === portfolio) ?
                                        undefined : this.state.selectedPortfolio

                    // Remove portfolio
                    this.state.portfolios.splice(index, 1);

                    // Update state
                    return {
                        selectedPortfolio: selected,
                        portfolios: state.portfolios
                    }
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

    addPortfolio = (portfolioName) => {
        console.log(`Add portfolio ${portfolioName}`);

        Client.addPortfolio(portfolioName, (response) => {
            this.addPortfolioHelper(response.portfolio);
        });
    }

    addPortfolioHelper = (portfolio) => {
        this.setState(state => {
            this.state.portfolios.push(portfolio);
            return {
                newPortfolio: false,
                portfolios: state.portfolios
            };
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
                                    socket={socket}/>
        }
    }

    renderCreatePanel() {
        if (this.state.newPortfolio === true) {
            return <PortfolioCreate closeForm={() => {this.setState({newPortfolio: false})}}
                                    savePortfolio={this.addPortfolio}/>
        }
    }

    render() {
        return (
            <div className={`App ${this.state.overlay ? 'no-scroll' : ''}`}>
                <nav>
                    <ul>
                        <li className="nav-title">Stock.I<img src={logo} alt="O"/></li>
                        <li onClick={() => {Client.logout()}} className="right nav-button">Logout</li>
                        <li className="right" id="account-info">
                            {`${this.state.user.firstname} ${this.state.user.lastname}`}
                            <span>{this.state.user.username}</span>
                        </li>
                    </ul>
                </nav>

                <div className="Dashboard">
                    {this.state.portfolios.map((portfolio, i) =>
                        <Portfolio key={portfolio.id} portfolio={portfolio}
                                   socket={socket}
                                   editPortfolio={this.editPortfolio}
                        />
                    )}

                    <button id="new-portfolio-button" onClick={() => { this.setState({newPortfolio: true}) }}></button>
                </div>

                {this.renderCreatePanel()}
                {this.renderAdminPanel()}
            </div>
        );
    }
}

export default Dashboard;
