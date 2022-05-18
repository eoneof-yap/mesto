import './index.css';

import {
  profileSelectors,
  pageButtons,
  cardSelectors,
  popupSelectors,
  formSelectors,
  initialCards,
} from '../../scripts/utils/constants.js';

import Card from '../../scripts/components/Card.js';
import Section from '../../scripts/components/Section.js';
import Popup from '../../scripts/components/Popup.js';
import PopupWithForm from '../../scripts/components/PopupWithForm.js';
import PopupWithImage from '../../scripts/components/PopupWithImage.js';
import UserInfo from '../../scripts/components/UserInfo.js';
import FormValidator from '../../scripts/components/FormValidator.js';

const validators = {};

// FUNCTIONS

function handleConfirmDeleteCard() {
  validators['form-update'].resetValidation();
  // => PopupWithForm.js => UserInfo.js
  popupConfirm.open(); // => PopupWithForm.js
}

function handleUpdateButton() {
  validators['form-update'].resetValidation();
  // => PopupWithForm.js => UserInfo.js
  popupUpdate.open(); // => PopupWithForm.js
}

function handleEditButton() {
  validators['form-edit'].resetValidation();
  // => PopupWithForm.js => UserInfo.js
  popupEdit.setInputValues(userInfo.getUserInfo());
  popupEdit.open(); // => PopupWithForm.js
}

function handleAddButton() {
  validators['form-add'].resetValidation();
  popupAdd.open();
}

function enableValidation(formSelectors) {
  formSelectors.formsArray.forEach((item) => {
    const validator = new FormValidator(item, formSelectors);
    const formID = item.getAttribute('id');
    validators[formID] = validator;
    validator.enableValidation();
  });
}
function handleConfirmSubmit(inputValues) {
  // <= _getInputValues()
  popupConfirm.close();
}

function handleUpdateSubmit(inputValues) {
  // <= _getInputValues()
  popupUpdate.close();
}

// prettier-ignore
// PopupWithForm.js => formSubmitHandler
function handleInfoSubmit(inputValues) { // <= _getInputValues()
  userInfo.setUserInfo(inputValues);
  popupEdit.close();
}

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

// OBJECTS INSTANCES

const userInfo = new UserInfo(profileSelectors);

const popupPreview = new PopupWithImage(
  popupSelectors.popupPreviewSelector,
  popupSelectors,
);

// TODO create class PopupWithButton ??
const popupConfirm = new Popup(
  popupSelectors.popupConfirmSelector,
  // formSelectors,
  // handleConfirmDeleteCard,
);

const popupUpdate = new PopupWithForm(
  popupSelectors.popupUpdateSelector,
  formSelectors,
  handleUpdateSubmit,
);

const popupEdit = new PopupWithForm(
  popupSelectors.popupEditSelector,
  formSelectors,
  handleInfoSubmit,
);

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
        popupPreview.open(item);
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

// LISTENERS

pageButtons.updateButtonElement.addEventListener('click', handleUpdateButton);
pageButtons.editButtonElement.addEventListener('click', handleEditButton);
pageButtons.addButtonElement.addEventListener('click', handleAddButton);

popupConfirm.setEventListeners();
popupUpdate.setEventListeners();
popupPreview.setEventListeners();
popupEdit.setEventListeners();
popupAdd.setEventListeners();

// ENTRY POINT

initialCardsList.createInitialItems();
enableValidation(formSelectors);
