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
                const fiveDayHistory = historyObj.data.map(obj => obj);
                this.setState({fiveDayHistory});
				console.log(fiveDayHistory);
            }
        });

		Client.getOneYear(symbol, (history) => {
            // This will throw an error if the parent is closed before it loads
            if (this.state.mounted) {
				var historyObj = JSON.parse(history);
                const oneYearHistory = historyObj.data.map(obj => obj);
                this.setState({oneYearHistory});
				console.log(oneYearHistory);
            }
        });

		/*var chart =*/ C3.generate({
		    data: {
		        x: 'x',
		//        xFormat: '%Y%m%d', // 'xFormat' can be used as custom format of 'x'
		        columns: [
		            ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
		//            ['x', '20130101', '20130102', '20130103', '20130104', '20130105', '20130106'],
		            ['Stock Price', 30, 200, 100, 400, 150, 250],
		            //['data2', 130, 340, 200, 500, 250, 350]
		        ]
		    },
		    axis: {
		        x: {
		            type: 'timeseries',
		            tick: {
		                format: '%Y-%m-%d'
		            }
		        }
		    }
		});
	}

	render() {
		return (
			<div className="stock-property">
				<select>
				    <option value="five-day">5 Day</option>
				    <option value="one-month">1 Month</option>
				    <option value="three-month">3 Month</option>
				    <option value="one-year">1 Year</option>
				</select>
                <div id="chart"></div>
			</div>
		);
	}
}

export default StockSummaryChart;
