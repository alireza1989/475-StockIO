import React, { Component } from "react";
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';

export default class App extends Component {
  render() {
    return (
      <div>
        <Dashboard name="Joe"/>,
        //document.getElementById('app')
        {this.props.children}
      </div>
    );
  }
}
