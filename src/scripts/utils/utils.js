import * as consts from './constants.js';
import * as index from '../../pages/index/index';

/************************************************************
 * Page buttons handlers
 ************************************************************/
export function updateUserPhotoButtonHandler() {
  consts.validators[consts.formSelectors.formUpdatePhotoID].resetValidation();
  index.popupUpdate.open();
}

export function editUserInfoButtonHandler() {
  consts.validators[consts.formSelectors.formEditInfoID].resetValidation();
  index.popupEdit.setInputValues(index.user.getUserInfo());
  index.popupEdit.open();
}

export function addNewCardButtonHandler() {
  consts.validators[consts.formSelectors.formAddCardID].resetValidation();
  index.popupAdd.open();
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
      index.popupUpdate.hideLoader();
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
    .then(() => {
      index.popupEdit.hideLoader();
      index.popupEdit.close();
    })
    .catch((err) => {
      index.popupEdit.hideLoader();
      requestErrorHandler(err);
    });
}

export function submitNewCardHandler(inputValues, mapData) {
  const userID = index.user.getUserInfo().id;
  index.popupAdd.showLoader();
  index.api
    .addCard(inputValues)
    .then((res) => {
      index.createNewCard(res, mapData, res.owner).createSectionItem();
    })
    .then(() => {
      index.popupAdd.hideLoader();
      index.popupAdd.close();
    })
    .catch((err) => {
      index.popupAdd.hideLoader();
      requestErrorHandler(err);
    });
}

/************************************************************
 * Cards handlers
 ************************************************************/
export function deleteCardHandler(thisCard, cardID) {
  index.popupConfirm.setSubmitAction(() => {
    index.popupConfirm.showLoader();
    index.api
      .deleteCard(cardID)
      .then((res) => {
        thisCard.deleteCard();
      })
      .then(() => {
        index.popupConfirm.hideLoader();
        index.popupConfirm.close();
      })
      .catch((err) => {
        index.popupConfirm.hideLoader();
        requestErrorHandler(err);
      });
  });
}

export function likeButtonHandler(thisCard) {
  index.api
    .likeCard(thisCard._cardData.id)
    .then((res) => {
      thisCard.toggleLike(res);
    })
    .catch((err) => {
      requestErrorHandler(err);
    });
}

export function unlikeButtonHandler(thisCard) {
  index.api
    .unlikeCard(thisCard._cardData.id)
    .then((res) => {
      thisCard.toggleLike(res);
    })
    .catch((err) => {
      requestErrorHandler(err);
    });
}

/************************************************************
 * Misc handlers
 ************************************************************/

/**
 * Map incoming data to maintain compatibility with the legacy naming
 */
export function mapInItialCardsData(res) {
  const items = res.map((item) => {
    return {
      likes: item.likes,
      id: item._id,
      name: item.name,
      link: item.link,
      owner: item.owner._id,
      createdAt: item.createdAt,
    };
  });
  return items.reverse();
}

/**
 * Map and return as an array to handle it with the same method
 * as the initial cards
 */
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

/**
 * Preloader is active by default
 */
export function hidePagePreloader() {
  index.pagePreloaderElement.classList.add('hidden');
  index.cardsContainer.classList.remove(consts.hiddenClass);
  index.profileElements.profileElement.classList.remove(consts.hiddenClass);
}

export function requestErrorHandler(err) {
  console.warn(`Произошла трагическая, непоправимая ошибка: ${err.stack}`);
}
