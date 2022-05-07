import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, image, title) {
    super(popupSelector);
    this._image = image;
    this._title = title;
  }

  open() {
    console.log(this._image, this._title);

    // this._popup.querySelector('.preview__image').setAttribute('src', evt.target.src);
    // this._popup.querySelector('.preview__image').setAttribute('alt', evt.target.alt);
    // this._popup.querySelector('.preview__caption').textContent = evt.target
    //   .closest('.card')
    //   .querySelector('.card__title').textContent;

    super.open();
  }
}
