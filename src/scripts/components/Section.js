export default class Section {
  /*  На входе:
      1. Объект с двумя ключами: начальный список карточек
         и функция по отрисовке карточки из `index.js`
      2. Селектор блока карточек на странице
  */
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderSectionItem(item) {
    this._renderer(item);
  }

  createSectionItem(item) {
    this._container.prepend(item);
  }

  createInitialItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
}
