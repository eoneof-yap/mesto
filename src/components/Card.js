﻿export default class Card {
  constructor({ previewData, previewer }, selectors) {
    this._name = previewData.name;
    this._link = previewData.link;

    this._previewer = previewer;

    this._template = document.querySelector(selectors.templateID);
    this._cardsGrid = selectors.cardsGrid;
    this._card = selectors.card;
    this._image = selectors.image;
    this._title = selectors.title;
    this._deleteButton = selectors.deleteButton;
    this._likeButton = selectors.likeButton;
    this._activeLike = selectors.activeLike;
  }

  renderCard() {
    document.querySelector(this._cardsGrid).prepend(this._createCard());
  }

  _createCard() {
    const cardElement = this._cloneTemplate();
    this._setEventListeners(cardElement);
    this._title = cardElement.querySelector(this._title).textContent = this._name;
    this._image = cardElement.querySelector(this._image);
    this._image.setAttribute('alt', this._name);
    this._image.setAttribute('src', this._link);
    return cardElement;
  }

  _cloneTemplate() {
    return this._template.content.querySelector(this._card).cloneNode(true);
  }

  _setEventListeners(element) {
    element.querySelector(this._deleteButton).addEventListener('click', (evt) => {
      this._handleDelete(evt);
    });

    element.querySelector(this._likeButton).addEventListener('click', (evt) => {
      this._handleLike(evt);
    });

    element.querySelector(this._image).addEventListener('click', () => {
      this._previewer(this._image, this._title);
    });
  }

  _handleDelete(evt) {
    evt.target.closest(this._card).remove();
  }

  _handleLike(evt) {
    evt.target.classList.toggle(this._activeLike);
  }
}
