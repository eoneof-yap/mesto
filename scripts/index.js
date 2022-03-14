// DOC
const page = document.querySelector('.page');
const popup = page.querySelector('.popup');
const form = page.querySelector('.form');

// BUTTONS
const editButton = page.querySelector('.profile__edit-button');
const addButton = page.querySelector('.profile__add-button');
const closeButton = page.querySelector('.popup__close-button');

// INPUTS
let currentProfileName = page.querySelector('.profile__name');
let currentProfileInfo = page.querySelector('.profile__about');
let newProfileName = page.querySelector('input[name="profile-name"]');
let newProfileInfo = page.querySelector('input[name="profile-about"]');

function preventDefaultBehavior(evt) {
  evt.preventDefault();
}

// HANDLERS
function openPopupHandler(evt) {
  preventDefaultBehavior(evt);
  newProfileName.value = currentProfileName.textContent;
  newProfileInfo.value = currentProfileInfo.textContent;
  popup.classList.add('popup_opened');
  newProfileName.focus();
}

function closePopupHandler(evt) {
  preventDefaultBehavior(evt);
  if (evt.key === 'Escape') {
    popup.classList.remove('popup_opened');
  } else if (evt.type === 'click') {
    popup.classList.remove('popup_opened');
  }
}

function formSubmitHandler(evt) {
  preventDefaultBehavior(evt);
  currentProfileName.textContent = newProfileName.value;
  currentProfileInfo.textContent = newProfileInfo.value;
  popup.classList.remove('popup_opened');
}

// LISTENERS

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

page.addEventListener('click', function (evt) {
  let elem = evt.target;
  if (elem.classList.contains('card__image')) {
    previewImagePopup.classList.add('popup_opened');
  }
});

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
