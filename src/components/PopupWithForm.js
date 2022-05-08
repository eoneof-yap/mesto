import Popup from './Popup.js';
import { formSelectors, formInputs } from '../utils/constants.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
  }

  close() {
    this._popup.querySelector(formSelectors.form).reset();
    super.close();
  }

  _seteventListeners() {
    super._seteventListeners();
    this._popup.querySelector(formSelectors.form).addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmitHandler(this._getInputValues());
    });
  }

  _getInputValues() {
    const item = {
      name: formInputs.photoTitle.value,
      link: formInputs.photoLink.value,
    };
    return item;
  }
}
