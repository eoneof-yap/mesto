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
  // содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;

  // создание карточки
  createCard() {
    // зпрашиваем шаблон у метода
    this._cardElement = this._getTemplate();
    this._setEventListeners();
    // подставляем картинку
    this._image = this._cardElement.querySelector(this._cardImage);
    // подставляем название карточки
    this._cardElement.querySelector(this._cardTitle).textContent = this._cardName;
    // альт атрибут
    this._image.setAttribute('alt', this._cardName);
    //срц атрибут
    this._image.setAttribute('src', this._cardLink);
    // возвращем готовый элемент как ноду
    return this._cardElement;
  }

  // получаем темплейт карточки
  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardTemplate).content.querySelector(this._card).cloneNode(true);
    return cardTemplate;
  }

  _setEventListeners() {
    // только стрелочная функция -- обычная не понимает контекст this.
    this._cardElement.querySelector(this._cardDeleteButton).addEventListener('click', (evt) => {
      this._handleDelete(evt);
    });

    // тут function createPreview(evt)
    // this._cardImage.addEventListener('click', this._handlePreview());
    this._cardElement.querySelector(this._cardLikeButton).addEventListener('click', (evt) => {
      this._handleLike(evt);
    });
  }

  _handleDelete(evt) {
    evt.target.closest('.card').remove();
  }
  _handlePreview() {}
  _handleLike(evt) {
    evt.target.classList.toggle('card__like-button_active');
  }

  // содержит приватные методы для каждого обработчика;
}

// генерируем карточки по одной из объекта с данными
function renderElements(data, selectors) {
  data.forEach((element) => {
    const card = new Card(element, selectors);
    document.querySelector(cardSelectors.photoGrid).prepend(card.createCard());
  });
}

renderElements(initialCards, cardSelectors);
