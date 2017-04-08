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
            fiveDayHistory: ['x'],
			oneYearHistory: ['Stock Price'],
			fiveDayDates: ['x'],
			fiveDayPrice: ['Stock Price'],
			oneYearDates: ['x'],
			oneYearPrice: ['Stock Price'],
            mounted: true
        };
	}



	componentDidMount() {

		var chart =  C3.generate({
		    data: {
		        x: 'x',
		        columns: [
		            window.fiveDayDates,
		            window.fiveDayPrice,
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

		setTimeout(function () { chart.load({columns: [window.fiveDayDates, window.fiveDayPrice,]}); }, 500);
	}

	componentWillMount(){

		var symbol = this.state.ticker;
		window.fiveDayDates = ['x'];
		window.fiveDayPrice = ['Stock Price'];
		window.oneYearDates = ['x'];
		window.oneYearPrice = ['Stock Price'];

		Client.getFiveDay(symbol, (history) => {
            // This will throw an error if the parent is closed before it loads
            if (this.state.mounted) {
				var historyObj = JSON.parse(history);
                const fiveDayHistory = historyObj.data.map(obj => obj);
                this.setState({fiveDayHistory});

				historyObj.data.forEach(function(data){
					window.fiveDayDates.push(data.date);
					window.fiveDayPrice.push(data.value);
				});

            }
        });

		Client.getOneYear(symbol, (history) => {
            // This will throw an error if the parent is closed before it loads
            if (this.state.mounted) {
				var historyObj = JSON.parse(history);
                const oneYearHistory = historyObj.data.map(obj => obj);
                this.setState({oneYearHistory});

				oneYearHistory.forEach(function(data){
					window.oneYearDates.push(data.date);
					window.oneYearPrice.push(data.value);
				});

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
