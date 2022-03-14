// DOC
const page = document.querySelector('.page');
let currentProfileName = page.querySelector('.profile__name');
let currentProfileInfo = page.querySelector('.profile__about');

// POPUPS
const editProfilePopup = page.querySelector('.popup_edit');
const addPhotoPopup = page.querySelector('.popup_add');
const previewImagePopup = page.querySelector('.popup_preview');

// FORMS
const formEdit = page.querySelector('.form_edit');
const formAdd = page.querySelector('.form_add');

// BUTTONS
const editProfileButton = page.querySelector('.profile__edit-button');
const addPhotoButton = page.querySelector('.profile__add-button');

// INPUTS
let newProfileName = page.querySelector('input[name="profile-name"]');
let newProfileInfo = page.querySelector('input[name="profile-about"]');
let newPhotoName = page.querySelector('input[name="place-name"]');
let newPhotoLink = page.querySelector('input[name="place-link"]');

function preventDefaultBehavior(evt) {
  evt.preventDefault();
}

// HANDLERS
function openEditProfilePopupHandler(evt) {
  preventDefaultBehavior(evt);
  newProfileName.value = currentProfileName.textContent;
  newProfileInfo.value = currentProfileInfo.textContent;
  editProfilePopup.classList.add('popup_opened');
  newProfileName.focus();
}

function closePopupHandler(evt) {
  // if (evt.key === 'Escape') {
  //   evt.target.closest('.popup').classList.remove('popup_opened');
  // } else if (evt.type === 'click') {
  evt.target.closest('.popup').classList.remove('popup_opened');
  // }
}

function formEditSubmitHandler(evt) {
  preventDefaultBehavior(evt);
  currentProfileName.textContent = newProfileName.value;
  currentProfileInfo.textContent = newProfileInfo.value;
  editProfilePopup.classList.remove('popup_opened');
}
function openPhotoPreview(evt) {
  let elem = evt.target;
  if (elem.classList.contains('card__image')) {
    // взять фотку
    previewImagePopup.querySelector('.preview__photo').src = elem.src;
    // взять описание
    previewImagePopup.querySelector('.preview__caption').textContent = elem
      .closest('.card')
      .querySelector('.card__title').textContent;
    // приклеить альт
    previewImagePopup.querySelector('.preview__photo').alt = elem.alt;
    previewImagePopup.classList.add('popup_opened');
  }
}

// LISTENERS

editProfileButton.addEventListener('click', openEditProfilePopupHandler);

formEdit.addEventListener('submit', formEditSubmitHandler);
document.addEventListener('keyup', function (evt) {
  let elem = evt.target;
  if (elem.classList.contains('popup__close-button')) {
    closePopupHandler(evt);
  }
});

page.addEventListener('click', function (evt) {
  let elem = evt.target;
  if (elem.classList.contains('popup__close-button')) {
    closePopupHandler(evt);
  }
});

page.addEventListener('click', openPhotoPreview);

page.addEventListener('click', function (evt) {
  let elem = evt.target;
  if (elem.classList.contains('card__like-button')) {
    elem.classList.toggle('card__like-button_active');
  }
});

page.addEventListener('click', function (evt) {
  let elem = evt.target;
  if (elem.classList.contains('card__delete-button')) {
    elem.closest('.card').remove();
  }
});
