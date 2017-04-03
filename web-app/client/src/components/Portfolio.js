import React, { Component } from 'react';
import PortfolioCell from './PortfolioCell';
import Client from './Client';
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
                        <ul>{this.state.stocks.map((stock, i) => <PortfolioCell key={i} stock={stock}/>)}</ul>
                    </div>
                </div>
            </section>
        );
    }
}

export default Portfolio;
