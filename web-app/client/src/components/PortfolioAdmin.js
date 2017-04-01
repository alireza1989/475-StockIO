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

        this.updatePortfolioName = this.updatePortfolioName.bind(this);
        this.addMember = this.addMember.bind(this);
        this.removeMember = this.removeMember.bind(this);
        this.addStock = this.addStock.bind(this);
        this.removeStock = this.removeStock.bind(this);
	}
	
    componentWillMount() {
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
    
    updatePortfolioName(event) {
        console.log(`Update portfolio name to "${event.target.value}"`);
        this.setState({name: event.target.value});
    }
    
    addMember() {
        console.log("Adding member");
    }
    
    removeMember(id) {
        console.log(`Removing member ${id}`);
    }
    
    addStock() {
        console.log("Adding stock");
    }
    
    removeStock(id) {
        console.log(`Removing stock ${id}`);
    }

	render() {
		return (
            <div className="portfolio-admin">
                <div className="portfolio-admin-form">
                    <a className="close-button" role="button" onClick={() => {this.props.closeForm();}}></a>

                    <input type="text"  name="portfolio-name" placeholder="Portfolio Name"
                                        value={this.state.name} onChange={this.updatePortfolioName}/>
                    
                    <PortfolioAdminStockEntry />
                    
                    <ul id="portfolio-admin-stocks">
                        {this.state.stocks.map((stock, i) =>
                            <PortfolioAdminStock key={i} id={stock.id} name={stock.name} symbol={stock.symbol}
                                                 removeStock={this.removeStock}/>
                        )}
                    </ul>
                    
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
