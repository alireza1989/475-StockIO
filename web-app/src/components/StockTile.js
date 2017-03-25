import React, { Component } from 'react';
import './StockTile.css';

class StockTile extends Component {
    constructor(props) {
        super();
        this.state = {
            name: props.company.name,
            ticker: props.company.symbol,
            price: '140.64',
            change_price: '-0.28',
            change_percent: '-0.20%'
        };
    }
    
    render() {        
        return (
            <li className="stock-tile">
                <div className="stock-tile-content">
                    <p>{this.state.name} ({this.state.ticker})</p>
                    <p>{this.state.price}</p>
                    <p>{this.state.change_price}</p>
                </div>
            </li>
        );
    }
}

export default StockTile;