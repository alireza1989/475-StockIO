import React, { Component } from 'react';

class PortfolioMember extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className="portfolio-member">   
                {this.props.name}
                <a className="delete-button"></a>
            </li>
        );
    }
}

export default PortfolioMember;
