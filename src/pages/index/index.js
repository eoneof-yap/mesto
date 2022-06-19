import './index.css';

import * as constants from '../../scripts/utils/constants.js';
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

const editUserButtonElement = document.querySelector(constants.buttonsSelectors.editButtonSelector);
const addCardButtonElement = document.querySelector(constants.buttonsSelectors.addButtonSelector);
const editPhotoButtonElement = document.querySelector(
  constants.buttonsSelectors.updatePhotoButtonSelector,
);
const sectionElement = document.querySelector(constants.cardSelectors.cardsGridSelector);

const profileItems = {
  profileElement: document.querySelector(constants.profileSelectors.profileSelector),
  nameElement: document.querySelector(constants.profileSelectors.nameSelector),
  aboutElement: document.querySelector(constants.profileSelectors.aboutSelector),
  photoElement: document.querySelector(constants.profileSelectors.profilePhotoSelector),
};

/************************************************************
 * Popups
 ************************************************************/
const popupPreview = new PopupWithImage(
  constants.popupSelectors.popupPreviewSelector,
  constants.popupSelectors,
);

export const popupConfirm = new PopupConfirm(
  constants.popupSelectors,
  constants.formSelectors,
  utils.handleConfirmDeleteCard,
);

export const popupUpdate = new PopupWithForm(
  constants.popupSelectors.popupUpdateSelector,
  constants.formSelectors,
  utils.handleUpdateSubmit,
);

export const popupEdit = new PopupWithForm(
  constants.popupSelectors.popupEditSelector,
  constants.formSelectors,
  utils.handleInfoSubmit,
);

export const popupAdd = new PopupWithForm(
  constants.popupSelectors.popupAddSelector,
  constants.formSelectors,
  utils.handleAddSubmit,
);

/************************************************************
 * Cards
 ************************************************************/
export const api = new Api(constants.apiConfig);
export const localUserInfo = new UserInfo(profileItems);

const initialCards = api.getAllCards();
initialCards
  .then((data) => {
    const initialCardsList = new Section(
      {
        items: data.map((item) => {
          // extract keys and return the new object
          return {
            likes: item.likes,
            _id: item._id,
            name: item.name,
            link: item.link,
            owner: item.owner._id,
            createdAt: item.createdAt,
          };
        }),
        // pass the object to renderer
        renderer: (item) => {
          // Section => fn@125 => Card
          initialCardsList.createSectionItem(addCard(item).createCard());
        },
      },
      sectionElement,
    );
    initialCardsList.createInitialItems();
  })
  .catch((err) => console.warn(err));

const addCard = (item) => {
  const newItem = new Card(
    {
      item,
      previewer: () => {
        popupPreview.open(item);
      },
    },
    constants.cardSelectors,
    utils.handleDeleteCardButton,
  );
  return newItem;
};

const remoteUserData = api.getUser();
localUserInfo.setUserInfo(remoteUserData);

/************************************************************
 * Listeners
 ************************************************************/
editPhotoButtonElement.addEventListener('click', utils.handleUpdateButton);
editUserButtonElement.addEventListener('click', utils.handleEditButton);
addCardButtonElement.addEventListener('click', utils.handleAddButton);

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
    constants.validators[formID] = validator;
    validator.enableValidation();
  });
}

enableValidation(constants.formSelectors);
