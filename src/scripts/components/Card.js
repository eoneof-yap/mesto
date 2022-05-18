﻿export default class Card {
  constructor({ item, previewer }, selectors) {
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
    // TODO resolve user ID
    document.querySelector('.popup_type_confirm').classList.add('popup_opened'); // TODO move to variables
    evt.target.closest(this._card).remove();
  }

  _handleLike(evt) {
    evt.target.classList.toggle(this._activeLike);
  }
}
