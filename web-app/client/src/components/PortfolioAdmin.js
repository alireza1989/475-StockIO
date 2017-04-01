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
            name: '',
            stocks: [],
            members: []
		};
		
        Client.getStocks(this.props.id, (portfolio) => { 
            this.setState({
                name: portfolio.name,
                stocks: portfolio.Companies
            });
        });
        
        Client.getMembers(this.props.id, (members) => { 
            this.setState({members: members.users});
        });
	}
	
	componentDidMount() {
        this.portfolioNameInput.focus();
	}
    
    updatePortfolioName = (e) => {
        console.log(`Update portfolio name to "${e.target.value}"`);
        this.setState({name: event.target.value});
    }
    
    addMember = () => {
        console.log("Adding member");
    }
    
    removeMember = (id) => {
        console.log(`Removing member ${id}`);
    }
    
    addStock = () => {
        console.log("Adding stock");
    }
    
    removeStock = (id) => {
        console.log(`Removing stock ${id}`);
    }
    
    renderStocks = () => {
        if (this.state.stocks.length > 0) {
            console.log("Populating stocks");
        } else {
            console.log("No stocks");
        }
    }

    renderMembers = () => {
        if (this.state.members.length > 0) {
            return {this.state.stocks.map((stock, i) =>
                <PortfolioAdminStock key={i} id={stock.id} name={stock.name} symbol={stock.symbol}
                                     removeStock={this.removeStock}/>}
        } else {
            return <li>No members</li>
        }
    }

	render() {
		return (
            <div className="portfolio-admin">
                <div className="portfolio-admin-form">
                    <a className="close-button" role="button" onClick={() => {this.props.closeForm();}}></a>

                    <input type="text"  name="portfolio-name" placeholder="Portfolio Name" 
                                        value={this.state.name} onChange={this.updatePortfolioName}
                                        ref={(input) => { this.portfolioNameInput = input; }}/>
                    
                    <PortfolioAdminStockEntry />
                    
                    <ul id="portfolio-admin-stocks">
                        {this.state.stocks.map((stock, i) =>
                            <PortfolioAdminStock key={i} id={stock.id} name={stock.name} symbol={stock.symbol}
                                                 removeStock={this.removeStock}/>
                        )}
                    </ul>
                    
                    {this.renderStocks()}
                    {this.renderMembers()}
                    
                    <PortfolioAdminMemberEntry />
                    
                    <ul id="portfolio-admin-members">
                        {this.state.members.map((member, i) =>
                            <PortfolioAdminMember key={i} id={member.id} name={member.username}
                                                  removeMember={this.removeMember}
                            />
                        )}
                    </ul>
                </div>
            </div>
		)
	}
}

export default PortfolioAdmin;
