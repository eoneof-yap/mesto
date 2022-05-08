import { popupSelectors } from '../utils/constants.js';

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._seteventListeners();
    this._popup.classList.add(popupSelectors.popupOpened);
  }

  close() {
    this._popup.classList.remove(popupSelectors.popupOpened);
  }

  _seteventListeners() {
    /*
      querySelector() используется внутри класса
      т.к. у каждого попапа свои элементы
    */
    this._popup
      .querySelector(popupSelectors.closeButton)
      .addEventListener('click', () => {
        this.close();
      });

    this._popup
      .querySelector(popupSelectors.popupBackdrop)
      .addEventListener('click', () => {
        this.close();
      });

    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
}
