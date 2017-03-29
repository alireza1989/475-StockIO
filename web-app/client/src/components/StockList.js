import React, { Component } from 'react';
import StockTile from './StockTile';
import Client from './Client';
import Companies from '../data/companies.json';
import './StockList.css';

{/* PRD version */}
{/*
class StockList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            companies: []
        };
    }
   
    componentWillMount() {
        Client.getCompanies((companiesList) => { 
            const companies = companiesList.map(obj => obj); //Is this redundant? Check.
            this.setState({companies});
        }).catch(function(){
            const companies = Companies.companies;
            this.setState({companies});
        });
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
                    <ul>{this.state.companies.map((company, i) => <StockTile key={i} company={company}/>)}</ul>
                </div>
            </section>
        );
    }
}
*/}

{/* DEV version */}
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
