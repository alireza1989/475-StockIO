import React, { Component } from 'react';
//import D3 from 'd3';
import C3 from 'c3';
import './StockSummaryChart.css';
import Client from './Client';


class StockSummaryChart extends Component {
	constructor(props) {
		super(props);

		this.state = {
            ticker: props.symbol,
            intraDayHiatory: [],
			dailyHistory: [],
            mounted: true
        };
	}
	componentDidMount() {

		var symbol = this.state.ticker;

		Client.getIntraDayHistory(symbol, (history) => {
            // This will throw an error if the parent is closed before it loads
            if (this.state.mounted) {
                const intraDayHiatory = history.map(obj => obj);
                this.setState({intraDayHiatory});
            }
        });
		console.log(this.state.intraDayHiatory);
		/*var chart =*/ C3.generate({
		bindto: '#chart',
		data: {
		  columns: [
		    ['data1', 30, 200, 100, 400, 150, 250],
		  ],
		  axes: {
		    data2: 'y2' // ADD
		  }
		},
		});
	}

	render() {
		return (
			<div className="stock-property">
                <div id="chart"></div>
			</div>
		);
	}
}

export default StockSummaryChart;
