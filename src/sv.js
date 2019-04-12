const axios = require('axios');

const requester = axios.create({
  baseURL: '192.168.1.47:9001',
  timeout: 3000
});

function authorize(event) {
  return requester.post('/autorizar', event)
    .catch((error) => {
      console.error(error)
      return Promise.reject(error)
    })
    .then(response => response.data);
}

module.exports = authorize;
