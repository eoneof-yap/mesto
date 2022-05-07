import Popup from './Popup.js';
import { popup } from '../utils/constants.js';
export default class PopupWithImage extends Popup {
  constructor(popupelector, image, title) {
    super(popupelector);
    this.image = image;
    this._title = title;
  }

  // open() {} // inherit
}
