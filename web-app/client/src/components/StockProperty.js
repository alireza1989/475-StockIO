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
			<li className="stock-property">
                {this.state.name}
                <span className="stock-property-value">{(this.state.value == null) ? 'N/A' : this.state.value}</span>
			</li>
		);
	}
}

export default StockProperty;

