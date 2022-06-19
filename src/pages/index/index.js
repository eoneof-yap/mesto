import './index.css';

import * as consts from '../../scripts/utils/constants.js';
import * as utils from '../../scripts/utils/utils';

import Card from '../../scripts/components/Card.js';
import Section from '../../scripts/components/Section.js';
import PopupConfirm from '../../scripts/components/PopupConfirm.js';
import PopupWithForm from '../../scripts/components/PopupWithForm.js';
import PopupWithImage from '../../scripts/components/PopupWithImage.js';
import UserInfo from '../../scripts/components/UserInfo.js';
import FormValidator from '../../scripts/components/FormValidator.js';
import Api from '../../scripts/components/Api';

/************************************************************
 * DOM nodes
 ************************************************************/
const documentForms = Array.from(document.forms);

const editUserButtonElement = document.querySelector(consts.buttonsSelectors.editButtonSelector);
const addCardButtonElement = document.querySelector(consts.buttonsSelectors.addButtonSelector);
const editPhotoButtonElement = document.querySelector(
  consts.buttonsSelectors.updatePhotoButtonSelector,
);
const cardsContainer = document.querySelector(consts.cardSelectors.cardsGridSelector);

const profileElements = {
  profileContainer: document.querySelector(consts.profileSelectors.profileSelector),
  nameElement: document.querySelector(consts.profileSelectors.nameSelector),
  aboutElement: document.querySelector(consts.profileSelectors.aboutSelector),
  photoElement: document.querySelector(consts.profileSelectors.profilePhotoSelector),
};

/************************************************************
 * Popups
 ************************************************************/
const popupPreview = new PopupWithImage(
  consts.popupSelectors.popupPreviewSelector,
  consts.popupSelectors,
);

export const popupConfirm = new PopupConfirm(
  consts.popupSelectors,
  consts.formSelectors,
  utils.handleCardDeleteConfirm,
);

export const popupUpdate = new PopupWithForm(
  consts.popupSelectors.popupUpdateSelector,
  consts.formSelectors,
  utils.handleUserPhotoSubmit,
);

export const popupEdit = new PopupWithForm(
  consts.popupSelectors.popupEditSelector,
  consts.formSelectors,
  utils.handleUserInfoSubmit,
);

export const popupAdd = new PopupWithForm(
  consts.popupSelectors.popupAddSelector,
  consts.formSelectors,
  utils.handleCardSubmit,
);

/************************************************************
 * Cards
 ************************************************************/
export const api = new Api(consts.apiConfig);
export const user = new UserInfo(profileElements);

const initialCards = (...args) => {
  return new Section(...args);
};

const newCard = (...args) => {
  return new Card(...args);
};

api
  .getUser()
  .then((res) => {
    user.setUserInfo(res);
  })
  .catch((err) => console.warn(`Пользователь не загрузился: ${err}`));

api
  .getAllCards()
  .then((res) => {
    const localCardsList = initialCards(
      {
        items: utils.mapCardsData(res),
        renderer: (item) => {
          localCardsList.createSectionItem(addCardItem(item).createCard());
        },
      },
      cardsContainer,
    );
    localCardsList.createInitialItems();
  })
  .catch((err) => console.warn(`Карточки не загрузились: ${err}`));

const addCardItem = (item) => {
  return newCard(
    {
      item,
      previewer: () => {
        popupPreview.open(item);
      },
    },
    consts.cardSelectors,
    utils.handleDeleteCardButton,
  );
};

/************************************************************
 * Listeners
 ************************************************************/
editPhotoButtonElement.addEventListener('click', utils.handleUpdatePhotoButton);
editUserButtonElement.addEventListener('click', utils.handleEditProfileButton);
addCardButtonElement.addEventListener('click', utils.handleAddCardButton);

popupConfirm.setEventListeners();
popupUpdate.setEventListeners();
popupPreview.setEventListeners();
popupEdit.setEventListeners();
popupAdd.setEventListeners();

/************************************************************
 * Validation
 ************************************************************/
function enableValidation(formSelectors) {
  documentForms.forEach((item) => {
    const validator = new FormValidator(item, formSelectors);
    const formID = item.getAttribute('id');
    consts.validators[formID] = validator;
    validator.enableValidation();
  });
}

enableValidation(consts.formSelectors);
