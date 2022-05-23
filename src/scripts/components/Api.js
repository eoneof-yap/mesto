export default class Api {
  constructor(apiConfig) {
    this._server = apiConfig.serverURL;
    this._headers = apiConfig.headers;
    this._cardsEndPoint = apiConfig.cardsURL;
    this._usersEndPoint = apiConfig.usersURL;
  }

  getAllCards() {
    return fetch(`${this._server}${this._cardsEndPoint}`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => {
      return res.json();
    });
  }
}
