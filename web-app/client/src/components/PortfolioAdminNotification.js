import React, { Component } from 'react';
import './PortfolioAdminNotification.css';

class PortfolioAdminNotification extends Component {
    constructor(props) {
		super(props);
		
		this.state = {
    		action: '',
            message: '',
            timer: false,
            timerHandle: undefined
		};
    }
    
    componentWillReceiveProps() {
        if (this.props.notification !== '') {
            this.setTimer();
        }
    }
    
    componentWillUnmount() {
        clearTimeout(this.state.timerHandle);
    }
    
    setTimer() {
        this.setState(state => {
            if (this.state.timerHandle !== undefined) {
                clearTimeout(this.state.timerHandle);
            }
            
            var handle = setTimeout(() => {
                this.setState({
                    action: '',
                    message: '',
                    timer: false
                });
            }, 3000);
            
            console.log(this.props);

            return {
                action: (this.props.notification !== undefined) ? this.props.notification.action : '',
                message: (this.props.notification !== undefined) ? this.props.notification.message : '',
                timer: true,
                timerHandle: handle
            }
        });
    }
    
    render() {        
        return (
            <p id="portfolio-notification" className={this.state.action}>{this.state.message}</p>
        );
    }
}

export default PortfolioAdminNotification;
