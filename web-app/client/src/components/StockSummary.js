import React, { Component } from 'react';
import './StockSummary.css';
import StockProperty from './StockProperty';
import StockNews from './StockNews';
// const io = require('socket.io-client');
// const socket = io();

class StockPopup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.stock.name,
            ticker: props.stock.ticker,
            price: props.stock.price,
            last_price: props.stock.last_price,
            prev_close: props.stock.prev_close,
            change_price: props.stock.change_price,
            change_percent: props.stock.change_percent,
            dividend: props.stock.dividend,
            yield: props.stock.yield,
            sector: props.stock.sector,
            ceo: props.stock.ceo,            
        };
    }
    
	componentDidMount() {
        if (this.summaryForm !== undefined) {
            this.summaryForm.focus();
        }
	}

    handleKeyDown = (event) => {        
        // Permit closing dialog with escape key
        if (event.keyCode === 27) {
            this.props.closeForm();
        }
    }

    render() {        
        return (
            <div className="stock-summary">
                <div className="stock-summary-form" tabIndex="0" onKeyDown={this.handleKeyDown}
                     ref={(form) => { this.summaryForm = form; }}>
                    <div className="stock-header">
                        <a className="close-button" role="button" onClick={() => {this.props.closeForm();}}></a>
                        <h3>
                            {this.state.name}
                            <span className={`stock-price ${(this.state.change_price > 0) ? 'up' : 'down'}`}>{this.state.price}</span>
                        </h3>
                    </div>

                    <div className="stock-information">
                        <ul>
                            <StockProperty name="Change" value={this.state.change_price}/>
                            <StockProperty name="Pct. Change" value={`${this.state.change_percent}%`}/>
                            <StockProperty name="Last Price" value={this.state.last_price}/>
                            <StockProperty name="Prev. Close" value={this.state.prev_close}/>
                            <StockProperty name="Dividend" value={this.state.dividend}/>
                            <StockProperty name="Yield" value={this.state.yield}/>
                            <StockProperty name="Sector" value={this.state.sector}/>
                            <StockProperty name="CEO" value={this.state.ceo}/>
                        </ul>

                        <div className="stock-summary-chart"></div>
                    </div>

                    <StockNews symbol={this.state.ticker}/>
                </div>
            </div>
        )
    }
}

export default StockPopup;