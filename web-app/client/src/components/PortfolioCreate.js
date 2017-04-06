import React, { Component } from 'react';
import './PortfolioCreate.css';

class PortfolioAdmin extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
            name: ''
		};
	}
	
	componentDidMount() {
        if (this.portfolioNameInput !== undefined) {
            this.portfolioNameInput.focus();
        }
	}
	
    handleKeyDown = (event) => {
        // Permit closing dialog with escape key
        if (event.keyCode === 27) {
            this.props.closeForm();
        }
    }

	render() {
		return (
            <div className="portfolio-create">
                <form className="portfolio-create-form" onKeyDown={this.handleKeyDown}
                      onSubmit={(e) => {
                        e.preventDefault();
                        this.props.savePortfolio(this.state.name);
                }}>
                
                    <h3>New Portfolio</h3>
                    <p>Enter a name for this portfolio</p>

                    <input type="text"  name="portfolio-name" placeholder="Name"
                                        ref={(input) => { this.portfolioNameInput = input; }}
                                        value={this.state.name} onChange={(e) => {
                                            this.setState({name: e.target.value});
                                        }}/>
                                        
                    <div className="portfolio-create-footer">
                        <a className="button cancel" role="button" onClick={this.props.closeForm}>Cancel</a>
                        <a className="button save" role="button" onClick={() => {
                            this.props.savePortfolio(this.state.name);
                        }}>Save</a>
                    </div>
                </form>
            </div>
		)
	}
}

export default PortfolioAdmin;
