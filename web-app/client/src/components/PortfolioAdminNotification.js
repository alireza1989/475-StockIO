import React, { Component } from 'react';
import './PortfolioAdminNotification.css';

class PortfolioAdminNotification extends Component {
    constructor(props) {
		super(props);
		
		this.state = {
    		action: '',
            message: '',
            timer: false
		};
    }
    
    componentWillReceiveProps() { 
        this.setTimer();
    }
    
    setTimer() {        
        setTimeout(() => {
            this.setState({
                action: '',
                message: '',
                timer: false
            });
        }, 3000);
        
        this.setState({
            action: this.props.notification.action,
            message: this.props.notification.message,
            timer: true
        });
    }
    
    render() {        
        return (
            <p id="portfolio-notification" className={this.state.action}>{this.state.message}</p>
        );
    }
}

export default PortfolioAdminNotification;
