﻿export default class Card {
  constructor({ item, previewer }, selectors, deleteHandler) {
    this._previewer = previewer;
    this._cardItem = item;
    this._template = selectors.cardTemplateId;
    this._card = selectors.cardSelector;
    this._cardImage = selectors.cardImageSelector;
    this._cardName = selectors.cardNameSelector;
    this._deleteButton = selectors.cardDeleteButtonSelector;
    this._likeContainer = selectors.cardLikeContainerSelector;
    this._likeContainerIsLiked = selectors.cardLikeContainerIsLikedClass;
    this._likeCounter = selectors.cardLikeCounterSelector;
    this._counterVisible = selectors.cardLikeCounterVisibleClass;
    this._likeButton = selectors.cardLikeButtonSelector;
    this._likeButtonIsActive = selectors.cardActiveLikeSelector;
    this._deleteHandler = deleteHandler;
    this._handleDelete = this._handleDelete.bind(this);
  }

  createCard() {
    const cardElement = this._cloneTemplate();
    this._setEventListeners(cardElement);
    const counterElement = cardElement.querySelector(this._likeCounter);
    const likeContainer = cardElement.querySelector(this._likeContainer);
    const likeButton = cardElement.querySelector(this._likeButton);

    // TODO перевести на API
    if (Object.keys(this._cardItem).indexOf('likes') > -1) {
      counterElement.textContent = this._cardItem.likes.length;
    } else {
      counterElement.textContent = 0;
    }

    if (parseInt(counterElement.textContent) > 0) {
      counterElement.classList.add(this._counterVisible);
      likeContainer.classList.add(this._likeContainerIsLiked);
      likeButton.classList.add(this._likeButtonIsActive);
    } else {
      counterElement.classList.remove(this._counterVisible);
      likeContainer.classList.remove(this._likeContainerIsLiked);
      likeButton.classList.remove(this._likeButtonIsActive);
    }

    cardElement.querySelector(this._cardName).textContent = this._cardItem.name;
    const cardImage = cardElement.querySelector(this._cardImage);
    cardImage.setAttribute('alt', this._cardItem.name);
    cardImage.setAttribute('src', this._cardItem.link);
    return cardElement;
  }

  _cloneTemplate() {
    return document
      .querySelector(this._template)
      .content.querySelector(this._card)
      .cloneNode(true);
  }

  _setEventListeners(element) {
    element.querySelector(this._deleteButton).addEventListener('click', (evt) => {
      this._handleDelete(evt);
    });

    element.querySelector(this._likeButton).addEventListener('click', (evt) => {
      this._handleLike(evt);
    });

    element.querySelector(this._cardImage).addEventListener('click', () => {
      this._previewer({ image: this._cardImage, title: this._title });
    });
  }

  _handleDelete(evt) {
    this._deleteHandler(evt.target.closest(this._card));
  }

  _handleLike(evt) {
    if (
      // TODO базовая логика на моковых данных -- все перевечти на API
      evt.target.classList.contains(this._likeButtonIsActive) &&
      evt.target.parentElement.classList.contains(this._likeContainerIsLiked) &&
      evt.target.nextElementSibling.classList.contains(this._counterVisible)
    ) {
      evt.target.classList.remove(this._likeButtonIsActive);
      evt.target.nextElementSibling.textContent =
        parseInt(evt.target.nextElementSibling.textContent) - 1;
      if (parseInt(evt.target.nextElementSibling.textContent) < 1) {
        evt.target.parentElement.classList.remove(this._likeContainerIsLiked);
        evt.target.nextElementSibling.classList.remove(this._counterVisible);
      }
    } else {
      evt.target.classList.add(this._likeButtonIsActive);
      evt.target.parentElement.classList.add(this._likeContainerIsLiked);
      evt.target.nextElementSibling.classList.add(this._counterVisible);
      evt.target.nextElementSibling.textContent =
        parseInt(evt.target.nextElementSibling.textContent) + 1;
    }
  }
}
