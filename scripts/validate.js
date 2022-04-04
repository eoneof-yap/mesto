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

function setEventListeners(form) {
  const inputList = Array.from(form.querySelectorAll('.form__input'));
  const button = form.querySelector('.form__submit-button');
  enableButton(button);
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkValidity(form, input);
      disableButton(button);
    });
  });
  }
function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form);
  });
}

enableValidation();
