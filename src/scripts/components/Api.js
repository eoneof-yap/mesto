import { AUTH_TOKEN } from "../../../assets/auth.js";

export default class Api {
  constructor(server, method, data='') {
    this._token = AUTH_TOKEN
    this._server = server
    this._method = method
    this._data = data
  }

  makeRequest() {
    fetch(this._server, {
    method: this._method,
    headers: { authorization: this._token, 'Content-Type': 'application/json' },
    body: JSON.stringify(this._data)
  })
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
      }
      return Promise.reject(new Error(response.statusText));
    })
    .then(response => response.json())
    .then(result => {
      console.log(result);
    })
    .catch(error => {
      console.log(error);
      return null;
    });
  }
}

const request = new Api('GET')
request.makeRequest()
