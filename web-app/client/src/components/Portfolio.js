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
