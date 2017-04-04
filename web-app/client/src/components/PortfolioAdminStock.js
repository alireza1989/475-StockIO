import React, { Component } from 'react';
import './PortfolioAdminStock.css';

class PortfolioAdminStock extends Component {	    
    render() {
        return (
            <li className="portfolio-stock">   
                {this.props.symbol}
                {(this.props.permission === 'admin' || this.props.permission === 'write') ?
                    <a className="delete-button"
                       onClick={() => { this.props.removeStock(this.props.id) }}></a> : ''}
            </li>
        );
    }
}

export default PortfolioAdminStock;
