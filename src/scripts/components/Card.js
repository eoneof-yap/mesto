﻿export default class Card {
  constructor({ item, previewer }, selectors, deleteHandler) {
    this._previewer = previewer;
    this._titleValue = item.title;
    this._link = item.link;
    this._template = document.querySelector(selectors.cardTemplateId);
    this._card = selectors.cardItemSelector;
    this._image = selectors.cardImageSelector;
    this._titleSelector = selectors.cardTitleSelector;
    this._deleteButton = selectors.cardDeleteButtonSelector;
    this._likeButton = selectors.cardLikeButtonSelector;
    this._activeLike = selectors.cardActiveLikeSelector;
    this._deleteHandler = deleteHandler;
    this._handleDelete = this._handleDelete.bind(this);
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
      this._previewer({ image: this._image, title: this._title });
    });
  }

  _handleDelete(evt) {
    this._deleteHandler(evt.target.closest(this._card));
  }

  _handleLike(evt) {
    console.log(evt.target.nextElementSibling);
    evt.target.classList.toggle(this._activeLike);
    evt.target.parentElement.classList.toggle('card__like-container_is-liked');
    evt.target.nextElementSibling.classList.toggle('card__like-counter_visible');
  }
}
