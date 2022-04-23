import { createPreview } from './index.js';
export { Card };

class Card {
  constructor(data, selectors) {
    this._name = data.name;
    this._link = data.link;
    this._template = selectors.templateID;
    this._card = selectors.card;
    this._image = selectors.image;
    this._title = selectors.title;
    this._deleteButton = selectors.deleteButton;
    this._likeButton = selectors.likeButton;
    this._cardsGrid = selectors.cardsGrid;
    this._activeLike = selectors.activeLike;
  }

  renderCard() {
    document.querySelector(this._cardsGrid).prepend(this._createCard());
  }

  _createCard() {
    const cardElement = this._getTemplate();
    this._setEventListeners(cardElement);
    cardElement.querySelector(this._title).textContent = this._name;
    this._image = cardElement.querySelector(this._image);
    this._image.setAttribute('alt', this._name);
    this._image.setAttribute('src', this._link);
    return cardElement;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._template).content.querySelector(this._card).cloneNode(true);
    return cardTemplate;
  }

  _setEventListeners(element) {
    element.querySelector(this._deleteButton).addEventListener('click', (evt) => {
      this._handleDelete(evt);
    });
    element.querySelector(this._likeButton).addEventListener('click', (evt) => {
      this._handleLike(evt);
    });

    element.querySelector(this._image).addEventListener('click', (evt) => {
      // from index.js
      createPreview(evt);
    });
  }

  _handleDelete(evt) {
    evt.target.closest(this._card).remove();
  }

  _handleLike(evt) {
    evt.target.classList.toggle(this._activeLike);
  }
}
