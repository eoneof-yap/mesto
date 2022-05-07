﻿﻿// Имопртируем изображения для корректной сборки вебпаком
import image_1 from '../images/pyatigorks.jpeg';
import image_2 from '../images/elbrus.jpeg';
import image_3 from '../images/dombay-mountains.jpeg';
import image_4 from '../images/dombay-yak.jpeg';
import image_5 from '../images/gora-mashuk.jpeg';
import image_6 from '../images/kabardino-balkariya.jpeg';

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

const page = document.querySelector('.page');

export const pageElements = {
  profile: {
    name: page.querySelector('.profile__name'),
    info: page.querySelector('.profile__about'),
  },
  buttons: {
    edit: page.querySelector('.profile__edit-button'),
    add: page.querySelector('.profile__add-button'),
  },
};

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
  type: {
    edit: '.popup_type_edit',
    add: '.popup_type_add',
    preview: '.popup_type_preview',
    opened: 'popup_opened',
  },
};

export const popupElements = {
  closeButton: '.popup__close-button',
  backdrop: '.popup__backdrop',
  previewImage: '.preview__image',
  previewCaption: '.preview__caption',
};

export const forms = {
  type: {
    edit: document.forms['form-edit'],
    add: document.forms['form-add'],
  },
};

export const formElements = {
  input: '.form__input',
  submitButton: '.form__submit-button',
  disabledButton: 'button_disabled',
  inputError: 'form__input_type_error',
  errorHint: '.form__input-error-hint',
  activeError: 'form__input-error-hint_active',
};

export const inputTypes = {
  profileName: forms.type.edit.elements['name-input'],
  profileInfo: forms.type.edit.elements['about-input'],
  photoName: forms.type.add.elements['photo-name-input'],
  photoLink: forms.type.add.elements['photo-link-input'],
};
