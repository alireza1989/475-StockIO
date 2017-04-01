import React, { Component } from 'react';
import './StockSummary.css';
import News from './News'
import CloseIcon from '../assets/close.svg';
import StockProperty from './StockProperty';
import DummyGraph from '../assets/graph.gif';
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
            <div className="StockSummary-background">
                <div className="StockSummary">
                    <div className="stock-information">
                    <h3>{this.state.name}</h3>                              
                    <ul>
                        <StockProperty name="Price" value={this.state.price}/>
                        <StockProperty name="Last Price" value={this.state.last_price}/>
                        <StockProperty name="Previous Close Price" value={this.state.prev_close}/>
                        <StockProperty name="Change" value={this.state.change_price}/>
                        <StockProperty name="Percent Change" value={this.state.change_percent}/>
                    </ul>
                    <ul>
                        <StockProperty name="Dividend" value={this.state.dividend}/>
                        <StockProperty name="Yield" value={this.state.yield}/>
                        <StockProperty name="CEO" value={this.state.ceo}/>
                        <StockProperty name="Sector" value={this.state.sector}/>
                    </ul>
                    </div>
                    <div className="interactive-chart">
                    <img src={DummyGraph} alt="dummy graph here"/>
                    </div>

                    <News />

                    <img onClick={this.props.toggleSummary} className="close-button" src={CloseIcon} alt="X"/>
                </div>
            </div>
        )
    }
}

export default StockPopup;