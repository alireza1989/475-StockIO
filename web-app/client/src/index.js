import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './pages/Dashboard';
import Homepage from './pages/Homepage';
import './index.css';

const loggedIn = false;

if (loggedIn) {
	ReactDOM.render(
	    <Dashboard name="Elliot"/>,
	    document.getElementById('app')
	);
} else {
	ReactDOM.render(
	    <Homepage />,
	    document.getElementById('app')
	);
}
