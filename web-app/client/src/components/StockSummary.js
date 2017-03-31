import React, { Component } from 'react';
import './StockSummary.css';
import News from './News'
import CloseIcon from '../assets/close.svg';
import StockProperty from './StockProperty';
import DummyGraph from '../assets/graph.gif';

class StockPopup extends Component {
	constructor(props) {
		super(props);

		this.state = {
      	      name: props.company.name,
                  ticker: props.company.symbol,
                  price: props.company.last_price,
                  change_price: props.company.change_price,
                  change_percent: props.company.change_percent,

                  dividend: props.company.dividend,
                  yield: props.company.yield
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

{/*
Previous Close    831.41
Open  833.50
Bid   825.50 x 100
Ask   831.50 x 4300
Day's Range 829.00 - 833.68
52 Week Range     663.28 - 853.50
Volume      997,593
Avg. Volume 1,508,840
Market Cap  580.6B
Beta  0.94
PE Ratio (TTM)    29.83
EPS (TTM)   27.88
Earnings Date     N/A
Dividend & Yield  N/A (N/A)
Ex-Dividend Date  N/A
1y Target Est     970.75
*/}