export default class Api {
  constructor(apiConfig) {
    this._server = apiConfig.serverURL;
    this._headers = apiConfig.headers;
    this._cards = apiConfig.cardsURL;
    this._user = apiConfig.userURL;
  }

  getUser() {
    return fetch(`${this._server}${this._user}`, {
      method: 'GET',
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => alert(err));
  }
  // });
  // }

  // return this._errorHandler();
  // }); // TODO hamdle error
  // }

  editUser() {}

  getAllCards() {
    return fetch(`${this._server}${this._cards}`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return this._errorHandler();
    }); // TODO hamdle error;
  }

  addCard() {
    return fetch(`${this._server}${this._cards}`, {
      method: 'POST',
      headers: this._headers,
    }).then((res) => {
      return res.json();
    });
  }

  deleteCard() {
    return fetch(`${this._server}${this._cards}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => {
      return res.json();
    });
  }

  likeCard() {}

  unlikeCard() {}

  _errorHandler() {
    return Promise.reject('Не пошло...'); // TODO callback ?
  }
}
