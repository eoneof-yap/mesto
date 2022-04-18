import { initialCards } from './cards.js';
import { cardSelectors } from './index.js';

class Card {
  // принимает в конструктор её данные и селектор её template-элемента;
  constructor(data, selectors) {
    this._cardName = data.name;
    this._cardLink = data.link;
    this._cardTemplate = selectors.template;
    this._card = selectors.card;
    this._cardImage = selectors.image;
    this._cardTitle = selectors.title;
    this._cardDeleteButton = selectors.deleteButton;
    this._cardLikeButton = selectors.likeButton;
    this._cardsGrid = selectors.photoGrid;
  }

  // содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.
  renderCard() {
    document.querySelector(this._cardsGrid).prepend(this._createCard());
  }

  // содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;

  // создание карточки
  _createCard() {
    // клонируем темплейт
    this._cardElement = this._getTemplate().querySelector(this._card).cloneNode(true);
    this._image = this._cardElement.querySelector(this._cardImage);

    this._cardElement.querySelector(this._cardTitle).textContent = this._cardName;
    this._image.setAttribute('alt', this._cardName);
    this._image.setAttribute('src', this._cardLink);
    return this._cardElement;
  }

  // получаем темплейт карточки
  _getTemplate() {
    this._cardTemplate = document.querySelector(this._cardTemplate).content;
    return this._cardTemplate;
  }

  _setEventListeners() {
    // карточка — самостоятельный блок, должна работать в любом месте страницы
    this._cardElement.querySelector(this._cardDeleteButton).addEventListener('click', deleteCard);
    cardImage.addEventListener('click', createPreview);
    this._cardElement.querySelector(this._cardLikeButton).addEventListener('click', toggleLike);
  }

  // содержит приватные методы для каждого обработчика;
}

// генерируем карточки по одной из объекта с данными
function renderElements(data, selectors) {
  data.forEach((element) => {
    const card = new Card(element, selectors);
    console.log(card.renderCard());
  });
}

renderElements(initialCards, cardSelectors);
