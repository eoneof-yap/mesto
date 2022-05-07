export default class Section {
  /*
    Коструктор принимает два параметра:
    1. Объект с двумя ключами: начальный список карточек и функцию по отрисовке карточки
    2. Селектор блока карточек на странице
  */
  constructor({ data, renderer }, containerSelector) {
    this._items = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addNewItem(item) {
    this._container.append(item);
  }

  addInitialItems() {
    let i = 0; // TODO: delete
    this._items.forEach((item) => {
      this._renderer(item);
      console.log('new Card  #' + (i += 1)); // TODO: delete
    });
  }
}
