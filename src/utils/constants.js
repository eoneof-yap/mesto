﻿// Имопртируем изображения для корректной сборки вебпаком
import image_1 from '../images/pyatigorks.jpeg';
import image_2 from '../images/elbrus.jpeg';
import image_3 from '../images/dombay-mountains.jpeg';
import image_4 from '../images/dombay-yak.jpeg';
import image_5 from '../images/gora-mashuk.jpeg';
import image_6 from '../images/kabardino-balkariya.jpeg';

// Данные карточек
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

// DOC
export const page = document.querySelector('.page');

// EDITABLES
export const currentProfileName = page.querySelector('.profile__name');
export const currentProfileInfo = page.querySelector('.profile__about');

// PAGE BUTTONS
export const editProfileButton = page.querySelector('.profile__edit-button');
export const addPhotoButton = page.querySelector('.profile__add-button');

// POPUPS
export const editProfilePopup = page.querySelector('.popup_type_edit');
export const addPhotoPopup = page.querySelector('.popup_type_add');
export const previewImagePopup = page.querySelector('.popup_type_preview');

// FORMS
export const editingForm = document.forms['form-edit'];
export const addingForm = document.forms['form-add'];

// INPUTS
export const newProfileNameInput = editingForm.elements['name-input'];
export const newProfileInfoInput = editingForm.elements['about-input'];
export const newPhotoNameInput = addingForm.elements['photo-name-input'];
export const newPhotoLinkInput = addingForm.elements['photo-link-input'];

export const cardSelectors = {
  templateID: '#card-template',
  cardsGrid: '.cards-grid',
  card: '.card',
  image: '.card__image',
  title: '.card__title',
  deleteButton: '.card__delete-button',
  likeButton: '.card__like-button',
  activeLike: 'card__like-button_active',
};

export const popups = {
  editProfilePopup: '.popup_type_edit',
  addPhotoPopup: '.popup_type_add',
  previewImagePopup: '.popup_type_preview',
  opened: 'popup_opened',
};

export const popupElements = {
  closeButton: '.popup__close-button',
  backdrop: '.popup__backdrop',
};

export const formElements = {
  input: '.form__input',
  submitButton: '.form__submit-button',
  disabledButton: 'button_disabled',
  inputError: 'form__input_type_error',
  errorHint: '.form__input-error-hint',
  activeError: 'form__input-error-hint_active',
};
