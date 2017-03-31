import React, { Component } from 'react';
import './PortfolioAdmin.css';

class PortfolioAdmin extends Component {
	constructor(props) {
		super(props);

		this.state = {
            name: props.name,
		};
	}

	render() {
		return (
            <div className="portfolio-admin">
                <div className="portfolio-admin-form">
                    <h3>{this.state.name}</h3>
                    
                    <ul id="portfolio-admin-stocks">
                        <li>Stock 1</li>
                    </ul>
                    
                    <ul id="portfolio-admin-users">
                        <li>User 1</li>
                    </ul>
                </div>
            </div>
		)
	}
}

export default PortfolioAdmin;
