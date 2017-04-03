import React, { Component } from 'react';
import './PortfolioAdminMemberEntry.css';

class PortfolioAdminMemberEntry extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
            username: ''
		};

        this.getMember = this.getMember.bind(this);
	}

    getMember(event) {
        this.setState({username: event.target.value});
    }
    
    render() {
        return (
            <form className="portfolio-add-member" onSubmit={(event) => {
                this.props.addMember(event, this.state.username)
                this.setState({symbol: ''});
            }}>
                <input type="text"  name="portfolio-member-entry" placeholder="Add new member by email"
                                    value={this.state.username} onChange={this.getMember}/>
                <input type="submit" value="Add"/>
            </form>
        );
    }
}

export default PortfolioAdminMemberEntry;
