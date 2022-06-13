import './index.css';

import {
  profileSelectors,
  pageButtons,
  cardSelectors,
  popupSelectors,
  formSelectors,
  apiConfig,
  validators,
} from '../../scripts/utils/constants.js';

import Card from '../../scripts/components/Card.js';
import Section from '../../scripts/components/Section.js';
import PopupConfirm from '../../scripts/components/PopupConfirm.js';
import PopupWithForm from '../../scripts/components/PopupWithForm.js';
import PopupWithImage from '../../scripts/components/PopupWithImage.js';
import UserInfo from '../../scripts/components/UserInfo.js';
import FormValidator from '../../scripts/components/FormValidator.js';
import Api from '../../scripts/components/Api';

// FUNCTIONS

function enableValidation(formSelectors) {
  formSelectors.formsArray.forEach((item) => {
    const validator = new FormValidator(item, formSelectors);
    const formID = item.getAttribute('id');
    validators[formID] = validator;
    validator.enableValidation();
  });
}

function handleUpdateButton() {
  validators['form-update'].resetValidation();
  // => PopupWithForm.js => UserInfo.js
  popupUpdate.open(); // => PopupWithForm.js
}

function handleEditButton() {
  validators['form-edit'].resetValidation();
  // => PopupWithForm.js => UserInfo.js
  // popupEdit.setInputValues(localUserData.getUserInfo());
  popupEdit.open(); // => PopupWithForm.js
}

function handleAddButton() {
  validators['form-add'].resetValidation();
  popupAdd.open();
}

// Card._handleDelete(){}
function handleDeleteCardButton() {
  popupConfirm.open();
}

// PopupConfirm._handleSubmit(){}
function handleConfirmDeleteCard(target) {
  popupConfirm.close();
  api
    .deleteCard(carId)
    .then
    // target.remove();
    ();
}

// // TODO delete
// const newAva = {
//   avatar:
//     'http://basementrejects.com/wp-content/uploads/2015/06/blue-velvet-david-lynch-candy-colored-clown-they-call-the-sandman-ben-singing-dean-stockwell-review.jpg',
//   // avatar: 'https://i.imgur.com/Tix9xxl.png',
// };
// // end of TODO
function handleUpdateSubmit(inputValues) {
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
function handleInfoSubmit(inputValues) { // <= _getInputValues()
  console.log('d',inputValues)
  localUserInfo.setUserInfo(inputValues);
  popupEdit.close();
}

// prettier-ignore
// PopupWithForm.js => formSubmitHandler
function handleAddSubmit(inputValues) { // <= _getInputValues()
  const data = {
    name: inputValues.name,
    link: inputValues.link,
  };
  initialCardsList.renderSectionItem(data);
  popupAdd.close();
}

// INSTANCES OF CLASSES
const api = new Api(apiConfig);

const remoteUserData = api.getUser();
const localUserInfo = new UserInfo(profileSelectors);
localUserInfo.setUserInfo(remoteUserData);

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
      cardSelectors.cardsGridSelector,
    );
    initialCardsList.createInitialItems();
  })
  .catch((err) => console.warn(err));

const popupPreview = new PopupWithImage(
  popupSelectors.popupPreviewSelector,
  popupSelectors,
);

const popupConfirm = new PopupConfirm(
  popupSelectors,
  formSelectors,
  handleConfirmDeleteCard,
);

const popupUpdate = new PopupWithForm(
  popupSelectors.popupUpdateSelector,
  formSelectors,
  handleUpdateSubmit,
);

const popupEdit = new PopupWithForm(
  popupSelectors.popupEditSelector,
  formSelectors,
  handleInfoSubmit,
);

const popupAdd = new PopupWithForm(
  popupSelectors.popupAddSelector,
  formSelectors,
  handleAddSubmit,
);
const addCard = (item) => {
  const newItem = new Card(
    {
      item,
      previewer: () => {
        popupPreview.open(item);
      },
    },
    cardSelectors,
    handleDeleteCardButton,
  );
  return newItem;
};

// LISTENERS

pageButtons.updateButtonElement.addEventListener('click', handleUpdateButton);
pageButtons.editButtonElement.addEventListener('click', handleEditButton);
pageButtons.addButtonElement.addEventListener('click', handleAddButton);

popupConfirm.setEventListeners();
popupUpdate.setEventListeners();
popupPreview.setEventListeners();
popupEdit.setEventListeners();
popupAdd.setEventListeners();

enableValidation(formSelectors);
