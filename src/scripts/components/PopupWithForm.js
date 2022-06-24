import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(
    popupSelector,
    selectors,
    formSelectors,
    formSubmitHandler,
    mapDataCallback,
  ) {
    super(popupSelector, selectors, formSelectors);
    this._form = this._popup.querySelector(formSelectors.formSelector);
    this._inputsList = this._popup.querySelectorAll(formSelectors.formInputSelector);
    this._mapDataCallback = mapDataCallback;
    this._formSubmitHandler = formSubmitHandler;
    this._handleSubmit = this._handleSubmit.bind(this);
    this._disabledButtonClass = formSelectors.formDisabledButtonClass;
  }

  renderLoader(isLoading) {
    if (isLoading) {
      this._submitButton.classList.add(this._disabledButtonClass);
      this._submitButton.setAttribute('disabled', 'disabled');
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.classList.remove(this._disabledButtonClass);
      this._submitButton.removeAttribute('disabled', 'disabled');
      this._submitButton.textContent = 'Сохранить';
    }
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
    this._formSubmitHandler(this._getInputValues(), this._mapDataCallback);
  }

  _getInputValues() {
    const inputValues = {};
    this._inputsList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }
}
