import React, { Component } from 'react';
import './PortfolioAdminStockEntry.css';

class PortfolioAdminStockEntry extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
            symbol: ''
		};

        this.getStock = this.getStock.bind(this);
	}

    getStock(event) {
        this.setState({symbol: event.target.value});        
    }
    
    render() {
        return (
            <form className="portfolio-add-stock" onSubmit={(event) => {
                this.props.addStock(event, this.state.symbol)
                this.setState({symbol: ''});
            }}>
                <input type="text"  name="portfolio-stock-entry" placeholder="Add new stock by symbol or name"
                                    value={this.state.symbol} onChange={this.getStock}/>
                <input type="submit" value="Add"/>
            </form>
        );
    }
}

export default PortfolioAdminStockEntry;
