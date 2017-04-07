import {browserHistory} from 'react-router';

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else if (response.body) {
        response.json().then((body) => {
            if (body.redirect) {
                browserHistory.push(body.redirect);
            }
        }); 
    }
}

function parseJSON(response) {
    if (response) {
        return response.json();
    }
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
    
    addPortfolio: function(portfolioName, callback) {
        return fetch(`/api/portfolios`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: portfolioName
            })
        }).then(checkStatus)
          .then(parseJSON)
          .then(callback);
    },
    
    updatePortfolioName: function(portfolioID, portfolioName, callback) {        
        return fetch(`/api/portfolios/${portfolioID}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: portfolioName
            })
        }).then(checkStatus)
          .then(parseJSON)
          .then(callback); 
    },
    
    removePortfolio: function(portfolioId, callback) {
        return fetch(`/api/portfolios`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                portfolioID: portfolioId
            })
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

    addStock: function(portfolioId, stockSymbol, callback) {
        return fetch(`/api/portfolios/${portfolioId}/stocks`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                symbol: stockSymbol
            })
        }).then(checkStatus)
          .then(parseJSON)
          .then(callback);
    },

    removeStock: function(portfolioId, stockID, callback) {
        return fetch(`/api/portfolios/${portfolioId}/stocks`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                stockID: stockID
            })
        }).then(checkStatus)
          .then(parseJSON)
          .then(callback);
    },

    getMembers: function(portfolioId, callback) {
        return fetch(`/api/portfolios/${portfolioId}/users`, {
            accept: 'application/json',
            credentials: 'include'
        }).then(checkStatus)
          .then(parseJSON)
          .then(callback);
    },

    addMember: function(portfolioId, body, callback) {
        return fetch(`/api/portfolios/${portfolioId}/users`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: body.username,
                permission: body.permission
            })
        }).then(checkStatus)
          .then(parseJSON)
          .then(callback);
    },

    removeMember: function(portfolioId, memberID, callback) {
        return fetch(`/api/portfolios/${portfolioId}/users`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                memberID: memberID
            })
        }).then(checkStatus)
          .then(parseJSON)
          .then(callback);
    },

// NEWS
    getNews: function(symbol, callback) {
        return fetch(`/api/stocks/${symbol}/news`, {
            accept: 'application/json',
            credentials: 'include'
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
    },

    //Generic helper function
    getIndex: function(value, array) {
        for (var i = 0; i < array.length; i++) {
            var x = parseInt(value, 10); //This is to avoid annoying ===/== problems
            if(array[i].id === x)
                return i;
        }
        return -1;
    }
}

export default Client;
