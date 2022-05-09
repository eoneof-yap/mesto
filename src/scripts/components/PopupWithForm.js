import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(
    popupSelector,
    { formSelector, formInputSelector, formSubmitButtonSelector },
    formSubmitHandler,
  ) {
    super(popupSelector);
    this._form = this._popup.querySelector(formSelector);
    this._inputsList = this._popup.querySelectorAll(formInputSelector);
    this._submitButton = this._form.querySelector(formSubmitButtonSelector);
    this._formSubmitHandler = formSubmitHandler;
  }

  close() {
    this._form.reset();
    super.close();
  }

  setInputValues(data) {
    this._inputsList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  _getInputValues() {
    this._seteventListeners();
    const inputValues = {};
    this._inputsList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  _seteventListeners() {
    super._seteventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmitHandler(this._getInputValues());
    });
  }
}
