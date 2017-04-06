import React, { Component } from 'react';
import './PortfolioAdminStockEntry.css';

class PortfolioAdminStockEntry extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
    		active: false,
            symbol: ''
		};
	}
	
	componentDidMount() {
        if (this.stockInput !== undefined) {
            this.stockInput.focus();
        }
	}

    getStock = (event) => {
        this.setState({
            active: event.target.value ? true : false,
            symbol: event.target.value
        });
    }
    
    render() {
        return (
            <div className="portfolio-add">
                <form className="portfolio-add-stock" onSubmit={(e) => {
                    e.preventDefault();
                    this.props.addStock(this.state.symbol)
                    
                    this.setState({
                        active: false,
                        symbol: ''
                    });
                }}>
                    <input className={this.state.active ? `active` : `disabled`} type="submit" value="Add"/>
                
                    <div className="dyn-fix">
                        <input type="text"  name="portfolio-stock-entry" placeholder="Add new stock by symbol"
                                            value={this.state.symbol} onChange={this.getStock}
                                            ref={(input) => { this.stockInput = input; }}/>
                    </div>
                </form>
            </div>
        );
    }
}

export default PortfolioAdminStockEntry;
