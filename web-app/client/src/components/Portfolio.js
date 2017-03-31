import React, { Component } from 'react';
import PortfolioCell from './PortfolioCell';
import Client from './Client';
import './Portfolio.css';

class Portfolio extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            companies: []
        };
        
        
    }
   
    componentWillMount() {
        Client.getCompanies((companiesList) => { 
            const companies = companiesList.map(obj => obj); //Is this redundant? Check.
            this.setState({companies});
        });
    }
    
    editPortfolio() {
        this.props.editPortfolio(this.props.id);
    }

    render() {
        return (
            <section className="stock-list">
                <h2 className="stock-list-header">
                    {this.props.name}
                    <span className="stock-list-edit" onClick={() => {
                        this.props.editPortfolio(this.props.id);
                    }}>Edit</span>
                </h2> 
                
                <div className="stock-list-navigation">
                    <span className="nav-button prev">&lsaquo;</span>
                    <span className="nav-button next">&rsaquo;</span>
                </div>
                
                <div className="stocks">
                    <ul>{this.state.companies.map((company, i) => <PortfolioCell key={i} company={company}/>)}</ul>
                </div>
            </section>
        );
    }
}

export default Portfolio;
