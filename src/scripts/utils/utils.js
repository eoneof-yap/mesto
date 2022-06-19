import * as consts from './constants.js';
import { api, popupUpdate, popupEdit, popupAdd, popupConfirm, user } from '../../pages/index/index';

// // TODO delete
// const newAva = {
//   avatar:
//     'http://basementrejects.com/wp-content/uploads/2015/06/blue-velvet-david-lynch-candy-colored-clown-they-call-the-sandman-ben-singing-dean-stockwell-review.jpg',
//   // avatar: 'https://i.imgur.com/Tix9xxl.png',
// };
// // end of TODO

/************************************************************
 * Handlers
 ************************************************************/
export function handleUpdatePhotoButton() {
  consts.validators[consts.formSelectors.formUpdatePhotoID].resetValidation();
  // => PopupWithForm.js => UserInfo.js
  popupUpdate.open(); // => PopupWithForm.js
}

export function handleEditProfileButton() {
  consts.validators[consts.formSelectors.formEditInfoID].resetValidation();
  // => PopupWithForm.js => UserInfo.js
  popupEdit.setInputValues(user.pickUserInfo());
  popupEdit.open(); // => PopupWithForm.js
}

export function handleAddCardButton() {
  consts.validators[consts.formSelectors.formAddCardID].resetValidation();
  popupAdd.open();
}

// Card._handleDelete(){}
export function handleDeleteCardButton() {
  popupConfirm.open();
}

export function handleUserPhotoSubmit(inputValues) {
  // Update Profile Photo
  api
    .setAvatar(inputValues)
    .then((res) => {
      localUserInfo.setUserProfilePhoto(res.avatar);
    })
    .catch((err) => console.warn(`Произошла непоправимая ошибка: ${err}`));
  popupUpdate.close();
}
// prettier-ignore
// PopupWithForm.js => formSubmitHandler
export function handleUserInfoSubmit(inputValues) {
  localUserInfo.setUserInfo(inputValues);
  popupEdit.close();
}
// prettier-ignore
// PopupWithForm.js => formSubmitHandler
export function handleCardSubmit(inputValues) {
  const data = {
    name: inputValues.name,
    link: inputValues.link,
  };
  initialCardsList.renderSectionItem(data);
  popupAdd.close();
}

// PopupConfirm._handleSubmit(){}
export function handleCardDeleteConfirm(target) {
  popupConfirm.close();
  api.deleteCard(carId).then();
}

export const mapCardsData = (arr) => {
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
};

// export const mapUserData = (data) => {
//   return {
//     id: data._id,
//     photo: data.avatar,
//     name: data.name,
//     about: data.about,
//     cohort: data.cohort,
//   };
// };
