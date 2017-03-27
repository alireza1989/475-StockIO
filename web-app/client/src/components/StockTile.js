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
            change_percent: '-0.20'
        };
    }
    
    render() {
        return (
            <li className="stock-tile">
                <div className={'stock-tile-content ' + ((this.state.change_price > 0) ? 'up' : 'down')}>
                    <h1>{this.state.ticker}</h1>
                    
                    <p className='price-change'>
                        {this.state.change_percent}%
                    </p>
                    
                    <div className="details">
                        <p className="name">{this.state.name}</p>
                        <p className="price">{this.state.price} <span className="price-currency">USD</span></p>
                    </div>
                </div>
            </li>
            

        );
    }
}

export default StockTile;