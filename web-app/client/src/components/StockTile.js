import React, { Component } from 'react';
import './StockTile.css';

class StockTile extends Component {
    constructor(props) {
        super();
        this.state = {
            name: props.company.name,
            ticker: props.company.symbol,
            price: props.company.last_price,
            change_price: props.company.change_price,
            change_percent: props.company.change_percent
        };
    }
    
    render() {
        return (
            <li className="stock-tile">

                <div className={'stock-tile-content ' + ((this.state.change_price > 0) ? 'up' : 'down')}>
                    <div className="info">
                        <p className="name">{this.state.name}</p>
                        <h1>{this.state.ticker}</h1>
                    </div>
                    
                    <div className="details">
                        <p className="price">{this.state.price} <span className="price-currency">USD</span></p>
                        
                        <p className='price-change'>
                            {this.state.change_percent}%
                        </p>
                    </div>
                </div>
            </li>
            

        );
    }
}

export default StockTile;