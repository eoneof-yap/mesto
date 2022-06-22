﻿export default class Card {
  constructor(
    { item, deleteButtonClickHandler, previewHandler, likeHandler },
    selectors,
    userData,
  ) {
    this._cardItem = item;
    this._userData = userData;
    this._card = selectors.cardSelector;
    this._cardImage = selectors.cardImageSelector;
    this._cardName = selectors.cardNameSelector;
    this._counterVisible = selectors.cardLikeCounterVisibleClass;
    this._deleteButton = selectors.cardDeleteButtonSelector;
    this._likeButton = selectors.cardLikeButtonSelector;
    this._likeButtonIsActive = selectors.cardActiveLikeSelector;
    this._likeContainer = selectors.cardLikeContainerSelector;
    this._likeContainerIsLiked = selectors.cardLikeContainerIsLikedClass;
    this._likeCounter = selectors.cardLikeCounterSelector;
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
    const cardElement = this._cloneTemplate();
    const deleteButton = cardElement.querySelector(this._deleteButton);
    const cardImage = cardElement.querySelector(this._cardImage);
    const likeButton = cardElement.querySelector(this._likeButton);
    const counterElement = cardElement.querySelector(this._likeCounter);
    const likeContainer = cardElement.querySelector(this._likeContainer);

    cardElement.querySelector(this._cardName).textContent = this._cardItem.name;

    cardElement.setAttribute('data-card-id', this._cardItem.id);
    cardElement.setAttribute('data-owner-id', this._cardItem.owner);
    cardElement.setAttribute('data-created-at', this._cardItem.createdAt);
    cardElement.querySelector(this._cardImage).setAttribute('alt', this._cardItem.name);
    cardElement.querySelector(this._cardImage).setAttribute('src', this._cardItem.link);

    // this._hideDeleteButton(deleteButton);
    this._renderLikesCounter(likeButton, counterElement, likeContainer);
    this._setEventListeners(cardElement, deleteButton, cardImage, likeButton);

    return cardElement;
  }

  _cloneTemplate() {
    return document
      .querySelector(this._template)
      .content.querySelector(this._card)
      .cloneNode(true);
  }

  setLikes() {
    
  }

  _renderLikesCounter(likeButton, counterElement, likeContainer) {
    counterElement.textContent = this._cardItem.likes.length;

    if (parseInt(counterElement.textContent) > 0) {
      counterElement.classList.add(this._counterVisible);
      likeContainer.classList.add(this._likeContainerIsLiked);
      likeButton.classList.add(this._likeButtonIsActive);
    } else {
      counterElement.classList.remove(this._counterVisible);
      likeContainer.classList.remove(this._likeContainerIsLiked);
      likeButton.classList.remove(this._likeButtonIsActive);
    }
  }

  _hideDeleteButton(deleteButton) {
    if (this._cardItem.owner !== this._userID) {
      deleteButton.remove();
    }
  }

  _handleDeleteButtonClick() {
    this._deleteButtonClickHandler(this._cardItem.id);
  }

  _handleCardImageClick() {
    this._previewHandler({ image: this._cardImage, title: this._title });
  }

  _handleLikeButtonClick() {
    this._likeHandler(this._cardItem.id, /* this._userData */);
  }

  _setEventListeners(cardElement, deleteButton, cardImage, likeButton) {
    if (this._hasElement(cardElement, deleteButton)) {
      deleteButton.addEventListener('click', () => {
        this._handleDeleteButtonClick();
      });
    }

    cardImage.addEventListener('click', () => {
      this._handleCardImageClick();
    });

    likeButton.addEventListener('click', () => {
      this._handleLikeButtonClick();
    });
  }

  _hasElement(cardElement, element) {
    if (cardElement.contains(element)) {
      return true;
    } else {
      return false;
    }
  }
}
