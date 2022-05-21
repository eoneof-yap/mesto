import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor(
    { popupConfirmSelector, ...popupSelectors },
    { formSubmitButtonSelector },
    submitHandler,
  ) {
    super(popupConfirmSelector);
    this._submitButton = this._popup.querySelector(formSubmitButtonSelector);
    this._submitHandler = submitHandler;
    this._handleSubmit = this._handleSubmit.bind(this);
    this._popupOpenedClass = popupSelectors.popupOpenedClass;
  }

  open() {
    this._popup.classList.add(this._popupOpenedClass);
    document.addEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('click', this._handleSubmit);
  }

  _handleSubmit() {
    // index.js => handleConfirmDeleteCard()
    // как-то передавать evt.target отсюда, а не из Card._handleDelete()
    this._submitHandler(/* id ?? */);
  }
}
