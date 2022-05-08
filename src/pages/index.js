import '../pages/index.css';

import {
  profile,
  pageButtons,
  cardSelectors,
  popupSelectors,
  formSelectors,
  formInputs,
  initialCards,
} from '../utils/constants.js';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';
export { cardSelectors, formSelectors };

/*
`Section.js` и `Card.js` обмениваются данными через `renderer`
`item` -- это элемент списка `initialCards`, он извлекается внутри `Section.js`
и передается в `Card.js`
*/

const createItem = (item) => {
  const newItem = new Card(
    {
      item,
      previewer: () => {
        const preview = new PopupWithImage(
          popupSelectors.popupPreview,
          item,
          popupSelectors,
        );
        preview.open();
      },
    },
    cardSelectors,
  );
  return newItem;
};

const initialCardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const element = createItem(item).createCard();
      initialCardsList.createItem(element);
    },
  },
  cardSelectors.cardsGrid,
);

initialCardsList.createInitialItems();

const userInfo = new UserInfo(profile);

const formSubmitHandler = (item) => {
  renderer(item);
};

// LISTENERS
pageButtons.edit.addEventListener('click', () => {
  info.getUserInfo(); // TODO
});

pageButtons.add.addEventListener('click', () => {
  const addPopup = new PopupWithForm(popupSelectors.popupAdd, (item) => {
    formSubmitHandler(item);
  });
  addPopup.open();
});

// -----------------------------------------------------------------------------
//
//
//
//
// -----------------------------------------------------------------------------

function enableValidation(form) {
  // from FormValidator.js
  const validator = new FormValidator(form, formSelectors);
  validator.enableValidation();
}

function disableValidation(form) {
  // from FormValidator.js
  const validator = new FormValidator(form, formSelectors);
  validator.disableValidation();
}
