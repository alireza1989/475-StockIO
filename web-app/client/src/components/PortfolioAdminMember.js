import React, { Component } from 'react';
import './PortfolioAdminMember.css';

class PortfolioAdminMember extends Component {;
    render() {
        return (
            <li className="portfolio-member">   
                {this.props.name}
                {(this.props.permission === 'admin') ?
                    <a className="delete-button"
                       onClick={() => { this.props.removeMember(this.props.id) }}></a> : ''}
            </li>
        );
    }
}

export default PortfolioAdminMember;
