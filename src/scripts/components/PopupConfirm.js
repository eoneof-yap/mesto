import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor(popupSelector, selectors, formSelectors, submitHandler) {
    super(popupSelector, selectors);
    this._submitButton = this._popup.querySelector(
      formSelectors.formSubmitButtonSelector,
    );
    this._submitHandler = submitHandler;
    this._handleConfirmClick = this._handleConfirmClick.bind(this);
    this._disabledButton = formSelectors.formDisabledButtonClass;
  }

  showLoader() {
    this._submitButton.classList.add(this._disabledButton);
    this._submitButton.setAttribute('disabled', 'disabled');
    this._submitButton.textContent = 'Удаление...';
  }

  hideLoader() {
    this._submitButton.classList.remove(this._disabledButton);
    this._submitButton.removeAttribute('disabled', 'disabled');
    this._submitButton.textContent = 'Да';
  }

  setEventListeners() {
    super.setEventListeners(); // нажатие на крестик и фон
    this._popup.addEventListener('click', this._handleConfirmClick);
  }

  _handleConfirmClick() {
    this._submitHandler();
  }
}
