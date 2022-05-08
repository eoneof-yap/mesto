import Popup from './Popup.js';
import { popupSelectors } from '../utils/constants.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, image, title) {
    super(popupSelector);
    this._image = image;
    this._title = title;
  }

  // prettier-ignore
  open() {
    this._popup.querySelector(popupSelectors.previewImage).setAttribute('src', this._image.src);
    this._popup.querySelector(popupSelectors.previewImage).setAttribute('alt', this._title.alt);
    this._popup.querySelector(popupSelectors.previewCaption).textContent = this._title;
    super.open();
  }
}
