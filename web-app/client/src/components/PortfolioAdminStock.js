import React, { Component } from 'react';
import './PortfolioAdminStock.css';

class PortfolioAdminStock extends Component {	    
    render() {
        return (
            <li className="portfolio-stock">   
                {this.props.stock.symbol}
                <span className="portfolio-stock-name">{this.props.stock.name}</span>
                {(this.props.permission === 'admin' || this.props.permission === 'write') ?
                    <a className="delete-button"
                       onClick={() => { this.props.removeStock(this.props.stock) }}></a> : ''}
            </li>
        );
    }
}

export default PortfolioAdminStock;
