import React, { Component } from 'react';
//import D3 from 'd3';
import C3 from 'c3';
import './StockSummaryChart.css';


class StockSummaryChart extends Component {
	constructor(props) {
		super(props);

		this.state = {

		}
	}
	componentDidMount() {
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
