import React, { Component } from 'react';
import StockTile from './StockTile';
import Companies from '../data/companies.json';
import './StockList.css';

class StockList extends Component {
    constructor(props) {
        super(props);
        this.companies = Companies.companies;
    }

    render() {
        return (
            <section className="stock-list">
                <h2 className="stock-list-header">
                    {this.props.name}
                    <span className="stock-list-edit">Edit</span>
                </h2>
                
                <div className="stock-list-navigation">
                    <span className="nav-button prev">&lsaquo;</span>
                    <span className="nav-button next">&rsaquo;</span>
                </div>
                
                <div className="stocks">
                    <ul>{this.companies.map((company, i) => <StockTile key={i} company={company}/>)}</ul>
                </div>
            </section>
        );
    }
}

export default StockList;