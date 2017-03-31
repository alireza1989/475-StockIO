import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './pages/App';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

// Define application routes
const routes = (
    <Route path='/' component={App}>
        <IndexRoute component={Dashboard} />
        <Route path='login' component={Login} />
        <Route path='dashboard' component={Dashboard} />
    </Route>
);

export default routes;