import React, { Component } from 'react';
import './PortfolioAdminMemberEntry.css';

class PortfolioAdminMemberEntry extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
            name: ''
		};

        this.getMember = this.getMember.bind(this);
	}

    getMember(event) {
        this.setState({name: event.target.value});
    }
    
    render() {
        return (
            <input type="text"  name="portfolio-member-entry" placeholder="Add new member by username or email"
                                value={this.state.name} onChange={this.getMember}/>
        );
    }
}

export default PortfolioAdminMemberEntry;
