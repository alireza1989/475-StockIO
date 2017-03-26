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
        const stockUp = this.state.change_price >= 0;
        return (
            <li className="stock-tile">
                <div className={"stock-tile-content " + (stockUp ? 'stock-tile-content-up' : 'stock-tile-content-down')}>
                    <h1>{this.state.price}</h1>
                    {/* get currency from user preferences*/}
                    <p className="stock-tile-currency">USD</p>
                    <p>{this.state.name} ({this.state.ticker})</p>
                    <div className="stock-tile-up-or-down">
                        {stockUp ?  
                            <div className="stock-arrow-up"></div>
                            : <div className="stock-arrow-down"></div>
                        }
                        <p>{this.state.change_price} ({this.state.change_percent})</p>
                    </div>
                </div>
            </li>
        );
    }
}

export default StockTile;