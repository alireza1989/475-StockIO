/* eslint-disable no-undef */
function getCompanies(callback) {
    return fetch('/api/companies', {
        accept: 'application/json',
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
//     console.log(error); // eslint-disable-line no-console
    throw error;
}

function parseJSON(response) {
    return response.json();
}

const Client = { getCompanies, getNews };
export default Client;
