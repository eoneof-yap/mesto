import { initialCards } from './cards.js';
import { Card } from './Card.js';
export { createPreview, cardSelectors };

const cardSelectors = {
  templateID: '#card-template',
  card: '.card',
  image: '.card__image',
  title: '.card__title',
  deleteButton: '.card__delete-button',
  likeButton: '.card__like-button',
  cardsGrid: '.cards-grid',
  activeLike: 'card__like-button_active',
};

// DOC
const page = document.querySelector('.page');

// EDITABLES
const currentProfileName = page.querySelector('.profile__name');
const currentProfileInfo = page.querySelector('.profile__about');

// PAGE BUTTONS
const editProfileButton = page.querySelector('.profile__edit-button');
const addPhotoButton = page.querySelector('.profile__add-button');
const popupCloseButton = page.querySelectorAll('.popup__close-button');
const popupBackdrop = page.querySelectorAll('.popup__backdrop');

// POPUPS
const editProfilePopup = page.querySelector('.popup_type_edit');
const addPhotoPopup = page.querySelector('.popup_type_add');
const previewImagePopup = page.querySelector('.popup_type_preview');

// POPUPS BUTTONS
const editProfileSubmitButton = editProfilePopup.querySelector('.form__submit-button');
const addPhotoSubmintButton = addPhotoPopup.querySelector('.form__submit-button');

// FORMS
const editingForm = document.forms['form-edit'];
const addingForm = document.forms['form-add'];

// INPUTS
const newProfileNameInput = editingForm.elements['name-input'];
const newProfileInfoInput = editingForm.elements['about-input'];
const newPhotoNameInput = addingForm.elements['photo-name-input'];
const newPhotoLinkInput = addingForm.elements['photo-link-input'];

// FUNCTIONS
function preventDefaultBehavior(evt) {
  evt.preventDefault();
}

function disableButton(button) {
  button.classList.add('button_disabled');
  button.setAttribute('disabled', 'disabled');
}

function enableButton(button) {
  button.classList.remove('button_disabled');
  button.removeAttribute('disabled');
}

// popups
function createPreview(evt) {
  previewImagePopup.querySelector('.preview__image').setAttribute('src', evt.target.src);
  previewImagePopup.querySelector('.preview__image').setAttribute('alt', evt.target.alt);
  previewImagePopup.querySelector('.preview__caption').textContent = evt.target.closest('.card').querySelector('.card__title').textContent;
  openPopup(previewImagePopup);
}

function openPopup(popup) {
  document.addEventListener('keydown', closePopupViaEscHandler);
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  document.removeEventListener('keydown', closePopupViaEscHandler);
  popup.classList.remove('popup_opened');
}

// HANDLERS
function closePopupHandler(evt) {
  closePopup(evt.target.closest('.popup_opened'));
}

function closePopupViaEscHandler(evt) {
  if (evt.key === 'Escape') {
    closePopup(page.querySelector('.popup_opened'));
  }
}

function editProfilePopupHandler() {
  newProfileNameInput.value = currentProfileName.textContent;
  newProfileInfoInput.value = currentProfileInfo.textContent;
  openPopup(editProfilePopup);
  enableButton(editProfileSubmitButton);
}

function editingFormSubmitHandler(evt) {
  preventDefaultBehavior(evt);
  currentProfileName.textContent = newProfileNameInput.value;
  currentProfileInfo.textContent = newProfileInfoInput.value;
  closePopup(editProfilePopup);
  disableButton(editProfileSubmitButton);
}

function addPhotoPopupHandler() {
  // форма изначально пуста
  openPopup(addPhotoPopup);
}

function addingFormSubmitHandler(evt) {
  preventDefaultBehavior(evt);
  renderElements(
    [
      {
        name: newPhotoNameInput.value,
        link: newPhotoLinkInput.value,
        alt: newPhotoNameInput.value,
      },
    ],
    cardSelectors,
  );
  closePopup(addPhotoPopup);
  evt.currentTarget.reset();
  disableButton(addPhotoSubmintButton);
}

// ENTRY POINT

// listeners
editProfileButton.addEventListener('click', editProfilePopupHandler);
addPhotoButton.addEventListener('click', addPhotoPopupHandler);

editingForm.addEventListener('submit', editingFormSubmitHandler);
addingForm.addEventListener('submit', addingFormSubmitHandler);

popupCloseButton.forEach(function (item) {
  item.addEventListener('click', closePopupHandler);
});

popupBackdrop.forEach(function (item) {
  item.addEventListener('click', closePopupHandler);
});

// показываем карточки по умолчанию
function renderElements(data, selectors) {
  data.forEach((element) => {
    const card = new Card(element, selectors);
    card.renderCard();
  });
}

renderElements(initialCards, cardSelectors);
