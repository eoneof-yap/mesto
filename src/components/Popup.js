import { popup } from '../utils/constants.js';

export default class Popup {
  constructor(popupelector) {
    this._popup = document.querySelector(popupelector);
  }

  open() {
    this._seteventListeners();
    this._popup.classList.add(popup.opened);
  }

  close() {
    this._popup.classList.remove(popup.opened);
  }

  _seteventListeners() {
    /*
      querySelector() используется внутри класса
      т.к. у каждого попапа свои элементы
    */
    this._popup
      .querySelector(popup.elements.closeButton)
      .addEventListener('click', (evt) => {
        this.close(evt);
      });

    this._popup
      .querySelector(popup.elements.backdrop)
      .addEventListener('click', (evt) => {
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
