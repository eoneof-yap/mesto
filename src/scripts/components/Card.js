﻿export default class Card {
  // constructor({ name, link }, previewer, selectors) {
  constructor({ item, previewer }, selectors) {
    this._previewer = previewer;
    this._titleValue = item.title;
    this._link = item.link;
    this._template = document.querySelector(selectors.templateID);
    this._card = selectors.card;
    this._image = selectors.image;
    this._titleSelector = selectors.title;
    this._deleteButton = selectors.deleteButton;
    this._likeButton = selectors.likeButton;
    this._cardsGrid = document.querySelector(selectors.cardsGrid);
    this._activeLike = selectors.activeLike;
  }

  createCard() {
    const cardElement = this._cloneTemplate();
    this._setEventListeners(cardElement);
    cardElement.querySelector(this._titleSelector).textContent = this._titleValue;
    const cardImage = cardElement.querySelector(this._image);
    cardImage.setAttribute('alt', this._titleValue);
    cardImage.setAttribute('src', this._link);
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
      this._previewer();
    });
  }

  _handleDelete(evt) {
    evt.target.closest(this._card).remove();
  }

  _handleLike(evt) {
    evt.target.classList.toggle(this._activeLike);
  }
}
