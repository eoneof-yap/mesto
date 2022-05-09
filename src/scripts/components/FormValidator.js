﻿export { FormValidator };
class FormValidator {
  constructor(formSelector, targets) {
    this._form = formSelector;
    this._inputsList = Array.from(this._form.querySelectorAll(targets.input));
    this._submitButton = this._form.querySelector(targets.submitButton);
    this._disabledButton = targets.disabledButton;
    this._inputError = targets.inputError;
    this._errorHint = targets.errorHint;
    this._activeError = targets.activeError;
  }

  enableValidation() {
    this._setEventListeners();
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputsList.forEach((inputItem) => {
      this._hideError(inputItem);
    });
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputsList.forEach((inputItem) => {
      inputItem.addEventListener('input', () => {
        this._handleInput(inputItem);
      });
    });
  }

  _handleInput(inputItem) {
    this._isValidInput(inputItem);
    this._toggleButtonState();
  }

  _toggleButtonState() {
    if (this._isInvalidForm(this._inputsList)) {
      this._submitButton.classList.add(this._disabledButton);
      this._submitButton.setAttribute('disabled', 'disabled');
    } else {
      this._submitButton.classList.remove(this._disabledButton);
      this._submitButton.removeAttribute('disabled', 'disabled');
    }
  }

  _isValidInput(inputItem) {
    if (!inputItem.validity.valid) {
      this._showError(inputItem, inputItem.validationMessage);
    } else {
      this._hideError(inputItem);
    }
  }

  _isInvalidForm() {
    return this._inputsList.some((inputItem) => {
      return !inputItem.validity.valid;
    });
  }

  _showError(inputItem, errorMessage) {
    this._getHintClassName(inputItem).textContent = errorMessage;
    this._getHintClassName(inputItem).classList.add(this._activeError);
    inputItem.classList.add(this._inputError);
  }

  _hideError(inputItem) {
    inputItem.classList.remove(this._inputError);
    this._getHintClassName(inputItem).classList.remove(this._activeError);
    this._getHintClassName(inputItem).textContent = '';
  }

  _getHintClassName(inputItem) {
    return this._form.querySelector(`.${inputItem.name}-input-error`);
  }
}
