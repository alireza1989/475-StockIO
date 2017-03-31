import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import {Router, History} from 'react-router';
import routes from './routes';


ReactDOM.render(
    <Router history={History} routes={routes} />,
    document.getElementById('app')
);
