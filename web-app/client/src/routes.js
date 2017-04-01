import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './pages/App';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Client from './components/Client';

function requireAuth(nextState, replace, callback) {
    Client.currentUser((user)=> {
        if (user === undefined) {
            console.log('req auth');
            replace({
                pathname: '/login',
                state: { nextPathname: nextState.location.pathname }
            });
            callback();
        }
    });
}

// Define application routes
const routes = (
    <Route path='/' component={App}>
        <IndexRoute component={Dashboard} onEnter={requireAuth} />
        <Route path='login' component={Login}/>
        <Route path='dashboard' component={Dashboard} onEnter={requireAuth} />
    </Route>
);

export default routes;