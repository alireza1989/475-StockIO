import React, { Component } from 'react';
import Client from './Client';
import PortfolioAdminNotification from './PortfolioAdminNotification';
import PortfolioAdminNameEntry from './PortfolioAdminNameEntry';
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
            notification: '',
            delConfirm: false
		};
		
        Client.getStocks(this.props.portfolio.id, (portfolio) => {
            this.setState({stocks: portfolio.stocks});
        });
        
        Client.getMembers(this.props.portfolio.id, (members) => {
            this.memberHelper(members.users);
        });
        
        this.props.socket.on('updateStocks' + this.props.portfolio.id, (data) => {
            var companyData = JSON.parse(data).Companies;
            this.setState({stocks: companyData});
        });
        
        this.props.socket.on('updateMembers' + this.props.portfolio.id, (data) => {
            var members = JSON.parse(data).Users;
            this.memberHelper(members);
        });
	}
    
    updateName = (portfolioName) => {
        Client.updatePortfolioName(this.props.portfolio.id, portfolioName, (response) => {
            this.setState({name: portfolioName});
        });
    }
    
    addStock = (symbol) => {
        Client.addStock(this.props.portfolio.id, symbol, (response) => {
            this.setState({notification: response});
        });
    }
    
    removeStock = (stockID) => {
        Client.removeStock(this.props.portfolio.id, stockID, (response) => {
            this.setState({notification: response});
        });
    }
    
    addMember = (body) => {
        Client.addMember(this.props.portfolio.id, body, (response) => {
            this.setState({notification: response});
        });
    }
    
    removeMember = (memberID) => {
        Client.removeMember(this.props.portfolio.id, memberID, (response) => {
            this.setState({notification: response});
        });
    }
    
    memberHelper = (members) => {
        // Remove current user from list
        members = members.filter(member => !(member.id === this.props.currentUser.id));
        this.setState({members: members});
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
    
    renderDeleteButton = () => {
        if (this.state.permission === 'admin') {
            if (this.state.delConfirm === false) {
                return (
                    <div className="portfolio-admin-footer">
                        <a className="portfolio-delete-button" role="button"
                           onClick={() => { this.setState({delConfirm: true}) }}>Delete Portfolio</a>
                    </div>
                )
            } else {
                return (
                    <div className="portfolio-admin-footer">
                        <a className="portfolio-delete-button" role="button"
                           onClick={this.props.deletePortfolio}>Confirm Delete</a>
                    </div>
                )    
            }
        }
    }

	render() {
		return (
            <div className="portfolio-admin">
                <div className="portfolio-admin-form">
                    <a className="close-button" role="button" onClick={this.props.closeForm}></a>

                    {(this.state.permission === 'admin') ?
                        <PortfolioAdminNameEntry name={this.state.name} updateName={this.updateName}/> :
                        <h3>{this.state.name}</h3>
                    }
                    
                    <PortfolioAdminNotification notification={this.state.notification}/>
                    
                    <PortfolioAdminStockEntry addStock={this.addStock}/>
                    
                    <ul id="portfolio-admin-stocks">
                        {this.renderStocks()}
                    </ul>
                    
                    {(this.state.permission === 'admin') ? <PortfolioAdminMemberEntry addMember={this.addMember}/> : ''}
                    <ul id="portfolio-admin-members">
                        {this.renderMembers()}
                    </ul>

                    {this.renderDeleteButton()}
                </div>
            </div>
		)
	}
}

export default PortfolioAdmin;
