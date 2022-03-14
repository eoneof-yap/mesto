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

// TEMPLATES
const photoCard = document.getElementById('card-template');

// PHOTOS
const initialCards = [
  {
    name: 'Пятигорск',
    link: '../images/pyatigorks.jpeg',
    alt: 'Вид на гору Бештау',
  },
  {
    name: 'Гора Эльбрус',
    link: '../images/elbrus.jpeg',
    alt: 'Вид на гору Эльбрус с Чегета',
  },
  {
    name: 'Домбай',
    link: '../images/dombay-mountains.jpeg',
    alt: 'Горы Домбая',
  },
  {
    name: 'Домбай',
    link: '../images/dombay-yak.jpeg',
    alt: 'v',
  },
  {
    name: 'Гора Машук',
    link: '../images/gora-mashuk.jpeg',
    alt: 'Указатели на горе Машук',
  },
  {
    name: 'Кабардино-Балкария',
    link: '../images/kabardino-balkariya.jpeg',
    alt: 'Перегон лошадей в горной деревне',
  },
];

function preventDefaultBehavior(evt) {
  evt.preventDefault();
}

const createCard = (data) => {
  // Клонируем шаблон, наполняем его информацией из объекта data, навешиваем всякие обработчики событий, о которых будет инфа ниже
  // Возвращаем получившуюся карточку
  return cardElement;
};

const renderCard = (data, cardsContainer) => {
  // Создаем карточку на основе данных
  const cardElement = createCard(data);
  // Помещаем ее в контейнер карточек
  cardsContainer.prepend(cardElement);
};

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
