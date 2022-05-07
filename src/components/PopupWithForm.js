import Popup from './Popup.js';
import { forms, inputTypes } from '../utils/constants.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
  }

  // open() {} // inherit

  close() {
    this._popup.querySelector(forms.form).reset();
    super.close();
  }

  _seteventListeners() {
    super._seteventListeners();
    this._popup.querySelector(forms.form).addEventListener('submit', (evt) => {
      evt.preventDefault();
      console.log(this._popup.querySelector(forms.form));
      this._formSubmitHandler(this._getInputValues());
      this.close();
    });
  }

  _getInputValues() {
    const item = {
      name: inputTypes.photoName.value,
      link: inputTypes.photoLink.value,
    };
    return item;
  }

  // _handleEscClose(evt) {} // inherit
}
