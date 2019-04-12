const axios = require('axios');

const requester = axios.create({
  baseURL: 'localhost:9001',
  timeout: 3000
});

function authorize(event) {
  return requester.post('/autorizar', event);
}

module.exports = authorize;
