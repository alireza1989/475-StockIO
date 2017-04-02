import {browserHistory} from 'react-router';
    
function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    response.json().then((body) => {
        if (body.redirect) {
            browserHistory.push(body.redirect);
        }
    });
}

function parseJSON(response) {
    if (response) { return response.json(); }
}

const Client = module.exports = {
    getUser: function(callback) {
        return fetch('/api/users/current', {
            accept: 'application/json',
            credentials: 'include'
        }).then(checkStatus)
          .then(parseJSON)
          .then(callback);
    },
    
    getPortfolios: function(callback) {
        return fetch('/api/portfolios', {
            accept: 'application/json',
            credentials: 'include'
        }).then(checkStatus)
          .then(parseJSON)
          .then(callback);
    },
    
    getStocks: function(portfolioId, callback) {
        return fetch(`/api/portfolios/${portfolioId}/stocks`, {
            accept: 'application/json',
            credentials: 'include'
        }).then(checkStatus)
          .then(parseJSON)
          .then(callback);
    },
    
    postStocks: function(portfolioId, stockSymbol) {
        fetch(`/api/portfolios/${portfolioId}/stocks`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                credentials: 'include'
            },
            body: JSON.stringify({
                symbol: stockSymbol
            });
        });;
    },
    
    getMembers: function(portfolioId, callback) {
        return fetch(`/api/portfolios/${portfolioId}/users`, {
            accept: 'application/json',
            credentials: 'include'
        }).then(checkStatus)
          .then(parseJSON)
          .then(callback);
    },
    
// NEWS
    getNews: function(callback) {
        return fetch('/api/news', {
            accept: 'application/json',
        }).then(checkStatus)
          .then(parseJSON)
          .then(callback);
    },
    
// ACCOUNT
    logout: function(callback) {
        return fetch('/api/users/logout', {
            method: 'POST',
            credentials: 'include'
        }).then(checkStatus)
          .then(parseJSON)
          .then(callback);
    },
    
    currentUser: function(callback) {
        return fetch('/api/users/current', {
            credentials: 'include'
        }).then(checkStatus)
          .then(parseJSON)
          .then(callback);
    }
}

export default Client;
