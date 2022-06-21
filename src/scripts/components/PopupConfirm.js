import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor(popupSelector, selectors, formSelectors, submitHandler) {
    super(popupSelector, selectors, formSelectors);
    this._submitHandler = submitHandler;
    this._handleConfirmClick = this._handleConfirmClick.bind(this);
  }

  showLoader() {
    super.showLoader();
    this._submitButton.textContent = 'Удаление...';
  }

  hideLoader() {
    super.hideLoader();
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
