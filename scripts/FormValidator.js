export { FormValidator };
class FormValidator {
  constructor(form, targets) {
    this._form = form;
    this._input = targets.inputSelector;
    this._submitButton = targets.submitButtonSelector;
    this._disabledButton = targets.disabledButtonClass;
    this._inputError = targets.inputErrorClass;
    this._errorHint = targets.errorHintClass;
    this._activeError = targets.activeErrorClass;
  }

  validateForm() {
    // this._toggleButtonState(inputsList, submitButton);
    this._setEventListeners();
  }
  _setEventListeners() {
    const inputsList = Array.from(this._form.querySelectorAll(this._input));
    const submitButton = this._form.querySelector(this._submitButton);
    this._toggleButtonState(inputsList, submitButton);
    inputsList.forEach((inputItem) => {
      inputItem.addEventListener('input', () => {
        this._handleInput(inputsList, inputItem, submitButton);
      });
    });
  }

  _handleInput(inputsList, inputItem, submitButton) {
    this._isValidInput(inputItem);
    this._toggleButtonState(inputsList, submitButton);
  }

  _toggleButtonState(inputsList, submitButton) {
    if (this._isInvalidForm(inputsList)) {
      submitButton.classList.add(this._disabledButton);
      submitButton.setAttribute('disabled', 'disabled');
    } else {
      submitButton.classList.remove(this._disabledButton);
      submitButton.removeAttribute('disabled', 'disabled');
    }
  }

  _isValidInput(inputItem) {
    if (!inputItem.validity.valid) {
      this._showError(inputItem, inputItem.validationMessage);
    } else {
      this._hideError(inputItem);
    }
  }

  _isInvalidForm(inputsList) {
    return inputsList.some((inputItem) => {
      return !inputItem.validity.valid;
    });
  }

  _showError(inputItem, errorMessage) {
    const errorHint = this._form.querySelector(`.${inputItem.id}-error`);
    errorHint.textContent = errorMessage;
    errorHint.classList.add(this._activeError);
    inputItem.classList.add(this._inputError);
  }

  _hideError(inputItem) {
    const errorHint = this._form.querySelector(`.${inputItem.id}-error`);
    inputItem.classList.remove(this._inputError);
    errorHint.classList.remove(this._activeError);
    errorHint.textContent = '';
  }
}
