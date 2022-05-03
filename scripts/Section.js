class Section {
  constructor({ items, renderer }, containerSelector) {
    this.items = items;
    this.renderer = renderer;
    this.containerSelector = containerSelector;
  }

  renderCard() {
    this.renderer; // index.js -> *Section.js* -> Card.js
  }

  addItem() {}
}
