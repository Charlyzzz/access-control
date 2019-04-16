const axios = require('axios');

const requester = axios.create({
  baseURL: process.env.REPORTER_URL,
  timeout: 7000
});

function authorize(event) {
  return requester.post('/authorize', event)
    .catch((error) => {
      console.error(error)
      return Promise.reject(error)
    })
    .then(response => response.data);
}

module.exports = authorize;
