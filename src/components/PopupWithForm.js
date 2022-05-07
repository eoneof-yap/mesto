import Popup from './Popup.js';
import { popup } from '../utils/constants.js';

export default class PopupWithForm extends Popup {
  constructor(popupelector, submitForm) {
    super(popupelector);
    this._popup = document.querySelector(popupelector);
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
