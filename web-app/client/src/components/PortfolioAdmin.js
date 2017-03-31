import React, { Component } from 'react';
import './PortfolioAdmin.css';

class PortfolioAdmin extends Component {
	constructor(props) {
		super(props);
        console.log(props.name);
		this.state = {
            name: props.name,
		};
	}
	
    componentWillMount() {
        // API call to get admin details for portfolio
        this.setState({
            name: 'Technology',
            stocks: ['AAPL', 'MSFT', 'TSLA', 'AMZN', 'FB', 'INTL'],
            members: [
                {
                    id: 1,
                    name: 'Elliot'
                }, {
                    id: 2,
                    name: 'Bonnie'
                }, {
                    id: 3,
                    name: 'Sherlock'
                }, {
                    id: 4,
                    name: 'Sarah'
                }, {
                    id: 5,
                    name: 'Ali'
                }
            ]
        });
    }
    
    closeForm() {
        console.log('hide');
    }

	render() {
		return (
            <div className="portfolio-admin">
                <div className="portfolio-admin-form">
                    <input type="text" name="portfolio-name" defaultValue={this.state.name}/>

                    <button name="close-form" onClick={() => {
                        this.props.cancelChanges();
                    }}>X</button>
                    
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
