import React, { Component } from 'react';
//import D3 from 'd3';
import c3 from 'c3';
import './StockSummaryChart.css';
import Client from './Client';

class StockSummaryChart extends Component {
	constructor(props) {
		super(props);

		this.state = {
            ticker: props.symbol,
            data: [
                ['x', '2017-04-03', '2017-04-04', '2017-04-05', '2017-04-06', '2017-04-07'],
                ['data', 146.92, 145.5, 143.62, 143.74, 143.11]
            ]
        };
	}
	
	componentDidMount() {
        var chart = c3.generate({
            bindto: '#chart',
            legend: { show: false },
            size: { width: 430 },
            data: {
                x: 'x',
                columns: [
                    ['x', '2017-04-03', '2017-04-04', '2017-04-05', '2017-04-06', '2017-04-07'],
                    ['data', 146.92, 145.5, 143.62, 143.74, 143.11]
                ]
            },
            axis: {
		        x: {
		            type: 'timeseries',
		            tick: { format: '%m/%d' }
		        }
		    }
        });
	}
	
	updateChart = () => {
        Client.getFiveDay(this.state.ticker, (history) => {
			history = JSON.parse(history);
			console.log(history.data);
        });
	}

	render() {    	
		return (
			<div className="stock-summary-chart">			    
                <div id="chart"></div>

			    <ul className="stock-summary-chart-options">
			        <li className='active'>5 Days</li>
			        <li>1 Year</li>
			    </ul>
			</div>
		);
	}
}

export default StockSummaryChart;
