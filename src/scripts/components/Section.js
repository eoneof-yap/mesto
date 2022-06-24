export default class Section {
  constructor({ data, renderCardHandler }, container) {
    this._data = data;
    this._container = container;
    this._renderCardHandler = renderCardHandler;
  }

  createSectionItem() {
    this._data.forEach((item) => {
      this._renderCardHandler(item);
    });
  }

  renderSectionItem(item) {
    this._container.prepend(item);
  }
}
