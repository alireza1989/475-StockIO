import React, { Component } from 'react';
import './PortfolioAdminNotification.css';

class PortfolioAdminNotification extends Component {
    constructor(props) {
		super(props);
		
		this.state = {
            message: '',
            timer: false
		};
    }
    
    componentDidMount() {
        this.refresh();
    }
    
    componentWillReceiveProps() { 
        this.refresh();
    }
    
    refresh() {
        setTimeout(() => {
            console.log("Timer expired");
            this.setState({
                message: '',
                timer: false
            });
        }, 3000);
        
        console.log("Timer set");
        
        this.setState({
            message: this.props.message,
            timer: true
        });
    }
    
    render() {        
        return (
            <p id="portfolio-notification">{this.state.message}</p>
        );
    }
}

export default PortfolioAdminNotification;
