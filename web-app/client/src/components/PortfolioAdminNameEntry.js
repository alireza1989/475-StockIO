import React, { Component } from 'react';
import './PortfolioAdminNameEntry.css';

class PortfolioAdminNameEntry extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
    		active: false,
            name: this.props.name,
    		name_current: this.props.name
		};
	}
	
	componentDidMount() {
        if (this.portfolioNameInput !== undefined) {
            this.portfolioNameInput.focus();
        }
	}
	
    changeName = (event) => {        
        this.setState({
            active: event.target.value !== this.state.name ? true : false,
            name_current: event.target.value
        });
    }
    
    render() {
        return (
            <div className="dyn-fix" id="portfolio-admin-name">
                <form className="portfolio-name-entry" onSubmit={(event) => {
                    event.preventDefault();
                    this.props.updateName(this.state.name_current);
                    
                    this.setState({
                        active: false,
                        name: this.state.name_current
                    });
                }}>
                
                    <input className={this.state.active ? `active` : `disabled`} type="submit" value="Update"/>
                
                    <input type="text"  name="portfolio-name" placeholder="Portfolio Name" 
                                        value={this.state.name_current} onChange={this.changeName}/>
                </form>
            </div>
        );
    }
}

export default PortfolioAdminNameEntry;
