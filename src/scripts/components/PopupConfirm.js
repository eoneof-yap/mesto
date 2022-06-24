import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor(popupSelector, selectors, formSelectors) {
    super(popupSelector, selectors, formSelectors);
    this._handleConfirmClick = this._handleConfirmClick.bind(this);
    this._disabledButtonClass = formSelectors.formDisabledButtonClass;
  }

  renderLoader(isLoading) {
    if (isLoading) {
      this._submitButton.classList.add(this._disabledButtonClass);
      this._submitButton.setAttribute('disabled', 'disabled');
      this._submitButton.textContent = 'Удаление...';
    } else {
      this._submitButton.classList.remove(this._disabledButtonClass);
      this._submitButton.removeAttribute('disabled', 'disabled');
      this._submitButton.textContent = 'Да';
    }
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
