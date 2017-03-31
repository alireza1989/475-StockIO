import React, { Component } from 'react';
import './StockProperty.css';

class StockProperty extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: props.name,
			value: props.value
		}
	}

	render() {
		return (
			<li className="StockProperty">
				<h4>{this.state.name}</h4>
				{(this.state.value == null) ? 
					<p>N/A</p>
					: <p>{this.state.value}</p>
				}
			</li>
		);
	}
}

export default StockProperty;

