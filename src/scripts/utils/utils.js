import * as constants from './constants.js';
import {
  api,
  localUserInfo,
  popupUpdate,
  popupEdit,
  popupAdd,
  popupConfirm,
} from '../../pages/index/index';

/************************************************************
 * Handlers
 ************************************************************/
export function handleUpdateButton() {
  constants.validators[constants.formSelectors.formUpdatePhotoID].resetValidation();
  // => PopupWithForm.js => UserInfo.js
  popupUpdate.open(); // => PopupWithForm.js
}

export function handleEditButton() {
  constants.validators[constants.formSelectors.formEditInfoID].resetValidation();
  // => PopupWithForm.js => UserInfo.js
  // popupEdit.setInputValues(localUserData.getUserInfo());
  popupEdit.open(); // => PopupWithForm.js
}

export function handleAddButton() {
  constants.validators[constants.formSelectors.formAddCardID].resetValidation();
  popupAdd.open();
}

// Card._handleDelete(){}
export function handleDeleteCardButton() {
  popupConfirm.open();
}

// // TODO delete
// const newAva = {
//   avatar:
//     'http://basementrejects.com/wp-content/uploads/2015/06/blue-velvet-david-lynch-candy-colored-clown-they-call-the-sandman-ben-singing-dean-stockwell-review.jpg',
//   // avatar: 'https://i.imgur.com/Tix9xxl.png',
// };
// // end of TODO
export function handleUpdateSubmit(inputValues) {
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
export function handleInfoSubmit(inputValues) {
  localUserInfo.setUserInfo(inputValues);
  popupEdit.close();
}
// prettier-ignore
// PopupWithForm.js => formSubmitHandler
export function handleAddSubmit(inputValues) {
  const data = {
    name: inputValues.name,
    link: inputValues.link,
  };
  initialCardsList.renderSectionItem(data);
  popupAdd.close();
}

// PopupConfirm._handleSubmit(){}
export function handleConfirmDeleteCard(target) {
  popupConfirm.close();
  api.deleteCard(carId).then();
}
