import React, { Component } from 'react';
import PortfolioCell from './PortfolioCell';
import Client from './Client';
import PortfolioAddStock from './PortfolioAddStock.js'
import './Portfolio.css';

class Portfolio extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            stocks: []
        };
        
        Client.getStocks(this.props.portfolio.id, (portfolio) => {
            this.setState({stocks: portfolio.stocks});
        });

        this.props.socket.on('updateStocks' + this.props.portfolio.id, (data) => {
            var companyData = JSON.parse(data).Companies;
            this.setState({stocks: companyData});
        });
    }
    
    renderEditButton = () => {
        var p = this.props.portfolio.permission;
        if (p === 'admin' || p === 'write') {
            return (
                <span className="portfolio-edit" onClick={() => {
                    this.props.editPortfolio(this.props.portfolio);
                }}>Edit</span>
            )
        }
    }

    render() {
        return (
            <section className="portfolio">
                <h2 className="portfolio-header">
                    {this.props.portfolio.name}
                    {this.renderEditButton()}
                </h2> 
                                
                <div className="portfolio-contents">
                    <div className="portfolio-navigation">
                        <a className="nav-button prev"></a>
                        <a className="nav-button next"></a>
                    </div>
                    
                    <div className="stocks">
                        <ul>
                            {(this.props.portfolio.permission === 'read') ? '' :
                                <PortfolioAddStock addStock={() => {this.props.editPortfolio(this.props.portfolio)}} />
                            }
                            {this.state.stocks.map((stock, i) => <PortfolioCell key={stock.id} socket={this.props.socket} stock={stock}/>)}
                        </ul>
                    </div>
                </div>
            </section>
        );
    }
}

export default Portfolio;
