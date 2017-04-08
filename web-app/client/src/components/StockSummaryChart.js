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
            fiveDayHistory: [],
			oneYearHistory: [],
            mounted: true
        };
	}
	componentDidMount() {

		var symbol = this.state.ticker;

		Client.getFiveDay(symbol, (history) => {
            // This will throw an error if the parent is closed before it loads
            if (this.state.mounted) {
				var historyObj = JSON.parse(history);
				//console.log(historyObj);
                const fiveDayHistory = historyObj.data.map(obj => obj);
                this.setState({fiveDayHistory});
				console.log(fiveDayHistory);
            }
        });

		Client.getOneYear(symbol, (history) => {
            // This will throw an error if the parent is closed before it loads
            if (this.state.mounted) {
				var historyObj = JSON.parse(history);
				//console.log(historyObj);
                const oneYearHistory = historyObj.data.map(obj => obj);
                this.setState({oneYearHistory});
				console.log(oneYearHistory);
            }
        });

		//var dates = this.state.fiveDayHistory.map(obj => obj);
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
