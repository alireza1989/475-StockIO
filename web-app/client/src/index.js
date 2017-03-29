import React from 'react';
import ReactDOM from 'react-dom';

import {Router, browserHistory} from 'react-router';
import routes from './routes';

console.log('routes: ', routes);
console.log('browserHistory is: ', browserHistory);
ReactDOM.render(
    <Router history={browserHistory} routes={routes} />, document.getElementById('app')
);
