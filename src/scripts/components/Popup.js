export default class Popup {
  constructor(popupSelector, selectors) {
    this._popup = document.querySelector(popupSelector);
    this._selectors = selectors;
    // this._closeButton = this._popup.querySelector(selectors.popupCloseButtonSelector);
    // this._backdrop = this._popup.querySelector(selectors.popupBackdropSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add(this._selectors.popupOpenedClass);
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove(this._selectors.popupOpenedClass);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  showLoader() {
    this._submitButton.classList.add(this._disabledButton);
    this._submitButton.setAttribute('disabled', 'disabled');
    this._submitButton.textContent = 'Сохранение...';
  }

  hideLoader() {
    this._submitButton.classList.remove(this._disabledButton);
    this._submitButton.removeAttribute('disabled', 'disabled');
    this._submitButton.textContent = 'Сохранить';
  }

  setEventListeners() {
    /*
      querySelector() используется внутри метода
      т.к. у каждого попапа свои элементы
    */
    this._popup
      .querySelector(this._selectors.popupCloseButtonSelector)
      .addEventListener('click', () => {
        this.close();
      });

    this._popup
      .querySelector(this._selectors.popupBackdropSelector)
      .addEventListener('click', () => {
        this.close();
      });
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
}
