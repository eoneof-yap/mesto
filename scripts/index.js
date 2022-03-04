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

function changeClass(target, className, action) {
  if (action === 'add') {
    target.classList.add(className);
  } else if (action === 'remove') {
    target.classList.remove(className);
  }
}

// HANDLERS
function openPopupHandler(evt) {
  preventDefaultBehavior(evt);
  newProfileName.value = currentProfileName.textContent;
  newProfileInfo.value = currentProfileInfo.textContent;
  changeClass(popup, 'popup_opened', 'add');
  newProfileName.focus();
}

function closePopupHandler(evt) {
  preventDefaultBehavior(evt);
  if (evt.key === 'Escape') {
    changeClass(popup, 'popup_opened', 'remove');
  } else if (evt.type === 'click') {
    changeClass(popup, 'popup_opened', 'remove');
  }
}

function formSubmitHandler(evt) {
  preventDefaultBehavior(evt);
  currentProfileName.textContent = newProfileName.value;
  currentProfileInfo.textContent = newProfileInfo.value;
  changeClass(popup, 'popup_opened', 'remove');
}

// LISTENERS

editButton.addEventListener('click', openPopupHandler);

form.addEventListener('submit', formSubmitHandler);

closeButton.addEventListener('click', closePopupHandler);

popup.addEventListener('keyup', closePopupHandler);
