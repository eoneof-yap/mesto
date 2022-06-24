﻿export default class Card {
  constructor({ thisCardData, handlers }, selectors, userData) {
    this._cardData = thisCardData;
    this._selectors = selectors;
    this._userData = userData;

    this._deleteButtonSelector = this._selectors.cardDeleteButtonSelector;
    this._cardImageSelector = this._selectors.cardImageSelector;
    this._likeContainerSelector = this._selectors.cardLikeContainerSelector;
    this._likeButtonSelector = this._selectors.cardLikeButtonSelector;
    this._likeCounterSelector = this._selectors.cardLikeCounterSelector;
    this._cardNameSelector = this._selectors.cardNameSelector;
    this._cardTemplateId = this._selectors.cardTemplateId;
    this._cardSelector = this._selectors.cardSelector;

    this._counterVisibleClass = this._selectors.cardLikeCounterVisibleClass;
    this._containerIsLikedClass = this._selectors.cardLikeContainerIsLikedClass;
    this._activeLikeClass = this._selectors.cardActiveLikeClass;

    this._deleteHandler = handlers.deleteHandler;
    this._previewHandler = handlers.previewHandler;
    this._likeHandler = handlers.likeHandler;
    this._unLikeHandler = handlers.unLikeHandler;
  }

  /********************************************************************************
   * Create
   ********************************************************************************/
  createCard() {
    this._cardItem = this._cloneTemplate();

    this._deleteButton = this._cardItem.querySelector(this._deleteButtonSelector);
    this._cardImage = this._cardItem.querySelector(this._cardImageSelector);
    this._likeContainer = this._cardItem.querySelector(this._likeContainerSelector);
    this._likeButton = this._cardItem.querySelector(this._likeButtonSelector);
    this._likeCounter = this._cardItem.querySelector(this._likeCounterSelector);
    this._cardName = this._cardItem.querySelector(this._cardNameSelector);

    this._cardName.textContent = this._cardData.name;

    this._cardItem.setAttribute('data-card-id', this._cardData.id);
    this._cardImage.setAttribute('alt', this._cardData.name);
    this._cardImage.setAttribute('src', this._cardData.link);

    this._removeDeleteButton();
    this.toggleLike(this._cardData);
    this._setEventListeners();

    return this._cardItem;
  }

  _cloneTemplate() {
    return document
      .querySelector(this._cardTemplateId)
      .content.querySelector(this._cardSelector)
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
    this._likeCounter.textContent = cardData.likes.length;

    if (cardData.likes.some((liker) => liker._id === this._userData._id)) {
      this._hasLike = true;
      this._activateLike();
    } else {
      this._hasLike = false;
      this._deactivateLike();
    }

    if (cardData.likes.length > 0) {
      this._showCounter();
    } else {
      this._hideCounter();
    }
  }

  _showCounter() {
    this._likeCounter.classList.add(this._counterVisibleClass);
    this._likeContainer.classList.add(this._containerIsLikedClass);
  }

  _hideCounter() {
    this._likeCounter.classList.remove(this._counterVisibleClass);
    this._likeContainer.classList.remove(this._containerIsLikedClass);
  }

  _activateLike() {
    this._likeButton.classList.add(this._activeLikeClass);
  }

  _deactivateLike() {
    this._likeButton.classList.remove(this._activeLikeClass);
  }

  _handleLikeButtonClick(thisCard) {
    if (this._hasLike === true) {
      this._unLikeHandler(thisCard);
    } else {
      this._likeHandler(thisCard);
    }
  }

  /********************************************************************************
   * Delete
   ********************************************************************************/
  _handleDeleteButtonClick() {
    this._deleteHandler(this._cardData.id);
  }

  deleteCard() {
    this._cardItem.remove();
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
