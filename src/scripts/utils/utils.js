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
  index.popupUpdate.renderLoader(true);
  index.api
    .setAvatar(inputValue)
    .then((res) => {
      index.user.updateUserProfilePhoto(res.avatar);
      index.popupUpdate.close();
    })
    .catch((err) => {
      requestErrorHandler(err);
    })
    .finally((res) => {
      index.popupUpdate.renderLoader(false);
    });
}

export function submitUserInfoHandler(inputValues) {
  index.popupEdit.renderLoader(true);
  index.api
    .setUser(inputValues)
    .then((res) => {
      index.user.setUserInfo(res);
      index.popupEdit.close();
    })
    .catch((err) => {
      requestErrorHandler(err);
      index.popupEdit.showErrorMessage();
    })
    .finally(() => {
      setTimeout(() => {
        index.popupEdit.renderLoader(false);
      }, 1500);
    });
}

export function submitNewCardHandler(inputValues, mapData) {
  const userID = index.user.getUserInfo().id;
  index.popupAdd.renderLoader(true);
  index.api
    .addCard(inputValues)
    .then((res) => {
      index.createNewCard(res, mapData, res.owner).createSectionItem();
      index.popupAdd.close();
    })
    .catch((err) => {
      requestErrorHandler(err);
      index.popupAdd.showErrorMessage();
    })
    .finally(() => {
      setTimeout(() => {
        index.popupAdd.renderLoader(false);
      }, 1500);
    });
}

/************************************************************
 * Cards handlers
 ************************************************************/
export function deleteCardHandler(thisCard, cardID) {
  index.popupConfirm.setSubmitAction(() => {
    index.popupConfirm.renderLoader(true);
    index.api
      .deleteCard(cardID)
      .then((res) => {
        thisCard.deleteCard();
      })
      .then(() => {
        index.popupConfirm.renderLoader(false);
        index.popupConfirm.close();
      })
      .catch((err) => {
        index.popupConfirm.renderLoader(false);
        requestErrorHandler(err);
      });
  });
}

export function likeButtonHandler(thisCard) {
  // activate before API request makes it look more snappier
  // we udo it in case of error anyway
  thisCard.activateLike();
  index.api
    .likeCard(thisCard._cardData.id)
    .then((res) => {
      thisCard.toggleLikeState(res);
    })
    .catch((err) => {
      thisCard.deactivateLike();
      requestErrorHandler(err);
    });
}

export function unlikeButtonHandler(thisCard) {
  index.api
    .unlikeCard(thisCard._cardData.id)
    .then((res) => {
      thisCard.toggleLikeState(res);
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
