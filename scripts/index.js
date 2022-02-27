// DOC
const page = document.querySelector('.page');
const popup = page.querySelector('.popup');

// BUTTONS
const editButton = page.querySelector('.button_action_edit');
const addButton = page.querySelector('.button_action_add');
const submitButton = page.querySelector('.button_action_submit');
const closeButton = page.querySelector('.button_action_close');
const likeButton = page.querySelector('.button_action_like');

// INPUTS
let currentUserName = page.querySelector('.profile__name');
let currentUserInfo = page.querySelector('.profile__about');
let newUserName = page.querySelector('input[name="user-name"]');
let newUserInfo = page.querySelector('input[name="user-about"]');

// LOGIC
editButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  newUserName.value = currentUserName.textContent;
  newUserInfo.value = currentUserInfo.textContent;
  popup.classList.add('popup_opened');
  newUserName.focus();
});
closeButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  popup.classList.remove('popup_opened');
});
submitButton.addEventListener('click', formSubmitHandler);

// закрыть попап по по клавише Escape
document.addEventListener('keyup', function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    popup.classList.remove('popup_opened');
  }
});

// заготовка на будущее
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
