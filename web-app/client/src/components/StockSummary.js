import React, { Component } from 'react';
import './StockSummary.css';

class StockPopup extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: props.company.name,
            ticker: props.company.symbol,
            price: props.company.last_price,
            change_price: props.company.change_price,
            change_percent: props.company.change_percent,
            /* need to add below?*/
            open: props.company.open,
            prev_close: props.company.prev_close,
            high: props.company.high,
            low: props.company.low,
            mkt_cap: props.company.mkt_cap,
            PE_ratio: props.company.PE_ratio,
            div_yield: props.company.div_yield
            /* 	graph_data: props.company....

            */
		};
	}

	render() {
		return {

		}
	}
}

export default StockPopup;
