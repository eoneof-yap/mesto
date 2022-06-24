import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, selectors, formSelectors = '') {
    super(popupSelector, selectors, formSelectors);
    this._previewImage = this._popup.querySelector(
      this._selectors.popupPreviewImageSelector,
    );
    this._previewCaption = this._popup.querySelector(
      this._selectors.popupPreviewCaptionSelector,
    );
  }

  open({ link, title }) {
    this._previewImage.setAttribute('src', link);
    this._previewImage.setAttribute('alt', title);
    this._previewCaption.textContent = title;
    super.open();
  }
}
