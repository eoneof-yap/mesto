import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(
    popupSelector,
    { formSelector, formInputSelector, formSubmitButtonSelector, formDisabledButtonClass },
    formSubmitHandler,
  ) {
    super(popupSelector);
    this._form = this._popup.querySelector(formSelector);
    this._inputsList = this._popup.querySelectorAll(formInputSelector);
    this._submitButton = this._form.querySelector(formSubmitButtonSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._disabledButton = formDisabledButtonClass;
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  displayLoader() {
    this._submitButton.classList.add(this._disabledButton);
    this._submitButton.setAttribute('disabled', 'disabled');
    this._submitButton.textContent = 'Сохранение...';
  }

  hideLoader() {
    this._submitButton.classList.remove(this._disabledButton);
    this._submitButton.removeAttribute('disabled', 'disabled');
    this._submitButton.textContent = 'Сохранить';
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
    const inputValues = {};
    this._inputsList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleSubmit);
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    this._formSubmitHandler(this._getInputValues());
  }
}
