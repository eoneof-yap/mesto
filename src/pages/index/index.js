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

export const pagePreloaderElement = document.querySelector(
  consts.preloaderSelectors.pagePreloaderSelector,
);
export const pageSpinnerElement = pagePreloaderElement.querySelector(
  consts.preloaderSelectors.spinnerSelector,
);

const editUserButtonElement = document.querySelector(
  consts.buttonsSelectors.editButtonSelector,
);
const addCardButtonElement = document.querySelector(
  consts.buttonsSelectors.addButtonSelector,
);
const editPhotoButtonElement = document.querySelector(
  consts.buttonsSelectors.updatePhotoButtonSelector,
);
export const cardsContainer = document.querySelector(
  consts.cardSelectors.cardsGridSelector,
);

export const profileElements = {
  profileElement: document.querySelector(consts.profileSelectors.profileSelector),
  nameElement: document.querySelector(consts.profileSelectors.nameSelector),
  aboutElement: document.querySelector(consts.profileSelectors.aboutSelector),
  photoElement: document.querySelector(consts.profileSelectors.profilePhotoSelector),
};

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

/************************************************************
 * Popups
 ************************************************************/
export const popupConfirm = new PopupConfirm(
  consts.popupSelectors.popupConfirmSelector,
  consts.popupSelectors,
  consts.formSelectors,
);

export const popupPreview = new PopupWithImage(
  consts.popupSelectors.popupPreviewSelector,
  consts.popupSelectors,
);

export const popupUpdate = new PopupWithForm(
  consts.popupSelectors.popupUpdateSelector,
  consts.popupSelectors,
  consts.formSelectors,
  utils.submitNewUserPhotoHandler,
);

export const popupEdit = new PopupWithForm(
  consts.popupSelectors.popupEditSelector,
  consts.popupSelectors,
  consts.formSelectors,
  utils.submitUserInfoHandler,
);

export const popupAdd = new PopupWithForm(
  consts.popupSelectors.popupAddSelector,
  consts.popupSelectors,
  consts.formSelectors,
  utils.submitNewCardHandler,
  utils.mapNewCardData,
);

/************************************************************
 * Classes
 ************************************************************/
export const api = new Api(consts.apiConfig);
export const user = new UserInfo(profileElements);

const section = (...args) => {
  return new Section(...args);
};

export const cardClass = (...args) => {
  return new Card(...args);
};

/************************************************************
 * Cards
 ************************************************************/
export function initializeNewCard(thisCardData, remoteUserData) {
  const thisCard = cardClass(
    {
      thisCardData,
      handlers: {
        deleteHandler: (cardID) => {
          utils.deleteCardHandler(thisCard, cardID);
          popupConfirm.open();
        },

        previewHandler: (previewData) => {
          popupPreview.open(previewData);
        },

        likeHandler: (thisCard) => {
          utils.likeButtonHandler(thisCard);
        },

        unLikeHandler: (thisCard) => {
          utils.unlikeButtonHandler(thisCard);
        },
      },
    },
    consts.cardSelectors,
    remoteUserData,
  );
  return thisCard;
}

export function createNewCard(remoteCardsData, mapData, remoteUserData) {
  const newSectionItem = section(
    {
      data: mapData(remoteCardsData),
      renderCardHandler: (thisCardData) => {
        return newSectionItem.renderSectionItem(
          initializeNewCard(thisCardData, remoteUserData).createCard(),
        );
      },
    },
    cardsContainer,
  );
  return newSectionItem;
}

function getAllData(mapData) {
  Promise.all([api.getUser(), api.getAllCards()])
    .then(([remoteUserData, remoteCardsData]) => {
      user.setUserInfo(remoteUserData);
      createNewCard(remoteCardsData, mapData, remoteUserData).createSectionItem();

      utils.hidePagePreloader();
      enableValidation(consts.formSelectors);
    })
    .catch((err) => {
      utils.requestErrorHandler(err);
    });
}

/************************************************************
 * Listeners
 ************************************************************/
editPhotoButtonElement.addEventListener('click', utils.updateUserPhotoButtonHandler);
editUserButtonElement.addEventListener('click', utils.editUserInfoButtonHandler);
addCardButtonElement.addEventListener('click', utils.addNewCardButtonHandler);

popupConfirm.setEventListeners();
popupUpdate.setEventListeners();
popupPreview.setEventListeners();
popupEdit.setEventListeners();
popupAdd.setEventListeners();

getAllData(utils.mapInItialCardsData);
