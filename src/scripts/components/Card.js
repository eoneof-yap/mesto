﻿export default class Card {
  constructor({ item, deleteHandler, previewHandler, likeHandler }, selectors) {
    this._cardItem = item;

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

    this._deleteHandler = deleteHandler;
    this._previewHandler = previewHandler;
    this._likeHandler = likeHandler;

    // this._handleDeleteButtonClick = this._handleDeleteButtonClick.bind(this);
    // this._handleCardImageClick = this._handleCardImageClick.bind(this);
    // this._handleLikeButtonClick = this._handleLikeButtonClick.bind(this);
  }

  // _isOwner() {
  //   if (this._cardItem.owner ===  )
  // }

  createCard() {
    const cardElement = this._cloneTemplate();
    const cardImage = cardElement.querySelector(this._cardImage);

    cardElement.querySelector(this._cardName).textContent = this._cardItem.name;
    cardElement.setAttribute('data-card-id', this._cardItem.id);
    cardElement.setAttribute('data-owner-id', this._cardItem.owner);
    cardElement.setAttribute('data-created-at', this._cardItem.createdAt);
    cardImage.setAttribute('alt', this._cardItem.name);
    cardImage.setAttribute('src', this._cardItem.link);

    const counterElement = cardElement.querySelector(this._likeCounter);
    const likeContainer = cardElement.querySelector(this._likeContainer);
    const likeButton = cardElement.querySelector(this._likeButton);

    // FIXME отсавить но как-то переписать
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

    this._setEventListeners(cardElement);
    return cardElement;
  }

  // deleteCard() {
  //   this._handleDeleteCard();
  // }

  _handleDeleteButtonClick() {
    this._deleteHandler();
  }

  _handleCardImageClick() {
    this._previewHandler({ image: this._cardImage, title: this._title });
  }

  _handleLikeButtonClick() {
    this._likeHandler();
  }

  _cloneTemplate() {
    return document
      .querySelector(this._template)
      .content.querySelector(this._card)
      .cloneNode(true);
  }

  _setEventListeners(element) {
    element.querySelector(this._deleteButton).addEventListener('click', () => {
      this._handleDeleteButtonClick();
    });

    element.querySelector(this._cardImage).addEventListener('click', () => {
      this._handleCardImageClick();
    });

    element.querySelector(this._likeButton).addEventListener('click', () => {
      this._handleLikeButtonClick();
    });
  }

  // getId() {
  //   return this._cardItem._id;
  // }

  // getOwnerId() {
  //   return this._cardItem.owner;
  // }
}
