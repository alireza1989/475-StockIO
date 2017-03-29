import React, { Component } from "react";
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';

export default class App extends Component {
  render() {
    <Dashboard name="Joe"/>
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
