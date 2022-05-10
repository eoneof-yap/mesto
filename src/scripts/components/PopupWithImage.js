import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, /* { link, title }, */ selectors) {
    super(popupSelector);
    // this._image = link;
    // this._title = title;
    this._previewImage = this._popup.querySelector(selectors.popupPreviewImageSelector);
    this._previewCaption = this._popup.querySelector(
      selectors.popupPreviewCaptionSelector,
    );
  }

  open({ link, title }) {
    this._previewImage.setAttribute('src', link);
    this._previewImage.setAttribute('alt', title);
    this._previewCaption.textContent = title;
    super.open();
  }
}
