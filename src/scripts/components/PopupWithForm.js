import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, selectors, formSelectors, formSubmitHandler) {
    super(popupSelector, selectors);
    this._form = this._popup.querySelector(formSelectors.formSelector);
    this._inputsList = this._popup.querySelectorAll(formSelectors.formInputSelector);
    this._submitButton = this._popup.querySelector(
      formSelectors.formSubmitButtonSelector,
    );
    this._formSubmitHandler = formSubmitHandler;
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  displayLoader() {
    super.displayLoader();
  }

  hideLoader() {
    super.hideLoader();
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

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleSubmit);
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    this._formSubmitHandler(this._getInputValues());
  }

  _getInputValues() {
    const inputValues = {};
    this._inputsList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }
}
