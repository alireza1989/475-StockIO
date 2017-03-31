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
    }
   
    componentWillMount() {
        Client.getStocks(this.props.id, (companiesList) => { 
            console.log(companiesList);
            const stocks = companiesList.Companies; 
            this.setState({stocks});
        });
    }
    
    editPortfolio() {
        this.props.editPortfolio(this.props.id);
    }

    render() {
        return (
            <section className="portfolio">
                <h2 className="portfolio-header">
                    {this.props.name}
                    <span className="portfolio-edit" onClick={() => {
                        this.props.editPortfolio(this.props.id);
                    }}>Edit</span>
                </h2> 
                
                <div className="portfolio-navigation">
                    <span className="nav-button prev">&lsaquo;</span>
                    <span className="nav-button next">&rsaquo;</span>
                </div>
                
                <div className="stocks">
                    <ul>{this.state.stocks.map((stock, i) => <PortfolioCell key={i} stock={stock}/>)}</ul>
                </div>
            </section>
        );
    }
}

export default Portfolio;
