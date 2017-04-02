import React, { Component } from 'react';
import './PortfolioAdminMember.css';

class PortfolioAdminMember extends Component {;
	constructor(props) {
		super(props);
        this.removeMember = this.removeMember.bind(this);
	}
	
	removeMember() {
        this.props.removeMember(this.props.id);
	}
	
    render() {
        return (
            <li className="portfolio-member">   
                {this.props.name}
                {(this.props.permission === 'admin') ?
                    <a className="delete-button" onClick={this.removeMember}></a> : ''}
            </li>
        );
    }
}

export default PortfolioAdminMember;
