﻿import { FormValidator } from '../components/FormValidator.js';
export { cardSelectors, formElements };

// -----------------------------------------------------------------------------
// REFACTOR

import '../pages/index.css';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';

import {
  pageElements,
  cardSelectors,
  initialCards,
  popups,
  forms,
  formElements,
} from '../utils/constants.js';

// генерируем начальный список карточек
// prettier-ignore
const initialCardsList = new Section(
  {
    cardData: initialCards,
    renderer: (item) => {
      // item извлекается из initialCards внутри Section.js

      const card = new Card(
        {
          previewData: item,
          previewer: (image, title) => {
            const preview = new PopupWithImage(popups.type.preview, image, title);
            preview.open();
          },
        },
        cardSelectors,
      );
      card.renderCard();
    },
  },
  cardSelectors.cardsGrid,
);

// LISTENERS

// page buttons
pageElements.buttons.edit.addEventListener('click', () => {
  const editPopup = new PopupWithForm(popups.type.edit);
  editPopup.open();
});

pageElements.buttons.add.addEventListener('click', () => {
  const addPopup = new PopupWithForm(popups.type.add);
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
  previewImagepopups.querySelector('.preview__image').setAttribute('src', evt.target.src);
  previewImagepopups.querySelector('.preview__image').setAttribute('alt', evt.target.alt);
  previewImagepopups.querySelector('.preview__caption').textContent = evt.target
    .closest('.card')
    .querySelector('.card__title').textContent;
  openPopup(previewImagePopup);
}

// function openPopup(popup) {
//   document.addEventListener('keydown', closePopupViaEscHandler);
//   popups.classList.add('popup_opened');
// }

// function closePopup(popup) {
//   document.removeEventListener('keydown', closePopupViaEscHandler);
//   popups.classList.remove('popup_opened');
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

// function editingFormSubmitHandler(evt) {
//   preventDefaultBehavior(evt);
//   pageElements.profile.name.textContent = inputTypes.profileName.value;
//   pageElements.profile.info.textContent = inputTypes.profileInfo.value;
//   closePopup(popups.type.edit);
// }

// function popups.type.addHandler() {
//   disableValidation(addingForm);
//   // форма изначально пуста
//   openPopup(popups.type.add);
//   enableValidation(addingForm);
// }

function addingFormSubmitHandler(evt) {
  preventDefaultBehavior(evt);
  renderElements(
    [
      {
        name: photoName.value,
        link: photoLink.value,
        alt: photoName.value,
      },
    ],
    cardSelectorss,
  );
  closePopup(popups.type.add);
  evt.currentTarget.reset();
}

// listeners
// editProfileButton.addEventListener('click', popups.type.editHandler);
// addPhotoButton.addEventListener('click', popups.type.addHandler);

// forms.type.edit.addEventListener('submit', editingFormSubmitHandler);
// forms.type.add.addEventListener('submit', addingFormSubmitHandler);

// popupElements.closeButton.forEach(function (item) {
//   item.addEventListener('click', closePopupHandler);
// });

// popupElements.backdrop.forEach(function (item) {
//   item.addEventListener('click', closePopupHandler);
// });

// ENTRY POINT
// renderElements(initialCards, cardSelectors); // REFACTORED
