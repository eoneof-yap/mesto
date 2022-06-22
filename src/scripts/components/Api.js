export default class Api {
  constructor(apiConfig) {
    this._server = apiConfig.serverURL;
    this._headers = apiConfig.headers;
    this._cards = apiConfig.cardsURL;
    this._user = apiConfig.userURL;
    this._avatar = apiConfig.avatarURL;
  }

  getUser() {
    return fetch(`${this._server}${this._user}`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => {
      return this._handleResponse(res);
    });
  }

  setUser(data) {
    return fetch(`${this._server}${this._user}`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      return this._handleResponse(res);
    });
  }

  setAvatar(data) {
    return fetch(`${this._server}${this._user}${this._avatar}`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      return this._handleResponse(res);
    });
  }

  getAllCards() {
    return fetch(`${this._server}${this._cards}`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => {
      return this._handleResponse(res);
    });
  }

  addCard(data) {
    return fetch(`${this._server}${this._cards}`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      return this._handleResponse(res);
    });
  }

  deleteCard(data) {
    return fetch(`${this._server}${this._cards}${data}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => {
      return this._handleResponse(res);
    });
  }

  likeCard(data) {
    return fetch(`${this._server}${this._cards}`, {
      method: 'PUT',
      headers: this._headers,
      body: data ,
    }).then((res) => {
      return this._handleResponse(res);
    });
  }

  unlikeCard() {
    return fetch(`${this._server}${this._cards}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => {
      return this._handleResponse(res);
    });
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }
}
