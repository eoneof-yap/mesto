import * as consts from './constants.js';
import * as index from '../../pages/index/index';

export function hidePagePreloader() {
  index.pagePreloaderElement.classList.add('hidden');
  index.cardsContainer.classList.remove(consts.hiddenClass);
  index.profileElements.profileElement.classList.remove(consts.hiddenClass);
}

export function requestErrorHandler(err) {
  console.warn(`Произошла трагическая ошибка: ${err}`);
}

/************************************************************
 * Page buttons handlers
 ************************************************************/
export function updateUserPhotoButtonHandler() {
  consts.validators[consts.formSelectors.formUpdatePhotoID].resetValidation();
  index.popupUpdate.open();
}

export function editUserInfoButtonHandler() {
  consts.validators[consts.formSelectors.formEditInfoID].resetValidation();
  index.popupEdit.setInputValues(index.user.pickUserInfo());
  index.popupEdit.open();
}

export function addNewCardButtonHandler() {
  consts.validators[consts.formSelectors.formAddCardID].resetValidation();
  index.popupAdd.open();
}

/************************************************************
 * Card buttons handlers
 ************************************************************/
export function deleteButtonClickHandler() {
  index.popupConfirm.open();
}

export function cardImagePreviewHandler(item) {
  index.popupPreview.open(item);
}

export function likeButtonClickHandler() {
  console.log('target');
  // if (
  //   // TODO базовая логика на моковых данных -- все перевести на API
  //   evt.target.classList.contains(this._likeButtonIsActive) &&
  //   evt.target.parentElement.classList.contains(this._likeContainerIsLiked) &&
  //   evt.target.nextElementSibling.classList.contains(this._counterVisible)
  // ) {
  //   evt.target.classList.remove(this._likeButtonIsActive);
  //   evt.target.nextElementSibling.textContent =
  //     parseInt(evt.target.nextElementSibling.textContent) - 1;
  //   if (parseInt(evt.target.nextElementSibling.textContent) < 1) {
  //     evt.target.parentElement.classList.remove(this._likeContainerIsLiked);
  //     evt.target.nextElementSibling.classList.remove(this._counterVisible);
  //   }
  // } else {
  //   evt.target.classList.add(this._likeButtonIsActive);
  //   evt.target.parentElement.classList.add(this._likeContainerIsLiked);
  //   evt.target.nextElementSibling.classList.add(this._counterVisible);
  //   evt.target.nextElementSibling.textContent =
  //     parseInt(evt.target.nextElementSibling.textContent) + 1;
  // }
}

/************************************************************
 * Popups buttons handlers
 ************************************************************/
export function submitNewUserPhotoHandler(inputValue) {
  index.popupUpdate.showLoader();
  index.api
    .setAvatar(inputValue)
    .then((res) => {
      index.user.updateUserProfilePhoto(res.avatar);
    })
    .then((res) => {
      index.popupUpdate.hideLoader();
      index.popupUpdate.close();
    })
    .catch((err) => {
      requestErrorHandler(err);
    });
}

export function submitUserInfoHandler(inputValues) {
  index.popupEdit.showLoader();
  index.api
    .setUser(inputValues)
    .then((res) => {
      index.user.setUserInfo(res);
    })
    .then((res) => {
      index.popupEdit.hideLoader();
      index.popupEdit.close();
    })
    .catch((err) => {
      requestErrorHandler(err);
    });
}

export function submitNewCardHandler(inputValues, mapData) {
  index.popupAdd.showLoader();
  index.api
    .addCard(inputValues)
    .then((res) => {
      const localCard = index.renderNewCard(res, mapData);
      localCard.createSectionItem();
    })
    .then((res) => {
      index.popupAdd.hideLoader();
      index.popupAdd.close();
    })
    .catch((err) => {
      requestErrorHandler(err);
    });

  index.popupAdd.close();
}

// FIXME !!!
export function submitConfirmButtonClickHandler() {
  // api.deleteCard(carId).then();
  index.popupConfirm.showLoader();
  index.card.deleteCard();
  index.popupConfirm.close();
  index.popupConfirm.hideLoader();
}

/************************************************************
 * Misc handlers
 ************************************************************/
export function mapInItialCardsData(res) {
  const reversedCardList = res.map((item) => {
    return {
      likes: item.likes,
      id: item._id,
      name: item.name,
      link: item.link,
      owner: item.owner._id,
      createdAt: item.createdAt,
    };
  });
  return reversedCardList.reverse();
}

export function mapNewCardData(data) {
  return [
    {
      likes: data.likes,
      id: data._id,
      name: data.name,
      link: data.link,
      owner: data.owner._id,
      createdAt: data.createdAt,
    },
  ];
}
