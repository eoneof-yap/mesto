import * as consts from './constants.js';
import {
  api,
  popupUpdate,
  popupEdit,
  popupAdd,
  popupConfirm,
  popupPreview,
  user,
  card,
  pagePreloader,
  cardsContainer,
  profileElements,
} from '../../pages/index/index';

/************************************************************
 * Page buttons handlers
 ************************************************************/
export function updateUserPhotoButtonHandler() {
  consts.validators[consts.formSelectors.formUpdatePhotoID].resetValidation();
  popupUpdate.open(); // => PopupWithForm.js
}

export function editUserInfoButtonHandler() {
  consts.validators[consts.formSelectors.formEditInfoID].resetValidation();
  popupEdit.setInputValues(user.pickUserInfo());
  popupEdit.open(); // => PopupWithForm.js
}

export function addNewCardButtonHandler() {
  consts.validators[consts.formSelectors.formAddCardID].resetValidation();
  popupAdd.open();
}

/************************************************************
 * Card buttons handlers
 ************************************************************/
export function trashButtonClickHandler(target) {
  popupConfirm.open();
}

export function cardImagePreviewHandler(item) {
  popupPreview.open(item);
}

export function likeButtonClickHandler(target) {
  console.log(target);
}

/************************************************************
 * Popups buttons handlers
 ************************************************************/
export function submitNewUserPhotoHandler(inputValue) {
  popupUpdate.displayLoader();
  api
    .setAvatar(inputValue)
    .then((res) => {
      user.updateUserProfilePhoto(res.avatar);
    })
    .then((res) => {
      popupUpdate.hideLoader();
      popupUpdate.close();
    })
    .catch((err) => {
      requestErrorHandler(err);
    });
}

export function submitUserInfoHandler(inputValues) {
  popupEdit.displayLoader();
  api
    .setUser(inputValues)
    .then((res) => {
      user.setUserInfo(res);
    })
    .then((res) => {
      popupEdit.hideLoader();
      popupEdit.close();
    })
    .catch((err) => {
      requestErrorHandler(err);
    });
}

export function submitNewCardHandler(inputValues) {
  const data = {
    name: inputValues.name,
    link: inputValues.link,
  };
  initialCardsList.renderSectionItem(data);
  popupAdd.close();
}

export function submitConfirmButtonClickHandler() {
  // api.deleteCard(carId).then();
  popupConfirm.displayLoader();
  card.deleteCard();
  popupConfirm.close();
  popupConfirm.hideLoader();
}

/************************************************************
 * Misc handlers
 ************************************************************/
export function mapCardsData(arr) {
  return arr.map((item) => {
    return {
      likes: item.likes,
      id: item._id,
      name: item.name,
      link: item.link,
      owner: item.owner._id,
      createdAt: item.createdAt,
    };
  });
}

export function hidePagePreloader() {
  pagePreloader.classList.add('hidden');
  cardsContainer.classList.remove(consts.hiddenClass);
  profileElements.profileContainer.classList.remove(consts.hiddenClass);
}

function requestErrorHandler(err) {
  console.warn(`Произошла непоправимая ошибка: ${err}`);
}
