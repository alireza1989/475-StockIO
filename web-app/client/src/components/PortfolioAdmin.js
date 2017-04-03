import React, { Component } from 'react';
import Client from './Client';
import PortfolioAdminStockEntry from './PortfolioAdminStockEntry';
import PortfolioAdminStock from './PortfolioAdminStock';
import PortfolioAdminMemberEntry from './PortfolioAdminMemberEntry';
import PortfolioAdminMember from './PortfolioAdminMember';
import './PortfolioAdmin.css';

class PortfolioAdmin extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
            name: this.props.portfolio.name,
            permission: this.props.portfolio.permission,
            stocks: [],
            members: []
		};
		
        Client.getStocks(this.props.portfolio.id, (portfolio) => {
            this.setState({stocks: portfolio.stocks});
        });
        
        Client.getMembers(this.props.portfolio.id, (members) => {
            // Remove current user from list
            members = members.users.filter(member => !(member.id === this.props.currentUser.id));
            this.setState({members: members});
        });
	}
	
	componentDidMount() {
        if (this.portfolioNameInput !== undefined) {
            this.portfolioNameInput.focus();
        }
	}
    
    updatePortfolioName = (e) => {
        console.log(`Update portfolio name to "${e.target.value}"`);
        this.setState({name: event.target.value});
    }
    
    addMember = (event) => {
        console.log("Adding member");
        event.preventDefault();
    }
    
    removeMember = (id) => {
        console.log(`Removing member ${id}`);
    }
    
    addStock = (event, symbol) => {        
        console.log("Adding stock");

        Client.addStock(this.props.portfolio.id, symbol, (response) => {
            console.log("Stock added?");
            console.log(response);
        });

        event.preventDefault();
    }
    
    removeStock = (id) => {
        console.log(`Removing stock ${id}`);
    }

    renderStocks = () => {        
        if (this.state.stocks.length > 0) {
            return this.state.stocks.map((stock, i) =>
                <PortfolioAdminStock key={i} id={stock.id} name={stock.name} symbol={stock.symbol}
                                     permission={this.state.permission} 
                                     removeStock={this.removeStock}/>
            );
        } else {
            return <li className="empty-section-row">No stocks</li>
        }
    }
    
    renderMembers = () => {         
        if (this.state.members.length > 0) {
            return this.state.members.map((member, i) =>
                <PortfolioAdminMember key={i} id={member.id} name={member.username}
                                      permission={this.state.permission} 
                                      removeMember={this.removeMember}/>
            );
        } else {
            return <li className="empty-section-row">No other members</li>
        }
    }

	render() {
		return (
            <div className="portfolio-admin">
                <div className="portfolio-admin-form">
                    <a className="close-button" role="button" onClick={this.props.closeForm}></a>

                    {(this.state.permission !== 'admin') ? <h3>{this.state.name}</h3> :
                        <input type="text"  name="portfolio-name" placeholder="Portfolio Name" 
                                            value={this.state.name} onChange={this.updatePortfolioName}
                                            ref={(input) => { this.portfolioNameInput = input; }}/>}
                    
                    <PortfolioAdminStockEntry addStock={this.addStock}/>
                    
                    <ul id="portfolio-admin-stocks">
                        {this.renderStocks()}
                    </ul>
                    
                    {(this.state.permission === 'admin') ? <PortfolioAdminMemberEntry addMember={this.addMember}/> : ''}
                    <ul id="portfolio-admin-members">
                        {this.renderMembers()}
                    </ul>
                </div>
            </div>
		)
	}
}

export default PortfolioAdmin;
