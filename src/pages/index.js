﻿import { FormValidator } from '../components/FormValidator.js';
export { createPreview, cardSelectors, formElements };

// -----------------------------------------------------------------------------
// REFACTOR

import '../pages/index.css';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
// import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';

import {
  initialCards,
  cardSelectors,
  pageElements,
  formElements,
  popup,
  forms,
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

// LISTENERS

// page buttons
pageElements.buttons.edit.addEventListener('click', () => {
  const editPopup = new PopupWithForm(popup.type.edit); // FIXME to direct const
  editPopup.open();
});

pageElements.buttons.add.addEventListener('click', () => {
  const addPopup = new PopupWithForm(popup.type.add); // FIXME to direct const
  addPopup.open();
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

// popup
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
  currentProfileName.textContent = forms.inputs.newProfileName.value;
  currentProfileInfo.textContent = forms.inputs.newProfileInfo.value;
  closePopup(popup.type.edit);
}

// function popup.type.addHandler() {
//   disableValidation(addingForm);
//   // форма изначально пуста
//   openPopup(popup.type.add);
//   enableValidation(addingForm);
// }

function addingFormSubmitHandler(evt) {
  preventDefaultBehavior(evt);
  renderElements(
    [
      {
        name: newPhotoName.value,
        link: newPhotoLink.value,
        alt: newPhotoName.value,
      },
    ],
    cardSelectorss,
  );
  closePopup(popup.type.add);
  evt.currentTarget.reset();
}

// listeners
// editProfileButton.addEventListener('click', popup.type.editHandler);
// addPhotoButton.addEventListener('click', popup.type.addHandler);

forms.editProfile.addEventListener('submit', editingFormSubmitHandler);
forms.addPhoto.addEventListener('submit', addingFormSubmitHandler);

// popup.elements.closeButton.forEach(function (item) {
//   item.addEventListener('click', closePopupHandler);
// });

// popup.elements.backdrop.forEach(function (item) {
//   item.addEventListener('click', closePopupHandler);
// });

// ENTRY POINT
// renderElements(initialCards, cardSelectors); // REFACTORED
