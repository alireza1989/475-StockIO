import React, { Component } from 'react';
import './StockSummary.css';
import News from './News'
import CloseIcon from '../assets/close.svg';
import StockProperty from './StockProperty';
import DummyGraph from '../assets/graph.gif';
const io = require('socket.io-client');
const socket = io();

class StockPopup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.stock.name,
            ticker: props.stock.symbol,
            price: props.stock.price,
            change_price: props.stock.change_price,
            change_percent: props.stock.change_percent,
            dividend: props.stock.dividend,
            yield: props.stock.yield
        };
    }

    render() {
        return (
            <div className="StockSummary">
                <div className="stock-information">
                <h3>{this.state.name}</h3>                              
                <ul>
                    <StockProperty name="Price" value={this.state.price}/>
                    <StockProperty name="Change" value={this.state.change_price}/>
                    <StockProperty name="Percent Change" value={this.state.change_percent}/>
                    <StockProperty name="Dividend" value={this.state.dividend}/>
                    <StockProperty name="Yield" value={this.state.yield}/>
                </ul>
                <ul>
                <StockProperty name="Title" value="test"/>
                <StockProperty name="Title" value="test"/>
                <StockProperty name="Title" value="test"/>
                <StockProperty name="Title" value="test"/>                                    
                <StockProperty name="Title" value="test"/>
                </ul>
                </div>
                <div className="interactive-chart">
                <img src={DummyGraph} alt="dummy graph here"/>
                </div>

                <News />

                <img onClick={this.props.toggleSummary} className="close-button" src={CloseIcon} alt="X"/>
            </div>
        )
    }
}

export default StockPopup;