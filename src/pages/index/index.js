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

export const pagePreloader = document.querySelector(
  consts.preloaderSelectors.pagePreloaderSelector,
);
export const pageSpinner = pagePreloader.querySelector(
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
  profileContainer: document.querySelector(consts.profileSelectors.profileSelector),
  nameElement: document.querySelector(consts.profileSelectors.nameSelector),
  aboutElement: document.querySelector(consts.profileSelectors.aboutSelector),
  photoElement: document.querySelector(consts.profileSelectors.profilePhotoSelector),
};

/************************************************************
 * Popups
 ************************************************************/

export const popupConfirm = new PopupConfirm(
  consts.popupSelectors.popupConfirmSelector,
  consts.popupSelectors,
  consts.formSelectors,
  utils.submitConfirmButtonClickHandler,
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
);

/************************************************************
 * Cards
 ************************************************************/
export const api = new Api(consts.apiConfig);
export const user = new UserInfo(profileElements, getUserInfoHandler);

function getUserInfoHandler() {
  return api.getUser();
}

function setUserInfo(remoteUserData) {
  user.setUserInfo(remoteUserData);
}

const initialCards = (...args) => {
  return new Section(...args);
};

export const card = (...args) => {
  return new Card(...args, utils.trashButtonClickHandler);
};

function loadData() {
  Promise.all([user.getUserInfo(), api.getAllCards()])
    .then(([remoteUserData, remoteCardsData]) => {
      setUserInfo(remoteUserData);

      const localCardsList = initialCards(
        {
          items: utils.mapCardsData(remoteCardsData),
          renderer: (card) => {
            localCardsList.createSectionItem(addCardItem(card).createCard());
          },
        },
        cardsContainer,
      );
      localCardsList.createInitialItems();
      utils.hidePagePreloader();
    })
    .catch((err) => console.warn(`Промис Олл: ${err}`));
}

function setLikeHandler() {
  api.likeCard().then((res) => {});
}

// api
//   .getUser()
//   .then((res) => {
//     user.setUserInfo(res);
//   })
//   .catch((err) => console.warn(`Пользователь не загрузился: ${err}`));

// api
//   .getAllCards()
//   .then((res) => {
//     const localCardsList = initialCards(
//       {
//         items: utils.mapCardsData(res),
//         renderer: (item) => {
//           localCardsList.createSectionItem(addCardItem(item).createCard());
//         },
//       },
//       cardsContainer,
//     );
//     localCardsList.createInitialItems();
//   })
//   .catch((err) => console.warn(`Карточки не загрузились: ${err}`));

const addCardItem = (item) => {
  return card(
    {
      item,
      trashButtonHandler: () => {
        utils.trashButtonClickHandler(target);
      },
      previewHandler: () => {
        utils.cardImagePreviewHandler(target);
      },
      likeButtonHandler: () => {
        utils.likeButtonClickHandler(target);
      },
    },
    consts.cardSelectors,
  );
};

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
loadData();
