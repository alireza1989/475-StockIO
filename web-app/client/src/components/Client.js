import {browserHistory} from 'react-router';

function getUser(callback) {
    return fetch('/api/users/current', {
        accept: 'application/json',
        credentials: 'include'
    }).then(checkStatus)
      .then(parseJSON)
      .then(callback);
}

function getPortfolios(callback) {
    return fetch('/api/portfolios', {
        accept: 'application/json',
        credentials: 'include'
    }).then(checkStatus)
      .then(parseJSON)
      .then(callback);
}

function getStocks(portfolioId, callback) {
    return fetch('/api/portfolios/' + portfolioId + '/stocks', {
        accept: 'application/json',
        credentials: 'include'
    }).then(checkStatus)
      .then(parseJSON)
      .then(callback);
}

// GET THE NEWS FROM DB
function getNews(callback) {
    return fetch('/api/news', {
        accept: 'application/json',
    }).then(checkStatus)
      .then(parseJSON)
      .then(callback);
}

function logout(callback) {
    return fetch('/api/users/logout', {
        method: 'POST',
        credentials: 'include'
    }).then(checkStatus)
      .then(parseJSON)
      .then(callback);
}

function currentUser(callback) {
    return fetch('/api/users/current', {
        credentials: 'include'
    }).then(checkStatus)
      .then(parseJSON)
      .then(callback);
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    response.json().then((body) => {
        if (body.redirect)
        {
            browserHistory.push(body.redirect);
        }
    });

    // const error = new Error(`HTTP Error ${response.statusText}`);
    // error.status = response.statusText;
    // error.response = response;
    // throw error;
}

function parseJSON(response) {
    if (response)
        return response.json();
}

const Client = { getUser, getPortfolios, getNews, getStocks, logout, currentUser };
export default Client;
