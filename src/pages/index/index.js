import './index.css';

import {
  profileSelectors,
  pageButtons,
  cardSelectors,
  popupSelectors,
  formSelectors,
  apiConfig,
  /*   initialCards, */
} from '../../scripts/utils/constants.js';

// import { initialCards } from '../../scripts/utils/mockData.js';

import Card from '../../scripts/components/Card.js';
import Section from '../../scripts/components/Section.js';
import PopupConfirm from '../../scripts/components/PopupConfirm.js';
import PopupWithForm from '../../scripts/components/PopupWithForm.js';
import PopupWithImage from '../../scripts/components/PopupWithImage.js';
import UserInfo from '../../scripts/components/UserInfo.js';
import FormValidator from '../../scripts/components/FormValidator.js';
import Api from '../../scripts/components/Api';

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

function handleUpdateSubmit(inputValues) {
  console.log(inputValues);
  userInfo.setUserProfilePhoto(inputValues);
  popupUpdate.close();
}

// prettier-ignore
// PopupWithForm.js => formSubmitHandler
function handleInfoSubmit(inputValues) { // <= _getInputValues()
  console.log(inputValues)
  userInfo.setUserInfo(inputValues);
  popupEdit.close();
}

// prettier-ignore
// PopupWithForm.js => formSubmitHandler
function handleAddSubmit(inputValues) { // <= _getInputValues()
  const data = {
    name: inputValues.name,
    link: inputValues.link,
  };
  initialCardsList.renderSectionItem(data);
  popupAdd.close();
}

// OBJECTS INSTANCES
const api = new Api(apiConfig);
const initialCards = api.getAllCards();
initialCards.then((data) => {
  const initialCardsList = new Section(
    {
      items: data.map((item) => {
        return {
          likes: item.likes,
          _id: item._id,
          name: item.name,
          link: item.link,
          owner: item.owner._id,
          createdAt: item.createdAt,
        };
      }),
      renderer: (item) => {
        // Section => fn@125 => Card
        initialCardsList.createSectionItem(addCard(item).createCard());
      },
    },
    cardSelectors.cardsGridSelector,
  );
  initialCardsList.createInitialItems();
});

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

const addCard = (item) => {
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

enableValidation(formSelectors);
