import React, { Component } from 'react';
import CloseIcon from '../assets/close.svg';

class ListAdmin extends Component {
	constructor(props) {
		super(props);

		this.state = {
            name:           props.company.name,
            ticker:         props.company.symbol,
            price:          props.company.last_price,
            change_price:   props.company.change_price,
            change_percent: props.company.change_percent
		};
	}

	render() {
		return (
            <div className="ListAdmin">

            </div>
		)
	}
}

export default StockPopup;
