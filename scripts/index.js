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
let currentUserName = page.querySelector('.profile__name').textContent;
let currentUserInfo = page.querySelector('.profile__about').textContent;
// let newUserName = page.querySelector(/*  забрать из инпута */)
// let newUserInfo = page.querySelector(/*  забрать из инпута */)
editButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  popup.classList.remove('popup_closed');
});
closeButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  popup.classList.add('popup_closed');
});
submitButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  popup.classList.add('popup_closed');
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
