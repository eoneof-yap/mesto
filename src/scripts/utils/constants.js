﻿export const profileSelectors = {
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about',
  profilePhotoSelector: '.profile__photo',
};

export const pageButtons = {
  editButtonElement: document.querySelector('.profile__edit-button'),
  addButtonElement: document.querySelector('.profile__add-button'),
  updateButtonElement: document.querySelector('.profile__photo-overlay'),
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
  formsArray: Array.from(document.forms),
  formSelector: '.form',
  formInputSelector: '.form__input',
  formSubmitButtonSelector: '.form__submit-button',
  formDisabledButtonClass: 'button_disabled',
  formInpuErrorClass: 'form__input_type_error',
  formErrorHintSelector: '.form__input-error-hint',
  formActiveErrorClass: 'form__input-error-hint_active',
};

// Имопртируем изображения для корректной сборки вебпаком
import image_1 from '../../images/pyatigorks.jpeg';
import image_2 from '../../images/elbrus.jpeg';
import image_3 from '../../images/dombay-mountains.jpeg';
import image_4 from '../../images/dombay-yak.jpeg';
import image_5 from '../../images/gora-mashuk.jpeg';
import image_6 from '../../images/kabardino-balkariya.jpeg';

export const initialCards = [
  {
    name: 'Пятигорск',
    link: image_1,
  },
  {
    name: 'Гора Эльбрус',
    link: image_2,
  },
  {
    name: 'Домбай',
    link: image_3,
  },
  {
    name: 'Домбай',
    link: image_4,
  },
  {
    name: 'Гора Машук',
    link: image_5,
  },
  {
    name: 'Кабардино-Балкария',
    link: image_6,
  },
];
