﻿export default class Card {
  constructor(
    { item, deleteButtonClickHandler, previewHandler, likeHandler },
    selectors,
    userData,
  ) {
    this._cardItem = item;
    this._userData = userData;
    this._card = selectors.cardSelector;
    this._cardImageSelector = selectors.cardImageSelector;
    this._cardName = selectors.cardNameSelector;
    this._counterVisible = selectors.cardLikeCounterVisibleClass;
    this._deleteButtonSelector = selectors.cardDeleteButtonSelector;
    this._likeButtonSelector = selectors.cardLikeButtonSelector;
    this._likeButtonIsActive = selectors.cardActiveLikeSelector;
    this._likeContainerSelector = selectors.cardLikeContainerSelector;
    this._likeContainerIsLiked = selectors.cardLikeContainerIsLikedClass;
    this._likeCounterSelector = selectors.cardLikeCounterSelector;
    this._template = selectors.cardTemplateId;

    this._deleteButtonClickHandler = deleteButtonClickHandler;
    this._previewHandler = previewHandler;
    this._likeHandler = likeHandler;

    // this.deleteCard = this.deleteCard().bind(this);
  }

  deleteCard() {
    document.querySelector(`[data-card-id="${this._cardItem.id}"]`).remove();
  }

  createCard() {
    this._cardElement = this._cloneTemplate();
    this._deleteButton = this._cardElement.querySelector(this._deleteButtonSelector);
    this._cardImage = this._cardElement.querySelector(this._cardImageSelector);
    this._likeButton = this._cardElement.querySelector(this._likeButtonSelector);
    this._counterElement = this._cardElement.querySelector(this._likeCounterSelector);
    this._likeContainer = this._cardElement.querySelector(this._likeContainerSelector);

    this._cardElement.querySelector(this._cardName).textContent = this._cardItem.name;

    this._cardElement.setAttribute('data-card-id', this._cardItem.id);
    this._cardElement.setAttribute('data-owner-id', this._cardItem.owner);
    this._cardElement.setAttribute('data-created-at', this._cardItem.createdAt);
    this._cardImage.setAttribute('alt', this._cardItem.name);
    this._cardImage.setAttribute('src', this._cardItem.link);

    this._hideDeleteButton();
    this._renderLikesCounter();
    this._setEventListeners();

    return this._cardElement;
  }

  _hideDeleteButton() {
    if (this._cardItem.owner !== this._userData._id) {
      this._deleteButton.remove();
    }
  }

  _cloneTemplate() {
    return document
      .querySelector(this._template)
      .content.querySelector(this._card)
      .cloneNode(true);
  }

  toggleLike(res) {
    this._renderLikesCounter();
  }

  _renderLikesCounter(res = '') {
    this._counterElement.textContent = this._cardItem.likes.length;

    if (this._cardItem.likes.length > 0) {
      this._counterElement.classList.add(this._counterVisible);
      this._likeContainer.classList.toggle(this._likeContainerIsLiked);
    } else {
      this._counterElement.classList.remove(this._counterVisible);
    }

    if (this._cardItem.owner === this._userData._id) {
      this._likeButton.classList.add(this._likeButtonIsActive);
      this._likeContainer.classList.add(this._likeContainerIsLiked);
    }
  }

  _handleDeleteButtonClick() {
    this._deleteButtonClickHandler(this._cardItem.id);
  }

  _handleCardImageClick() {
    this._previewHandler({ image: this._cardImage, title: this._title });
  }

  _handleLikeButtonClick() {
    this._likeHandler(this._cardItem.id, this._userData);
  }

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
      this._handleLikeButtonClick();
    });
  }

  _hasElement() {
    if (this._cardElement.contains(this._deleteButton)) {
      return true;
    } else {
      return false;
    }
  }
}
