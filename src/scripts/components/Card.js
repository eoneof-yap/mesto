﻿export default class Card {
  constructor(
    { item, deleteButtonClickHandler, previewHandler, likeHandler },
    selectors,
    userID,
  ) {
    this._cardItem = item;
    this._userID = userID;
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

  // deleteCard() {
  //   this.remove();
  // }

  createCard() {
    const cardElement = this._cloneTemplate();
    this._setEventListeners(cardElement);

    cardElement.querySelector(this._cardName).textContent = this._cardItem.name;
    cardElement.setAttribute('data-card-id', this._cardItem.id);
    cardElement.setAttribute('data-owner-id', this._cardItem.owner);
    cardElement.setAttribute('data-created-at', this._cardItem.createdAt);
    cardElement.querySelector(this._cardImage).setAttribute('alt', this._cardItem.name);
    cardElement.querySelector(this._cardImage).setAttribute('src', this._cardItem.link);

    this._hideDeleteButton(cardElement);
    this._renderLikesCounter(cardElement);

    return cardElement;
  }

  _cloneTemplate() {
    return document
      .querySelector(this._template)
      .content.querySelector(this._card)
      .cloneNode(true);
  }

  _setEventListeners(cardElement) {
    cardElement.querySelector(this._deleteButton).addEventListener('click', () => {
      this._handleDeleteButtonClick();
    });

    cardElement.querySelector(this._cardImage).addEventListener('click', () => {
      this._handleCardImageClick();
    });

    cardElement.querySelector(this._likeButton).addEventListener('click', () => {
      this._handleLikeButtonClick();
    });
  }

  _renderLikesCounter(cardElement) {
    const counterElement = cardElement.querySelector(this._likeCounter);
    const likeContainer = cardElement.querySelector(this._likeContainer);
    const likeButton = cardElement.querySelector(this._likeButton);

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

  _hideDeleteButton(cardElement) {
    if (this._cardItem.owner !== this._userID) {
      cardElement.querySelector(this._deleteButton).remove();
    }
  }

  _handleDeleteButtonClick() {
    this._deleteButtonClickHandler();
  }

  _handleCardImageClick() {
    this._previewHandler({ image: this._cardImage, title: this._title });
  }

  _handleLikeButtonClick() {
    console.log(this._cardItem.likes);
    this._likeHandler(this._userID);
  }
}
