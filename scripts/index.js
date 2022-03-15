// DOC
const page = document.querySelector('.page');
let currentProfileName = page.querySelector('.profile__name');
let currentProfileInfo = page.querySelector('.profile__about');
const cardsGrid = page.querySelector('.photo-grid');

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

// TEMPLATES
const cardTemplate = document.querySelector('#card-template').content;

// CARDS
const initialCards = [
  {
    name: 'Пятигорск',
    link: '../images/pyatigorks.jpeg',
  },
  {
    name: 'Гора Эльбрус',
    link: '../images/elbrus.jpeg',
  },
  {
    name: 'Домбай',
    link: '../images/dombay-mountains.jpeg',
  },
  {
    name: 'Домбай',
    link: '../images/dombay-yak.jpeg',
  },
  {
    name: 'Гора Машук',
    link: '../images/gora-mashuk.jpeg',
  },
  {
    name: 'Кабардино-Балкария',
    link: '../images/kabardino-balkariya.jpeg',
  },
];

function createCard(data) {
  let cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = data.name;
  cardElement.querySelector('.card__image').src = data.link;
  return cardElement;
}

function renderCard(data, container) {
  container.prepend(createCard(data));
}

initialCards.forEach(function (card) {
  renderCard(card, cardsGrid);
});

// создаем новую карточку из попапа -- пока вручную
// popup.input => newCard.push(value) => createCard(newCard)
let newCard = [
  {
    name: 'Teст v',
    link: '../images/test-v.jpg',
  },
  {
    name: 'Teст h',
    link: '../images/test-h.jpg',
  },
];

newCard.forEach(function (card) {
  renderCard(card, cardsGrid);
});

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

// function openaddPhotoPopupHandler(evt) {
//   preventDefaultBehavior(evt);
//   // никакие значения не загружем, изачально форма пуста
//   // TODO очищать введенные значения (см вебинар)
//   addPhotoPopup.classList.add('popup_opened');
//   newPhotoName.focus();
// }

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

// function formAddSubmitHandler(evt) {
//   preventDefaultBehavior(evt);
//   // TODO передавать значения в js: название и ссылку
//   // currentProfileName.textContent =
//   // currentProfileInfo.textContent =
//   addPhotoPopup.classList.remove('popup_opened');
// }

function openPhotoPreview(evt) {
  let elem = evt.target;
  if (elem.classList.contains('card__image')) {
    // взять фотку
    previewImagePopup.querySelector('.preview__photo').src = elem.src;
    // взять описание
    previewImagePopup.querySelector('.preview__caption').textContent = elem.closest('.card').querySelector('.card__title').textContent;
    // приклеить альт
    previewImagePopup.querySelector('.preview__photo').alt = elem.alt;
    previewImagePopup.classList.add('popup_opened');
  }
}

// LISTENERS

editProfileButton.addEventListener('click', openEditProfilePopupHandler);

formEdit.addEventListener('submit', formEditSubmitHandler);

// addPhotoButton.addEventListener('click', openaddPhotoPopupHandler);

// formAdd.addEventListener('submit', formAddSubmitHandler);

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

// к остальным кнопкам оставить отдельные слушатели наверно...
