export default class Section {
  constructor({ items, renderer }, container) {
    this._items = items;
    this._renderer = renderer;
    this._container = container;
  }

  renderSectionItem(item) {
    this._renderer(item);
  }

  createSectionItem(item) {
    this._container.append(item);
  }

  createInitialItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
}
