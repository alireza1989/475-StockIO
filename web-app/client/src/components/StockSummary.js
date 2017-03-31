import React, { Component } from 'react';
import './StockSummary.css';
import News from './News'
import CloseIcon from '../assets/close.svg';

class StockPopup extends Component {
	constructor(props) {
		super(props);

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
                  <div className="StockSummary">
                        <div className="stock-information">
                              <h3>{this.state.name}</h3>
                              <p>info...</p>
                        </div>
                        <div className="interactive-chart">

                        </div>

                        <News />

                        <img onClick={this.props.toggleSummary} className="close-button" src={CloseIcon} alt="X"/>
                  </div>
		)
	}
}

export default StockPopup;
