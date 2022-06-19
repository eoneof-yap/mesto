﻿export const hiddenClass = 'hidden';

export const preloaderSelectors = {
  pagePreloaderSelector: '.preloader',
  spinnerSelector: '.spinner',
};

export const profileSelectors = {
  profileSelector: '.profile',
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about',
  profilePhotoSelector: '.profile__photo',
};

export const buttonsSelectors = {
  editButtonSelector: '.profile__edit-button',
  addButtonSelector: '.profile__add-button',
  updatePhotoButtonSelector: '.profile__photo-overlay',
};

export const cardSelectors = {
  cardSelector: '.card',
  cardsGridSelector: '.cards-grid',
  cardImageSelector: '.card__image',
  cardNameSelector: '.card__title',
  cardDeleteButtonSelector: '.card__delete-button',
  cardLikeContainerSelector: '.card__like-container',
  cardLikeContainerIsLikedClass: 'card__like-container_is-liked',
  cardLikeCounterSelector: '.card__like-counter',
  cardLikeCounterVisibleClass: 'card__like-counter_visible',
  cardLikeButtonSelector: '.card__like-button',
  cardActiveLikeSelector: 'card__like-button_active',
  cardTemplateId: '#card-template',
};

export const popupSelectors = {
  popupConfirmSelector: '.popup_type_confirm',
  popupUpdateSelector: '.popup_type_update',
  popupEditSelector: '.popup_type_edit',
  popupAddSelector: '.popup_type_add',
  popupPreviewSelector: '.popup_type_preview',
  popupOpenedClass: 'popup_opened',
  popupCloseButtonSelector: '.popup__close-button',
  popupBackdropSelector: '.popup__backdrop',
  popupPreviewImageSelector: '.preview__image',
  popupPreviewCaptionSelector: '.preview__caption',
};

export const formSelectors = {
  formSelector: '.form',
  formInputSelector: '.form__input',
  formSubmitButtonSelector: '.form__submit-button',
  formDisabledButtonClass: 'button_disabled',
  formInpuErrorClass: 'form__input_type_error',
  formErrorHintSelector: '.form__input-error-hint',
  formActiveErrorClass: 'form__input-error-hint_active',
  formAddCardID: 'form-add',
  formUpdatePhotoID: 'form-update',
  formEditInfoID: 'form-edit',
};

export const apiConfig = {
  serverURL: 'https://mesto.nomoreparties.co/v1/cohort-43/',
  cardsURL: 'cards/',
  userURL: 'users/me/',
  avatarURL: 'avatar/',
  headers: {
    authorization: 'c9da976c-ad10-4165-97ed-736e051c4019',
    'content-type': 'application/json',
  },
};

export const validators = {};
