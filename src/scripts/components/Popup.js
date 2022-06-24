export default class Popup {
  constructor(popupSelector, selectors, formSelectors) {
    this._popup = document.querySelector(popupSelector);
    this._selectors = selectors;
    this._submitButton = this._popup.querySelector(
      formSelectors.formSubmitButtonSelector,
    );
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

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (
        evt.target.classList.contains(this._selectors.popupCloseButtonClass) ||
        evt.target.classList.contains(this._selectors.popupBackdropClass)
      ) {
        this.close();
      }
    });
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
}
