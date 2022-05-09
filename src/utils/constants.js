﻿export const profileSelectors = {
  name: '.profile__name',
  about: '.profile__about',
};

export const pageButtons = {
  edit: document.querySelector('.profile__edit-button'),
  add: document.querySelector('.profile__add-button'),
};

export const cardSelectors = {
  card: '.card',
  cardsGrid: '.cards-grid',
  image: '.card__image',
  title: '.card__title',
  deleteButton: '.card__delete-button',
  likeButton: '.card__like-button',
  activeLike: 'card__like-button_active',
  templateID: '#card-template',
};

export const popupSelectors = {
  popupEdit: '.popup_type_edit',
  popupAdd: '.popup_type_add',
  popupPreview: '.popup_type_preview',
  popupOpened: 'popup_opened',
  closeButton: '.popup__close-button',
  popupBackdrop: '.popup__backdrop',
  previewImage: '.preview__image',
  previewCaption: '.preview__caption',
};

export const formSelectors = {
  forms: Array.from(document.forms),
  form: '.form',
  input: '.form__input',
  submitButton: '.form__submit-button',
  disabledButton: 'button_disabled',
  inputError: 'form__input_type_error',
  errorHint: '.form__input-error-hint',
  activeError: 'form__input-error-hint_active',
};

export const config = {
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  errorSelector: '.popup__error',
  errorClass: 'popup__error_active',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
};

export const formInputsNames = {
  profileName: 'name-input',
  profileInfo: 'about-input',
  photoTitle: 'photo-name-input',
  photoLink: 'photo-link-input',
};

// Имопртируем изображения для корректной сборки вебпаком
import image_1 from '../images/pyatigorks.jpeg';
import image_2 from '../images/elbrus.jpeg';
import image_3 from '../images/dombay-mountains.jpeg';
import image_4 from '../images/dombay-yak.jpeg';
import image_5 from '../images/gora-mashuk.jpeg';
import image_6 from '../images/kabardino-balkariya.jpeg';

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
