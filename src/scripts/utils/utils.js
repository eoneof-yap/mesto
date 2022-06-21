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
  section,
  pagePreloader,
  cardsContainer,
  profileElements,
  createNewCard,
} from '../../pages/index/index';

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

export function hidePagePreloader() {
  pagePreloader.classList.add('hidden');
  cardsContainer.classList.remove(consts.hiddenClass);
  profileElements.profileContainer.classList.remove(consts.hiddenClass);
}

export function requestErrorHandler(err) {
  console.warn(`Произошла трагическая ошибка: ${err}`);
}

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
export function deleteButtonClickHandler() {
  popupConfirm.open();
}

export function cardImagePreviewHandler(item) {
  popupPreview.open(item);
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
  popupUpdate.showLoader();
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
  popupEdit.showLoader();
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

export function submitNewCardHandler(inputValues, callback) {
  popupAdd.showLoader();
  api
    .addCard(inputValues)
    .then((res) => {
      const localCard = section(
        {
          data: callback(res), //  массив нужен, чтобы и начальные и новые карточки обрабатывать одним методом
          renderCardHandler: (data) => {
            return localCard.renderSectionItem(createNewCard(data).createCard());
          },
        },
        cardsContainer,
      );
      localCard.createSectionItem();
    })
    .then((res) => {
      popupAdd.hideLoader();
      popupAdd.close();
    })
    .catch((err) => {
      requestErrorHandler(err);
    });
  // const data = {
  //   name: inputValues.name,
  //   link: inputValues.link,
  // };
  // initialCardsList.renderSectionItem(data);
  popupAdd.close();
}

// FIXME !!!
export function submitConfirmButtonClickHandler() {
  // api.deleteCard(carId).then();
  popupConfirm.showLoader();
  card.deleteCard();
  popupConfirm.close();
  popupConfirm.hideLoader();
}
