export default class Section {
  constructor({ data, renderCardHandler }, container) {
    this._data = data;
    this._renderCardHandler = renderCardHandler;
    this._container = container;
  }

  createInitialItems() {
    this._data.forEach((item) => {
      this._renderCardHandler(item);
    });
  }

  createSectionItem(item) {
    this._renderCardHandler(item);
  }

  renderSectionItem(item) {
    this._container.append(item);
  }
}
