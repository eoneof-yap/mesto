import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, image, title) {
    super(popupSelector);
    this.image = image;
    this._title = title;
  }

  // open() {} // inherit
}
