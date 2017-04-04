import React, { Component } from 'react';
import Client from './Client';
import PortfolioAdminNotification from './PortfolioAdminNotification';
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
            members: [],
            message: ''
		};
		
        Client.getStocks(this.props.portfolio.id, (portfolio) => {
            this.setState({stocks: portfolio.stocks});
        });
        
        Client.getMembers(this.props.portfolio.id, (members) => {
            // Remove current user from list
            members = members.users.filter(member => !(member.id === this.props.currentUser.id));
            this.setState({members: members});
        });

        this.props.socket.on('update' + this.props.portfolio.id, (data) => {
            var companyData = JSON.parse(data).Companies;
            this.setState({stocks: companyData});
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
    
    addStock = (event, symbol) => {
        Client.addStock(this.props.portfolio.id, symbol, (response) => {
            this.setState({message: response.message});
        });

        event.preventDefault();
    }
    
    removeStock = (stockID) => {
        Client.removeStock(this.props.portfolio.id, stockID, (response) => {
            this.setState({message: response.message});
        });
    }
    
    addMember = (event, body) => {
        Client.addMember(this.props.portfolio.id, body, (response) => {
            this.setState({message: response.message});
        });

        event.preventDefault();
    }
    
    removeMember = (memberID) => {
        Client.removeMember(this.props.portfolio.id, memberID, (response) => {
            this.setState({message: response.message});
        });
    }

    renderStocks = () => {        
        if (this.state.stocks.length > 0) {
            return this.state.stocks.map((stock, i) =>
                <PortfolioAdminStock key={stock.id} id={stock.id} name={stock.name} symbol={stock.symbol}
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
                <PortfolioAdminMember key={member.id} id={member.id} name={member.username}
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
                    
                    <PortfolioAdminNotification message={this.state.message}/>
                    
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
