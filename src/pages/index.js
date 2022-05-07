﻿import { FormValidator } from '../components/FormValidator.js';
export { createPreview, cardSelectors, formElements };

// -----------------------------------------------------------------------------
// REFACTOR

import '../pages/index.css';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';

import {
  initialCards,
  cardSelectors,
  editProfileButton,
  addPhotoButton,
  editingForm,
  addingForm,
  formElements,
  popups,
} from '../utils/constants.js';

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

// Открываем попап
editProfileButton.addEventListener('click', () => {
  const editPopup = new PopupWithForm(popups.editProfilePopup); // FIXME to direct const
  editPopup.open();
});

// ENTRY POINT
initialCardsList.addInitialItems();

// -----------------------------------------------------------------------------
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

// function openPopup(popup) {
//   document.addEventListener('keydown', closePopupViaEscHandler);
//   popup.classList.add('popup_opened');
// }

// function closePopup(popup) {
//   document.removeEventListener('keydown', closePopupViaEscHandler);
//   popup.classList.remove('popup_opened');
// }

// function renderElements(data, selectors) {
//   data.forEach((element) => {
//     // Card.js
//     const card = new Card(element, selectors);
//     card.renderCard();
//   });
// }

function enableValidation(form) {
  // from FormValidator.js
  const validator = new FormValidator(form, formElements);
  validator.enableValidation();
}

function disableValidation(form) {
  // from FormValidator.js
  const validator = new FormValidator(form, formElements);
  validator.disableValidation();
}

// HANDLERS
function closePopupHandler(evt) {
  closePopup(evt.target.closest('.popup_opened'));
}

// function closePopupViaEscHandler(evt) {
//   if (evt.key === 'Escape') {
//     closePopup(page.querySelector('.popup_opened'));
//   }
// }

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
// editProfileButton.addEventListener('click', editProfilePopupHandler);
addPhotoButton.addEventListener('click', addPhotoPopupHandler);

editingForm.addEventListener('submit', editingFormSubmitHandler);
addingForm.addEventListener('submit', addingFormSubmitHandler);

// popupElements.closeButton.forEach(function (item) {
//   item.addEventListener('click', closePopupHandler);
// });

// popupElements.backdrop.forEach(function (item) {
//   item.addEventListener('click', closePopupHandler);
// });

// ENTRY POINT
// renderElements(initialCards, cardSelectors); // REFACTORED
