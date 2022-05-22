import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, selectors) {
    super(popupSelector);
    this._previewImage = this._popup.querySelector(selectors.popupPreviewImageSelector);
    this._previewCaption = this._popup.querySelector(
      selectors.popupPreviewCaptionSelector,
    );
  }

  open({ link, name }) {
    this._previewImage.setAttribute('src', link);
    this._previewImage.setAttribute('alt', name);
    this._previewCaption.textContent = name;
    super.open();
  }
}
