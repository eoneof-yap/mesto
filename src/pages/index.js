import '../pages/index.css';

import {
  profileSelectors,
  pageButtons,
  cardSelectors,
  popupSelectors,
  formSelectors,
  initialCards,
} from '../scripts/utils/constants.js';

import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import UserInfo from '../scripts/components/UserInfo.js';
import { FormValidator } from '../scripts/components/FormValidator.js';

const userInfo = new UserInfo(profileSelectors);

const popupEdit = new PopupWithForm(
  popupSelectors.popupEditSelector,
  formSelectors,
  // formSubmitHandler
  (inputValues) => {
    userInfo.setUserInfo(inputValues);
    popupEdit.close();
  },
);

const popupAdd = new PopupWithForm(
  popupSelectors.popupAddSelector,
  formSelectors,
  (inputValues) => {
    const data = {
      title: inputValues.title,
      link: inputValues.link,
    };
    initialCardsList.renderItem(data);
    popupAdd.close();
  },
);

const createItem = (item) => {
  const newItem = new Card(
    {
      item,
      previewer: () => {
        const preview = new PopupWithImage(
          popupSelectors.popupPreviewSelector,
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
      initialCardsList.createItem(createItem(item).createCard());
    },
  },
  cardSelectors.cardsGridSelector,
);

const validators = {};

function handleEditButton() {
  validators['form-edit'].resetValidation();
  // => PopupWithForm.js => UserInfo.js
  popupEdit.setInputValues(userInfo.getUserInfo());
  popupEdit.open(); // => PopupWithForm.js
  validators['form-edit'].enableValidation();
}

function handleAddButton() {
  validators['form-add'].resetValidation();
  popupAdd.open();
  validators['form-add'].enableValidation();
}

function enableValidation(formSelectors) {
  formSelectors.formsArray.forEach((item) => {
    const validator = new FormValidator(item, formSelectors);
    const formID = item.getAttribute('id');
    validators[formID] = validator;
    validator.enableValidation();
  });
}
enableValidation(formSelectors);

// LISTENERS
pageButtons.editButton.addEventListener('click', handleEditButton);
pageButtons.addButton.addEventListener('click', handleAddButton);

// ENTRY POINT
initialCardsList.createInitialItems();
