import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor(
    { popupConfirmSelector, popupOpenedClass },
    { formSubmitButtonSelector },
    submitHandler,
  ) {
    super(popupConfirmSelector);
    this._submitButton = this._popup.querySelector(formSubmitButtonSelector);
    this._popupOpenedClass = popupOpenedClass;
    this._submitHandler = submitHandler;
    this._handleClick = this._handleConfirmClick.bind(this);
  }

  setEventListeners() {
    super.setEventListeners(); // нажатие на крестик и фон
    this._popup.addEventListener('click', this._handleConfirmClick);
  }

  _handleConfirmClick() {
    // index.js => handleConfirmDeleteCard()
    // как-то передавать evt.target отсюда, а не из Card._handleDelete()
    this._submitHandler(this);
  }
}
