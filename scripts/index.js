// DOC
let page = document.querySelector('.page');
let popup = page.querySelector('.popup');

// BUTTONS
let editButton = page.querySelector('.button_action_edit');
let addButton = page.querySelector('.button_action_add');
let submitButton = page.querySelector('.button_action_submit');
let closeButton = page.querySelector('.button_action_close');
let likeButton = page.querySelector('.button_action_like');

// INPUTS
let currentUserName = page.querySelector('.profile__name');
let currentUserInfo = page.querySelector('.profile__about');
let newUserName = page.querySelector('input[name="user-name"]');
let newUserInfo = page.querySelector('input[name="user-about"]');
editButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  newUserName.value = currentUserName.textContent;
  newUserInfo.value = currentUserInfo.textContent;
  popup.classList.remove('popup_closed');
  newUserName.focus();
});
closeButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  popup.classList.add('popup_closed');
});
submitButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  if (newUserName.value | newUserInfo.value === '') {
    popup.classList.add('popup_closed');
  } else {
    currentUserName.textContent = newUserName.value;
    currentUserInfo.textContent = newUserInfo.value;
    newUserName.value = '';
    newUserInfo.value = '';
    popup.classList.add('popup_closed');
  }
});

// закрыть попап по по клавише Escape
document.addEventListener('keyup', function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    popup.classList.add('popup_closed');
  }
});

// заготовка на будущее
addButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  console.log(`Клик по ${addButton.classList}`);
});
