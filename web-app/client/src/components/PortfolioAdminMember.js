import React, { Component } from 'react';
import './PortfolioAdminMember.css';

class PortfolioAdminMember extends Component {;
    render() {
        return (
            <li className={`portfolio-member ${(this.props.permission !== 'admin') ? 'no-edit' : ''}`}>
                {`${this.props.member.firstname} ${this.props.member.lastname}`}
                {(this.props.permission === 'admin') ?
                    <a className="delete-button"
                       onClick={() => { this.props.removeMember(this.props.member) }}></a> : ''}
            </li>
        );
    }
}

export default PortfolioAdminMember;
