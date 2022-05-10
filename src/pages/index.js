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
import FormValidator from '../scripts/components/FormValidator.js';

const userInfo = new UserInfo(profileSelectors);

// prettier-ignore
// PopupWithForm.js => formSubmitHandler
function handleInfoSubmit(inputValues) { // <= _getInputValues()
  userInfo.setUserInfo(inputValues);
  popupEdit.close();
}

const popupEdit = new PopupWithForm(
  popupSelectors.popupEditSelector,
  formSelectors,
  handleInfoSubmit,
);

// prettier-ignore
// PopupWithForm.js => formSubmitHandler
function handleAddSubmit(inputValues) { // <= _getInputValues()
  const data = {
    title: inputValues.title,
    link: inputValues.link,
  };
  initialCardsList.renderItem(data);
  popupAdd.close();
}

const popupAdd = new PopupWithForm(
  popupSelectors.popupAddSelector,
  formSelectors,
  handleAddSubmit,
);

const createItem = (item) => {
  const newItem = new Card(
    {
      item,
      previewer: () => {
        const preview = new PopupWithImage(
          popupSelectors.popupPreviewSelector,
          popupSelectors,
        );
        preview.open(item);
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

// FUNCTIONS
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
