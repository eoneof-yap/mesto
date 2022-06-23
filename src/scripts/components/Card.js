﻿export default class Card {
  constructor({ cardData, handlers }, selectors, userData) {
    this._cardData = cardData;
    this._selectors = selectors;
    this._userData = userData;
    this._deleteHandler = handlers.deleteHandler;
    this._previewHandler = handlers.previewHandler;
    this._likeHandler = handlers.likeHandler;
    this._unLikeHandler = handlers.unLikeHandler;
    // this._handleLikeButtonClick = this._handleLikeButtonClick.bind(this);
  }

  /********************************************************************************
   * Create
   ********************************************************************************/
  createCard() {
    // prettier-ignore
    const {
      cardImageSelector, cardDeleteButtonSelector, cardLikeButtonSelector,
      cardLikeContainerSelector, cardLikeCounterSelector, cardNameSelector
    } = this._selectors;

    this._cardItem = this._cloneTemplate();
    this._deleteButton = this._cardItem.querySelector(cardDeleteButtonSelector);
    this._cardImage = this._cardItem.querySelector(cardImageSelector);
    this._likeContainer = this._cardItem.querySelector(cardLikeContainerSelector);
    this._likeButton = this._cardItem.querySelector(cardLikeButtonSelector);
    this._likeCounter = this._cardItem.querySelector(cardLikeCounterSelector);

    this._cardItem.querySelector(cardNameSelector).textContent = this._cardData.name;

    this._cardItem.setAttribute('data-card-id', this._cardData.id);
    this._cardItem.setAttribute('data-owner-id', this._cardData.owner);
    this._cardItem.setAttribute('data-created-at', this._cardData.createdAt);
    this._cardImage.setAttribute('alt', this._cardData.name);
    this._cardImage.setAttribute('src', this._cardData.link);

    this._removeDeleteButton();
    this.toggleLike(this._cardData);

    this._setEventListeners();

    return this._cardItem;
  }

  _cloneTemplate() {
    const { cardTemplateId, cardSelector } = this._selectors;
    return document
      .querySelector(cardTemplateId)
      .content.querySelector(cardSelector)
      .cloneNode(true);
  }

  _removeDeleteButton() {
    if (this._cardData.owner !== this._userData._id) {
      this._deleteButton.remove();
    }
  }

  /********************************************************************************
   * Like
   ********************************************************************************/
  toggleLike(cardData) {
    const {
      cardActiveLikeSelector,
      cardLikeCounterVisibleClass,
      cardLikeContainerIsLikedClass,
    } = this._selectors;

    this._likeCounter.textContent = cardData.likes.length;

    if (cardData.likes.length > 0) {
      this._likeCounter.classList.add(cardLikeCounterVisibleClass);
      this._likeContainer.classList.add(cardLikeContainerIsLikedClass);
    } else {
      this._likeCounter.classList.remove(cardLikeCounterVisibleClass);
      this._likeContainer.classList.remove(cardLikeContainerIsLikedClass);
    }

    if (cardData.likes.some((liker) => liker._id === this._userData._id)) {
      this._likeButton.classList.add(cardActiveLikeSelector);
    } else {
      this._likeButton.classList.remove(cardActiveLikeSelector);
    }
  }

  _isLiked(thisCard) {
    if (thisCard._cardData.likes.some((liker) => liker._id === this._userData._id)) {
      return true;
      console.log('👉true:', true);
    } else {
      return false;
      console.log('👉false:', false);
    }
  }

  _handleLikeButtonClick(thisCard) {
    if (this._isLiked(thisCard) === true) {
      this._unLikeHandler(thisCard);
    } else {
      this._likeHandler(thisCard);
    }
  }

  /********************************************************************************
   * Delete
   ********************************************************************************/
  deleteCard() {
    document.querySelector(`[data-card-id="${this._cardData.id}"]`).remove();
  }

  _handleDeleteButtonClick() {
    this._deleteHandler(this._cardData.id);
  }

  /********************************************************************************
   * Preview
   ********************************************************************************/
  _handleCardImageClick() {
    this._previewHandler({ link: this._cardData.link, title: this._cardData.name });
  }

  /********************************************************************************
   * Listeners
   ********************************************************************************/
  _setEventListeners() {
    if (this._cardItem.contains(this._deleteButton)) {
      this._deleteButton.addEventListener('click', () => {
        this._handleDeleteButtonClick();
      });
    }

    this._cardImage.addEventListener('click', () => {
      this._handleCardImageClick();
    });

    this._likeButton.addEventListener('click', () => {
      this._handleLikeButtonClick(this);
    });
  }
}
