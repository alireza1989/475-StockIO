import React, { Component } from 'react';
import './PortfolioAdminStockEntry.css';

class PortfolioAdminStockEntry extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
            name: ''
		};

        this.getStock = this.getStock.bind(this);
	}

    getStock(event) {
        this.setState({name: event.target.value});        
    }
    
    render() {
        return (
            <form onSubmit={this.props.addStock}>
                <input type="text"  name="portfolio-stock-entry" placeholder="Add new stock by symbol or name"
                                    value={this.state.name} onChange={this.getStock}/>
                <input type="submit" value="Submit"/>
            </form>
        );
    }
}

export default PortfolioAdminStockEntry;
