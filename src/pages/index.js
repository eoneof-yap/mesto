﻿import { FormValidator } from '../components/FormValidator.js';

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

export { cardSelectors, formElements };

const initialCardsList = new Section(
  {
    items: initialCards,
    /*
      `Section.js` и `Card.js` обмениваются данными через `renderer`
      `item` -- это элемент списка `initialCards`, он извлекается внутри `Section.js`
      и передается в `Card.js`
    */
    renderer: (item) => {
      renderer(item);
    },
  },
  cardSelectors.cardsGrid,
);

// prettier-ignore
const renderer =  (item) => {
      const card = new Card(
        {
          previewData: item,
          previewer: (image, title) => {
            const preview = new PopupWithImage(popups.type.preview, image, title);
            preview.open();
          },
        },
        cardSelectors, // Card
      );
      // card.renderCard(); // Section
      console.log('renderCard')
    }

const formSubmitHandler = (item) => {
  console.log(item);
  renderer(item);
};

// LISTENERS
pageElements.buttons.edit.addEventListener('click', (evt) => {
  const editPopup = new PopupWithForm(popups.type.edit, () => {
    formSubmitHandler(evt);
  });
  editPopup.open();
});

pageElements.buttons.add.addEventListener('click', (evt) => {
  const addPopup = new PopupWithForm(popups.type.add, () => {
    formSubmitHandler(evt);
  });
  addPopup.open();
});

// ENTRY POINT
initialCardsList.addInitialItems();

// -----------------------------------------------------------------------------
//
//
//
//
// -----------------------------------------------------------------------------

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
