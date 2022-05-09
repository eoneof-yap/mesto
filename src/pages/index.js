import '../pages/index.css';

import {
  profileSelectors,
  pageButtons,
  cardSelectors,
  popupSelectors,
  formSelectors,
  initialCards,
} from '../utils/constants.js';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';

const userInfo = new UserInfo(profileSelectors);

const popupEdit = new PopupWithForm(
  popupSelectors.popupEdit,
  formSelectors,
  // formSubmitHandler
  (inputValues) => {
    userInfo.setUserInfo(inputValues);
    popupEdit.close();
  },
);

const popupAdd = new PopupWithForm(
  popupSelectors.popupAdd,
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
      initialCardsList.createItem(createItem(item).createCard());
    },
  },
  cardSelectors.cardsGrid,
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
  formSelectors.forms.forEach((item) => {
    const validator = new FormValidator(item, formSelectors);
    const formID = item.getAttribute('id');
    validators[formID] = validator;
    validator.enableValidation();
  });
}
enableValidation(formSelectors);

// LISTENERS
pageButtons.edit.addEventListener('click', handleEditButton);
pageButtons.add.addEventListener('click', handleAddButton);

// ENTRY POINT
initialCardsList.createInitialItems();
