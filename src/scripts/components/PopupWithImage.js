import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, { link, title }, selectors) {
    super(popupSelector);
    this._image = link;
    this._title = title;
    this._previewImage = this._popup.querySelector(selectors.previewImage);
    this._previewCaption = this._popup.querySelector(selectors.previewCaption);
  }

  open() {
    this._previewImage.setAttribute('src', this._image);
    this._previewImage.setAttribute('alt', this._title);
    this._previewCaption.textContent = this._title;
    super.open();
  }
}
