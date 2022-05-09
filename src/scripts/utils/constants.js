﻿export const profileSelectors = {
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about',
};

export const pageButtons = {
  editButton: document.querySelector('.profile__edit-button'),
  addButton: document.querySelector('.profile__add-button'),
};

export const cardSelectors = {
  cardItemSelector: '.card',
  cardsGridSelector: '.cards-grid',
  cardImageSelector: '.card__image',
  cardTitleSelector: '.card__title',
  cardDeleteButtonSelector: '.card__delete-button',
  cardLikeButtonSelector: '.card__like-button',
  cardActiveLikeSelector: 'card__like-button_active',
  cardTemplateId: '#card-template',
};

export const popupSelectors = {
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
  submitButton: '.form__submit-button',
  disabledButton: 'button_disabled',
  inputError: 'form__input_type_error',
  errorHint: '.form__input-error-hint',
  activeError: 'form__input-error-hint_active',
};

export const formInputsNames = {
  profileName: 'name-input',
  profileInfo: 'about-input',
  photoTitle: 'photo-name-input',
  photoLink: 'photo-link-input',
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
    title: 'Пятигорск',
    link: image_1,
  },
  {
    title: 'Гора Эльбрус',
    link: image_2,
  },
  {
    title: 'Домбай',
    link: image_3,
  },
  {
    title: 'Домбай',
    link: image_4,
  },
  {
    title: 'Гора Машук',
    link: image_5,
  },
  {
    title: 'Кабардино-Балкария',
    link: image_6,
  },
];
