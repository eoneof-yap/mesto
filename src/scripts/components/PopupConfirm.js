import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor(popupSelector, selectors, formSelectors) {
    super(popupSelector, selectors, formSelectors);
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

  setSubmitAction(submitAction) {
    this._submitAction = submitAction;
  }

  setEventListeners() {
    super.setEventListeners(); // нажатие на крестик и фон
    this._submitButton.addEventListener('click', this._handleConfirmClick);
  }

  _handleConfirmClick() {
    this._submitAction();
  }
}
