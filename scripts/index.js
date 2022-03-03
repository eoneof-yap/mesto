// DOC
const page = document.querySelector('.page');
const popup = page.querySelector('.popup');

// BUTTONS
const editButton = page.querySelector('.profile__edit-button');
const addButton = page.querySelector('.profile__add-button');
const submitButton = page.querySelector('.popup__submit-button');
const closeButton = page.querySelector('.popup__close-button');

// INPUTS
let currentUserName = page.querySelector('.profile__name');
let currentUserInfo = page.querySelector('.profile__about');
let newUserName = page.querySelector('input[name="user-name"]');
let newUserInfo = page.querySelector('input[name="user-about"]');

// Редактировать профиль
editButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  newUserName.value = currentUserName.textContent;
  newUserInfo.value = currentUserInfo.textContent;
  popup.classList.add('popup_opened');
  newUserName.focus();
});

// Сохранить изменения
submitButton.addEventListener('click', formSubmitHandler);

// Закрыть попап
closeButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  popup.classList.remove('popup_opened');
});

// закрыть попап по по клавише Escape
document.addEventListener('keyup', function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    popup.classList.remove('popup_opened');
  }
});

// Добавить фотографии (заготовка)
addButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  console.log(`Клик по ${addButton.classList}`);
});

function formSubmitHandler(evt) {
  evt.preventDefault();
  if (newUserName.value | (newUserInfo.value === '')) {
    popup.classList.remove('popup_opened');
  } else {
    currentUserName.textContent = newUserName.value;
    currentUserInfo.textContent = newUserInfo.value;
    newUserName.value = '';
    newUserInfo.value = '';
    popup.classList.remove('popup_opened');
  }
}
