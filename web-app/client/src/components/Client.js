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
function getNews(callback){
    return fetch('/api/news', {
        accept: 'application/json',
    }).then(checkStatus)
      .then(parseJSON)
      .then(callback);
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    throw error;
}

function parseJSON(response) {
    return response.json();
}

const Client = { getPortfolios, getNews, getStocks };
export default Client;
