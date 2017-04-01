import React, { Component } from 'react';
import './PortfolioAdminStock.css';

class PortfolioAdminStock extends Component {
	constructor(props) {
		super(props);
        this.removeStock = this.removeStock.bind(this);
	}
	
    removeStock() {
        this.props.removeStock(this.props.id);
    }
    
    render() {
        return (
            <li className="portfolio-stock">   
                {this.props.symbol}
                <a className="delete-button" onClick={this.removeStock}></a>
            </li>
        );
    }
}

export default PortfolioAdminStock;
