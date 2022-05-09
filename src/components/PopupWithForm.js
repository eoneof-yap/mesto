import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { form, input, submitButton }, formSubmitHandler) {
    super(popupSelector);
    this._form = this._popup.querySelector(form);
    this._inputsList = this._popup.querySelectorAll(input);
    this._submitButton = this._form.querySelector(submitButton);
    this._formSubmitHandler = formSubmitHandler;
  }

  close() {
    this._form.reset();
    super.close();
  }

  setInputValues(data) {
    this._inputsList.forEach((input, index) => {
      // чтобы не привязываться к именам инпутов берем значения по индексу
      input.value = Object.values(data)[index];
    });
  }

  _getInputValues() {
    const inputValues = {};
    this._inputsList.forEach((input, index) => {
      inputValues[index] = input.value;
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
