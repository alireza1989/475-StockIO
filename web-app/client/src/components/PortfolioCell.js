import React, { Component } from 'react';
import StockSummary from './StockSummary';
import './PortfolioCell.css';

class PortfolioCell extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            name: props.stock.name,
            ticker: props.stock.symbol,
            price: props.stock.last_price,
            last_price: props.stock.last_price,
            prev_close: props.stock.previous_close_price,
            change_price: props.stock.change_price,
            change_percent: props.stock.change_percent,
            dividend: props.stock.dividend,
            yield: props.stock.yield,
            sector: props.stock.sector,
            ceo: props.stock.ceo,
            summary_visible: false
        };
        
    }

    toggleSummary = () => {
        this.setState({
            summary_visible: !this.state.summary_visible
        });
    }

    render() {
        return (
            <li className="portfolio-cell">

                <div className={`portfolio-cell-content ${(this.state.change_price > 0) ? 'up' : 'down'}`} onClick={this.toggleSummary}>
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

                {this.state.summary_visible ?
                    <StockSummary stock={this.state} closeForm={this.toggleSummary}/> : ''}
            </li>


        );
    }
}

export default PortfolioCell;
