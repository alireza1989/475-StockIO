import {browserHistory} from 'react-router';

var username = "17440ee7fe0d7aeb1962fb3a18df9607";
var password = "bd8d650b82b0f07cf98d893a9fde0bb7";
var auth = "Basic " + new Buffer(username + ':' + password).toString('base64');
var url = "https://api.intrinio.com/news?identifier=";


function latestNews(companySymbol, callback) {
    return fetch(`url${companySymbol}`,
    headers: {
        "Authorization": auth
    },
    {
        accept: 'application/json',
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

const GetNews = { latestNews };
export default GetNews;
