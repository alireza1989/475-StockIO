import React, { Component } from 'react';
import './PortfolioAdminNameEntry.css';

class PortfolioAdminNameEntry extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
            name: this.props.name
		};
	}
	
	componentDidMount() {
        if (this.portfolioNameInput !== undefined) {
            this.portfolioNameInput.focus();
        }
	}
    
    render() {
        return (
            <div className="dyn-fix" id="portfolio-admin-name">
                <form className="portfolio-name-entry" onSubmit={(event) => {
                    event.preventDefault();
                    this.props.updateName(this.state.name)
                }}>
                
                    <input type="submit" value="Update"/>
                
                    <input type="text"  name="portfolio-name" placeholder="Portfolio Name" 
                                        value={this.state.name} onChange={(e) => {
                                            this.setState({name: e.target.value})
                                        }}/>
                </form>
            </div>
        );
    }
}

export default PortfolioAdminNameEntry;
