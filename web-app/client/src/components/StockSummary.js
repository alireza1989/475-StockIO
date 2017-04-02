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
            ticker: props.stock.symbol,
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

    render() {
        return (
            <div className="stock-summary">
                <div className="stock-summary-form">
                    <div className="stock-header">
                        <a className="close-button" role="button" onClick={() => {this.props.closeForm();}}></a>
                        <h3>{this.state.name}</h3>
                    </div>

                    <div className="stock-information">
                        <ul>
                            <StockProperty name="Price" value={this.state.price}/>
                            <StockProperty name="Last Price" value={this.state.last_price}/>
                            <StockProperty name="Previous Close Price" value={this.state.prev_close}/>
                            <StockProperty name="Change" value={this.state.change_price}/>
                            <StockProperty name="Percent Change" value={this.state.change_percent}/>
                            <StockProperty name="Dividend" value={this.state.dividend}/>
                            <StockProperty name="Yield" value={this.state.yield}/>
                            <StockProperty name="CEO" value={this.state.ceo}/>
                            <StockProperty name="Sector" value={this.state.sector}/>
                        </ul>

                        <div className="stock-summary-chart"></div>
                    </div>

                    <StockNews />
                </div>
            </div>
        )
    }
}

export default StockPopup;