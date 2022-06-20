import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, selectors) {
    super(popupSelector, selectors);
    this._previewImage = this._popup.querySelector(
      this._selectors.popupPreviewImageSelector,
    );
    this._previewCaption = this._popup.querySelector(
      this._selectors.popupPreviewCaptionSelector,
    );
  }

  open({ link, name }) {
    this._previewImage.setAttribute('src', link);
    this._previewImage.setAttribute('alt', name);
    this._previewCaption.textContent = name;
    super.open();
  }
}
