import Popup from './Popup.js';
import { popups } from '../utils/constants.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
  }

  // open() {} // inherit

  close() {
    super.close();
    // TODO reset()
  }

  _seteventListeners() {
    super._seteventListeners();
    // TODO form.addEventListener('submit', ()=>{})
  }

  // _handleEscClose(evt) {} // inherit
}
