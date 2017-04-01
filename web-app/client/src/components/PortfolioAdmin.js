import React, { Component } from 'react';
import Client from './Client';
import PortfolioStock from './PortfolioStock';
import PortfolioStockEntry from './PortfolioStockEntry';
import PortfolioMember from './PortfolioMember';
import './PortfolioAdmin.css';

class PortfolioAdmin extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
            name: undefined,
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
            console.log(portfolio.name);
            console.log(portfolio.Companies);
            
            this.setState({
                name: portfolio.name,
                stocks: portfolio.Companies
            });
        });
        
        Client.getMembers(this.props.id, (members) => { 
            console.log(members.users);
            this.setState({members: members.users});
        });
    }
    
    closeForm() {
        console.log('hide');
    }
    
    updatePortfolioName() {
        
    }
    
    addMember() {
        
    }
    
    removeMember() {
        
    }
    
    addStock() {
        
    }
    
    removeStock() {
        
    }

	render() {
		return (
            <div className="portfolio-admin">
                <div className="portfolio-admin-form">
                    <input type="text" name="portfolio-name" placeholder="Portfolio Name"
                           defaultValue={this.state.name ? this.state.name : ''}
                           onChange={(e) => {
                               console.log(e);
                           }
                    }/>

                    <a className="close-button" role="button" aria-label="Close"
                       onClick={() => {this.props.cancelChanges();}}></a>
                    
                    <ul id="portfolio-admin-stocks">                        
                        {this.state.stocks.map((stock, i) =>
                            <PortfolioMember key={i} name={stock.name} symbol={stock.symbol}
                                             removeStock={this.removeStock}
                            />
                        )}
                    </ul>
                    
                    <ul id="portfolio-admin-members">
                        {this.state.members.map((member, i) =>
                            <PortfolioMember key={i} name={member.username}
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
