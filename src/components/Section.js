export default class Section {
  /*
    Коструктор принимает два параметра:
    1. Объект с двумя ключами: начальный список карточек и функцию по отрисовке карточки
    2. Селектор блока карточек на странице
  */
  constructor({ cardData, renderer }, containerSelector) {
    this._items = cardData;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addNewItem(item) {
    this._container.append(item);
  }

  addInitialItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
}
