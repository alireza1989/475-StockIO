import React, { Component } from 'react';
import './PortfolioCell.css';

class PortfolioAddStock extends Component {
    render() {
        return (
            <li className='portfolio-cell add-stock-button'>
                <div className='portfolio-cell-content' onClick={this.props.addStock}>+</div>
            </li>
        );
    }
}

export default PortfolioAddStock;
