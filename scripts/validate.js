//INPUT DATA
const validationTargets = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  disabledButtonClass: 'button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorHintClass: '.form__input-error-hint',
  activeErrorClass: 'form__input-error-hint_active',
};

// MAIN LOGIC
function showError(form, inputItem, errorMessage, targets) {
  const errorHint = form.querySelector(`.${inputItem.id}-error`);
  errorHint.textContent = errorMessage;
  errorHint.classList.add(targets.activeErrorClass);
  inputItem.classList.add(targets.inputErrorClass);
}

function hideError(form, inputItem, targets) {
  const errorHint = form.querySelector(`.${inputItem.id}-error`);
  inputItem.classList.remove(targets.inputErrorClass);
  errorHint.classList.remove(targets.activeErrorClass);
  errorHint.textContent = '';
}

function isValidInput(form, inputItem, targets) {
  if (!inputItem.validity.valid) {
    showError(form, inputItem, inputItem.validationMessage, targets);
  } else {
    hideError(form, inputItem, targets);
  }
}

function isInvalidForm(inputsList) {
  return inputsList.some(function (inputItem) {
    return !inputItem.validity.valid;
  });
}

function toggleButtonState(inputsList, submitButton, targets) {
  if (isInvalidForm(inputsList)) {
    submitButton.classList.add(targets.disabledButtonClass);
    submitButton.setAttribute('disabled', 'disabled');
  } else {
    submitButton.classList.remove(targets.disabledButtonClass);
    submitButton.removeAttribute('disabled', 'disabled');
  }
}

function setEventListeners(form, targets) {
  const inputsList = Array.from(form.querySelectorAll(targets.inputSelector));
  const submitButton = form.querySelector(targets.submitButtonSelector);
  toggleButtonState(inputsList, submitButton, targets);

  inputsList.forEach(function (inputItem) {
    inputItem.addEventListener('input', function () {
      isValidInput(form, inputItem, targets);
      toggleButtonState(inputsList, submitButton, targets);
    });
  });
}

function enableValidation(targets) {
  const formsList = Array.from(document.querySelectorAll(targets.formSelector));
  formsList.forEach(function (form) {
    setEventListeners(form, targets);
  });
}

// ENTRY POINT
enableValidation(validationTargets);
