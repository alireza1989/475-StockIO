import React, { Component } from 'react';
import logo from './images/logo.svg';
import logo1 from './images/logo1-white.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        
        <div className="App-header">
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
        </div>

        <nav className="App-navbar">
          <div className="header-logo">
            <h1>stockI</h1>
            <img src={logo1} alt="logo"/>
          </div>

        </nav>

        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

      </div>
    );
  }
}

export default App;
