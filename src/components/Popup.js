import { popups, popupElements } from '../utils/constants.js';

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._seteventListeners();
    this._popup.classList.add(popups.opened);
  }

  close() {
    this._popup.classList.remove(popups.opened);
  }

  _seteventListeners() {
    /*
      querySelector() используется внутри класса
      т.к. у каждого попапа свои элементы
    */
    this._popup
      .querySelector(popupElements.closeButton)
      .addEventListener('click', (evt) => {
        this.close(evt);
      });

    this._popup.querySelector(popupElements.backdrop).addEventListener('click', (evt) => {
      this.close(evt);
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
