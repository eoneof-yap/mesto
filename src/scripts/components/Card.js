﻿import { user } from '../../pages/index';

export default class Card {
  constructor({ cardData, handlers }, selectors, userData) {
    this._cardData = cardData;
    this._selectors = selectors;
    this._userData = userData;
    this._deleteHandler = handlers.deleteHandler;
    this._previewHandler = handlers.previewHandler;
    this._likeHandler = handlers.likeHandler;
    // this._unLikeHandler = handlers.unLikeHandler;
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
    this._renderLikesCounter(this._cardData);
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
  toggleLike(likesData) {
    this._renderLikesCounter(likesData);
  }

  _renderLikesCounter(likesData) {
    // prettier-ignore
    const {
      cardLikeCounterVisibleClass, cardActiveLikeSelector,
      cardLikeContainerIsLikedClass
    } = this._selectors;

    this._likeCounter.textContent = likesData.likes.length;

    if (likesData.likes.length > 0) {
      this._likeCounter.classList.add(cardLikeCounterVisibleClass);
      this._likeContainer.classList.add(cardLikeContainerIsLikedClass);
    } else {
      this._likeCounter.classList.remove(cardLikeCounterVisibleClass);
      this._likeContainer.classList.remove(cardLikeContainerIsLikedClass);
    }

    likesData.likes.forEach((item) => {
      if (this._isLiked(likesData)) {
        this._likeButton.classList.add(cardActiveLikeSelector);
      } else {
        this._likeButton.classList.remove(cardActiveLikeSelector);
      }
    });
  }

  _isLiked(likesData) {
    return likesData.likes.some((liker) => {
      if (liker._id === this._userData._id) {
        return true;
      } else {
        return false;
      }
    });
  }

  _handleLikeButtonClick() {
    if (this._isLiked(this._cardData)) {
      // this._unLikeHandler(this._cardData.id, this._userData);
    } else {
      console.log('unLIKED');
      this._likeHandler(this._cardData.id, this._userData);
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
    if (this._hasElement()) {
      this._deleteButton.addEventListener('click', () => {
        this._handleDeleteButtonClick();
      });
    }

    this._cardImage.addEventListener('click', () => {
      this._handleCardImageClick();
    });

    this._likeButton.addEventListener('click', () => {
      this._handleLikeButtonClick(this._cardData);
    });
  }

  _hasElement() {
    if (this._cardItem.contains(this._deleteButton)) {
      return true;
    } else {
      return false;
    }
  }
}
