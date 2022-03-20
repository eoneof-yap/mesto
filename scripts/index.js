// DOC
const page = document.querySelector('.page');
const photoGrid = page.querySelector('.photo-grid');

// TEMPLATES
const cardTemplate = document.querySelector('#card-template').content;

// EDITABLES
const currentProfileName = page.querySelector('.profile__name');
const currentProfileInfo = page.querySelector('.profile__about');

// BUTTONS
const editProfileButton = page.querySelector('.profile__edit-button');
const addPhotoButton = page.querySelector('.profile__add-button');

// POPUPS
const editProfilePopup = page.querySelector('.popup_type_edit');
const addPhotoPopup = page.querySelector('.popup_type_add');
const previewPhotoPopup = page.querySelector('.popup_type_preview');

// FORMS
const editForm = page.querySelector('.form_type_edit');
const addForm = page.querySelector('.form_type_add');

// INPUTS
const newProfileName = editProfilePopup.querySelector('input[name="profile-name"]');
const newProfileInfo = editProfilePopup.querySelector('input[name="profile-about"]');
const newPhotoName = addPhotoPopup.querySelector('input[name="card-name"]');
const newPhotoLink = addPhotoPopup.querySelector('input[name="card-link"]');

// DATA
const initialCards = [
  {
    name: 'Пятигорск',
    link: './images/pyatigorks.jpeg',
  },
  {
    name: 'Гора Эльбрус',
    link: './images/elbrus.jpeg',
  },
  {
    name: 'Домбай',
    link: './images/dombay-mountains.jpeg',
  },
  {
    name: 'Домбай',
    link: './images/dombay-yak.jpeg',
  },
  {
    name: 'Гора Машук',
    link: './images/gora-mashuk.jpeg',
  },
  {
    name: 'Кабардино-Балкария',
    link: './images/kabardino-balkariya.jpeg',
  },
];

// FUNCTIONS
function preventDefaultBehavior(evt) {
  evt.preventDefault();
}

// cards
function renderCard(data, container) {
  container.prepend(createCard(data));
}
function createCard(data) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  // карточка — самостоятельный блок, должна работать в любом месте страницы
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
  cardElement.querySelector('.card__image').addEventListener('click', createPreview);
  cardElement.querySelector('.card__like-button').addEventListener('click', toggleLike);

  cardElement.querySelector('.card__title').textContent = data.name;
  cardElement.querySelector('.card__image').setAttribute('alt', data.name);
  cardElement.querySelector('.card__image').setAttribute('src', data.link);
  return cardElement;
}

function toggleLike(evt) {
  evt.target.classList.toggle('card__like-button_active');
}

function deleteCard(evt) {
  evt.target.closest('.card').remove();
}

// popups
function renderPreview(preview) {
  openPopup(preview);
}
function createPreview(evt) {
  previewPhotoPopup.querySelector('.preview__photo').setAttribute('src', evt.target.src);
  previewPhotoPopup.querySelector('.preview__photo').setAttribute('alt', evt.target.alt);
  previewPhotoPopup.querySelector('.preview__caption').textContent = evt.target.closest('.card').querySelector('.card__title').textContent;
  renderPreview(previewPhotoPopup);
}

function openPopup(popup) {
  popup.querySelector('.popup__close-button').addEventListener('click', closePopupHandler);
  document.addEventListener('keydown', closePopupViaEscHandler);
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  // слушатель нельзя удалить, если обработчик задан как анонимная функция
  popup.querySelector('.popup__close-button').removeEventListener('click', closePopupHandler);
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

function editProfilePopupHandler(evt) {
  preventDefaultBehavior(evt);
  newProfileName.value = currentProfileName.textContent;
  newProfileInfo.value = currentProfileInfo.textContent;
  openPopup(editProfilePopup);
}

function editFormSubmitHandler(evt) {
  preventDefaultBehavior(evt);
  currentProfileName.textContent = newProfileName.value;
  currentProfileInfo.textContent = newProfileInfo.value;
  closePopup(editProfilePopup);
}

function addPhotoPopupHandler(evt) {
  // форма изначально пуста
  preventDefaultBehavior(evt);
  openPopup(addPhotoPopup);
}

function addFormSubmitHandler(evt) {
  preventDefaultBehavior(evt);
  renderCard(
    {
      name: newPhotoName.value,
      link: newPhotoLink.value,
      alt: newPhotoName.value,
    },
    photoGrid,
  );
  closePopup(addPhotoPopup);
  evt.currentTarget.reset();
}

// ENTRY POINT
editProfileButton.addEventListener('click', editProfilePopupHandler);
addPhotoButton.addEventListener('click', addPhotoPopupHandler);

editForm.addEventListener('submit', editFormSubmitHandler);
addForm.addEventListener('submit', addFormSubmitHandler);

// показываем карточки по умолчанию
initialCards.forEach(function (card) {
  renderCard(card, photoGrid);
});
