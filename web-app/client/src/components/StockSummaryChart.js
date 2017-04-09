import React, { Component } from 'react';
import Client from './Client';
import {Line} from 'react-chartjs-2';
import './StockSummaryChart.css';

class StockSummaryChart extends Component {
	constructor(props) {
		super(props);

		this.state = {
            ticker: props.symbol,            
            data: {
                labels: ['2017-04-03', '2017-04-04', '2017-04-05', '2017-04-06', '2017-04-07'],
                datasets: [
                    {
                        label: 'Data',
                        data: [146.92, 145.5, 143.62, 143.74, 143.11],
                        lineTension: 0.1,
                        borderColor: 'red',
                        pointBorderColor: 'red',
                        pointBackgroundColor: 'red',
                        pointBorderWidth: 5,
                        pointHoverRadius: 5,
                        pointRadius: 2,
                        pointHitRadius: 20,
                    }
                ]
            }
        };
        
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
                <div id="chart">
                    <Line data={this.state.data} />
                </div>

			    <ul className="stock-summary-chart-options">
			        <li className='active'>5 Days</li>
			        <li>1 Year</li>
			    </ul>
			</div>
		);
	}
}

export default StockSummaryChart;
