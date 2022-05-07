﻿import { FormValidator } from '../components/FormValidator.js';
export { createPreview, cardSelectors, validationTargets };

// -----------------------------------------------------------------------------
// REFACTOR

import '../pages/index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import { initialCards, cardSelectors } from '../utils/constants.js';

// генерируем начальный список карточек
const initialCardsList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      // item извлекается из initialCards внутри Section.js
      const card = new Card(item, cardSelectors);
      card.renderCard();
    },
  },
  cardSelectors.cardsGridSelector,
);

// ENTRY POINT
initialCardsList.addInitialItems();

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

const validationTargets = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  disabledButtonClass: 'button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorHintClass: '.form__input-error-hint',
  activeErrorClass: 'form__input-error-hint_active',
};

// DOC
const page = document.querySelector('.page');

// EDITABLES
const currentProfileName = page.querySelector('.profile__name');
const currentProfileInfo = page.querySelector('.profile__about');

// PAGE BUTTONS
const editProfileButton = page.querySelector('.profile__edit-button');
const addPhotoButton = page.querySelector('.profile__add-button');
const popupCloseButton = page.querySelectorAll('.popup__close-button');
const popupBackdrop = page.querySelectorAll('.popup__backdrop');

// POPUPS
const editProfilePopup = page.querySelector('.popup_type_edit');
const addPhotoPopup = page.querySelector('.popup_type_add');
const previewImagePopup = page.querySelector('.popup_type_preview');

// FORMS
const editingForm = document.forms['form-edit'];
const addingForm = document.forms['form-add'];

// INPUTS
const newProfileNameInput = editingForm.elements['name-input'];
const newProfileInfoInput = editingForm.elements['about-input'];
const newPhotoNameInput = addingForm.elements['photo-name-input'];
const newPhotoLinkInput = addingForm.elements['photo-link-input'];

// FUNCTIONS
function preventDefaultBehavior(evt) {
  evt.preventDefault();
}

// popups
function createPreview(evt) {
  previewImagePopup.querySelector('.preview__image').setAttribute('src', evt.target.src);
  previewImagePopup.querySelector('.preview__image').setAttribute('alt', evt.target.alt);
  previewImagePopup.querySelector('.preview__caption').textContent = evt.target
    .closest('.card')
    .querySelector('.card__title').textContent;
  openPopup(previewImagePopup);
}

function openPopup(popup) {
  document.addEventListener('keydown', closePopupViaEscHandler);
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  document.removeEventListener('keydown', closePopupViaEscHandler);
  popup.classList.remove('popup_opened');
}

// function renderElements(data, selectors) {
//   data.forEach((element) => {
//     // Card.js
//     const card = new Card(element, selectors);
//     card.renderCard();
//   });
// }

function enableValidation(form) {
  // from FormValidator.js
  const validator = new FormValidator(form, validationTargets);
  validator.enableValidation();
}

function disableValidation(form) {
  // from FormValidator.js
  const validator = new FormValidator(form, validationTargets);
  validator.disableValidation();
}

// HANDLERS
function closePopupHandler(evt) {
  closePopup(evt.target.closest('.popup_opened'));
}

function closePopupViaEscHandler(evt) {
  if (evt.key === 'Escape') {
    closePopup(page.querySelector('.popup_opened'));
  }
}

function editProfilePopupHandler() {
  disableValidation(editingForm);
  newProfileNameInput.value = currentProfileName.textContent;
  newProfileInfoInput.value = currentProfileInfo.textContent;
  openPopup(editProfilePopup);
  enableValidation(editingForm);
}

function editingFormSubmitHandler(evt) {
  preventDefaultBehavior(evt);
  currentProfileName.textContent = newProfileNameInput.value;
  currentProfileInfo.textContent = newProfileInfoInput.value;
  closePopup(editProfilePopup);
}

function addPhotoPopupHandler() {
  disableValidation(addingForm);
  // форма изначально пуста
  openPopup(addPhotoPopup);
  enableValidation(addingForm);
}

function addingFormSubmitHandler(evt) {
  preventDefaultBehavior(evt);
  renderElements(
    [
      {
        name: newPhotoNameInput.value,
        link: newPhotoLinkInput.value,
        alt: newPhotoNameInput.value,
      },
    ],
    cardSelectorss,
  );
  closePopup(addPhotoPopup);
  evt.currentTarget.reset();
}

// listeners
editProfileButton.addEventListener('click', editProfilePopupHandler);
addPhotoButton.addEventListener('click', addPhotoPopupHandler);

editingForm.addEventListener('submit', editingFormSubmitHandler);
addingForm.addEventListener('submit', addingFormSubmitHandler);

popupCloseButton.forEach(function (item) {
  item.addEventListener('click', closePopupHandler);
});

popupBackdrop.forEach(function (item) {
  item.addEventListener('click', closePopupHandler);
});

// ENTRY POINT
// renderElements(initialCards, cardSelectors); // REFACTORED
