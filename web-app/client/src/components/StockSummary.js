import React, { Component } from 'react';
import './StockSummary.css';
import CloseIcon from '../assets/close.png';

class StockPopup extends Component {
	constructor(props) {
		super(props);

		this.state = {
      	
    		};

	}

	render() {
		return (
                  <div className="StockSummary">
                        
                        <img onClick = {this.props.handler} className="close-button" src={CloseIcon} alt="X"/>
                  </div>
		)
	}
}

export default StockPopup;
