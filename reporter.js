const axios = require('axios');

const requester = axios.create({
  baseURL: process.env.REPORTER_URL,
  timeout: 3000
});

function reportNewTagDetected(event) {
  return requester.post('/Dev', event);
}

module.exports = reportNewTagDetected;
