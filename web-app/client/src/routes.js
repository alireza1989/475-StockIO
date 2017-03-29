// This file uses REACT rutes library which helps us to build
// a single page app that mimics a multiple pages app


// Import React and the dependencies we need to make react router work
import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Import the different components that will represent the different pages
import App from './components/app';
import DashBoard from './pages/Dashboard';
import Login from './pages/Login';

// Define our routes
const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={DashBoard} />
    <Route path='dashboard' component={DashBoard} />
    <Route path='login' component={Login} />
  </Route>
);


export default routes;
