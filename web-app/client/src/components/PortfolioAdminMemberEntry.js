import React, { Component } from 'react';
import './PortfolioAdminMemberEntry.css';

class PortfolioAdminMemberEntry extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
    		active: false,
            username: '',
            permission: 'write'
		};
	}

    getMember = (event) => {
        this.setState({
            active: event.target.value ? true : false,
            username: event.target.value
        });
    }
    
    render() {
        return (
            <div className="portfolio-add">
                <form className="portfolio-add-member" onSubmit={(e) => {
                    e.preventDefault();
                    this.props.addMember(this.state)
                    
                    this.setState({
                        active: false,
                        username: ''
                    });
                }}>
                    <input className={this.state.active ? `active` : `disabled`} type="submit" value="Add"/>
                    
                    <select name="portfolio-member-permission" value={this.state.permission}
                            onChange={(event) => { this.setState({permission: event.target.value}) }}>
                        <option value="write">Write</option>
                        <option value="read">Read</option>
                    </select>
                    
                    <div className="dyn-fix">
                        <input type="text"  name="portfolio-member-entry" placeholder="Add new member by email"
                                            value={this.state.username} onChange={this.getMember}/>
                    </div>
                </form>
            </div>
        );
    }
}

export default PortfolioAdminMemberEntry;
