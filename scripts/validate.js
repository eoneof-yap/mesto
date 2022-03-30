function showError() {
  profileNameErrorHint.classList.add('form__input-error-hint_active');
}

function hideError() {
  profileNameErrorHint.classList.remove('form__input-error-hint_active');
}

function enableButton() {
  editingFormSubmitButton.classList.remove('button_disabled');
}

function disableButton() {
  editingFormSubmitButton.classList.add('button_disabled');
}

function checkValidity() {}

function validationHandler(evt) {
  if (!evt.target.checkValidity()) {
    disableButton();
    showError();
  } else {
    enableButton();
    hideError();
    console.log(evt.key);
  }
}

newProfileNameInput.addEventListener('input', validationHandler);
