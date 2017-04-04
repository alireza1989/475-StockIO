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
            <div className="portfolio-add">
                <form className="portfolio-add-stock" onSubmit={(event) => {
                    this.props.addStock(event, this.state.symbol)
                    this.setState({symbol: ''});
                }}>
                    <input type="submit" value="Add"/>
                
                    <div className="dyn-fix">
                        <input type="text"  name="portfolio-stock-entry" placeholder="Add new stock by symbol or name"
                                            value={this.state.symbol} onChange={this.getStock}/>
                    </div>
                </form>
            </div>
        );
    }
}

export default PortfolioAdminStockEntry;
