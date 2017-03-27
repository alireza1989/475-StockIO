import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import './index.css';

const loggedIn = true;

if (loggedIn) {
	ReactDOM.render(
	    <Dashboard name="Elliot"/>,
	    document.getElementById('app')
	);
} else {
	ReactDOM.render(
	    <Login />,
	    document.getElementById('app')
	);
}
