import '../pages/index.css';

import {
  profileSelectors,
  pageButtons,
  cardSelectors,
  popupSelectors,
  formSelectors,
  formInputsNames,
  initialCards,
} from '../utils/constants.js';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';

const userInfo = new UserInfo(profileSelectors);

function handleEditButton() {
  popupEdit.setInputValues(
    // get user info from page to inputs
    userInfo.getUserInfo(),
  );
  popupEdit.open();
}

//prettier-ignore
const popupEdit = new PopupWithForm(
  popupSelectors.popupEdit,
  formSelectors,
  // formSubmitHandler
  (inputValues) => {userInfo.setUserInfo(inputValues);
    popupEdit.close();
  },
);

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

const popupAdd = new PopupWithForm(
  popupSelectors.popupAdd,
  formSelectors,
  (inputValues) => {
    userInfo.setUserInfo(inputValues);
    popupAdd.close();
  },
);

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

function handleAddButton() {
  popupAdd.open();
}

// LISTENERS
pageButtons.edit.addEventListener('click', handleEditButton);
pageButtons.add.addEventListener('click', handleAddButton);

// ENTRY POINT
initialCardsList.createInitialItems();

// function enableValidation(form) {
//   // from FormValidator.js
//   const validator = new FormValidator(form, formSelectors);
//   validator.enableValidation();
// }

// function disableValidation(form) {
//   // from FormValidator.js
//   const validator = new FormValidator(form, formSelectors);
//   validator.disableValidation();
// }
