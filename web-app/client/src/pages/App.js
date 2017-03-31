import React, { Component } from "react";
import ReactDOM from 'react-dom';

export default class App extends Component {
    componentDidMount() {
        let reactRoot = ReactDOM.findDOMNode(this);
        reactRoot.className = 'Root';
    }
    
    render() {
        return (
            <div>{this.props.children}</div>
        );
    }
}
