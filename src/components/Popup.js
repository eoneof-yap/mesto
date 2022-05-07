import { popups, popupElements } from '../utils/constants.js';

class Popup {
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

class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
  }

  // open() {} // inherit

  close() {
    this._popup.classList.remove(popups.opened);
    // TODO reset()
  }

  _seteventListeners() {
    super._seteventListeners();
    // TODO form.addEventListener('submit', ()=>{})
  }

  // _handleEscClose(evt) {} // inherit
}

class PopupWithImage extends Popup {
  constructor(popupSelector, image, title) {
    super(popupSelector);
    this.image = image;
    this._title = title;
  }

  // open() {} // inherit
}

export { Popup, PopupWithImage, PopupWithForm };
