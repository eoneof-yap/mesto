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
import PopupConfirm from '../../scripts/components/PopupConfirm.js';
import PopupWithForm from '../../scripts/components/PopupWithForm.js';
import PopupWithImage from '../../scripts/components/PopupWithImage.js';
import UserInfo from '../../scripts/components/UserInfo.js';
import FormValidator from '../../scripts/components/FormValidator.js';

const validators = {};

// FUNCTIONS

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

// обработчик нажатия на козину
// Card._handleDelete(){}
function handleDeleteCardButton() {
  popupConfirm.open();
}

// обработчик подтверждения удаления карточки
// PopupConfirm._handleSubmit(){}
function handleConfirmDeleteCard(target) {
  console.log(target);
  popupConfirm.close();
  // target.remove();
}

function handleUpdateSubmit() {
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

const popupConfirm = new PopupConfirm(
  popupSelectors,
  formSelectors,
  handleConfirmDeleteCard,
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
    handleDeleteCardButton,
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
