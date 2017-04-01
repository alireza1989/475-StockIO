import React, { Component } from 'react';

class PortfolioStock extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className="portfolio-stock">   
                {this.props.symbol}
                <a className="delete-button"></a>
            </li>
        );
    }
}

export default PortfolioStock;
