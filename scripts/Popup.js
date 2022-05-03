class Popup {
  constructor(popupSelector) {
    this.popupSelector = popupSelector;
  }

  open() {
    // openPopup
    this.popupSelector.classList.add('popup_opened');
  }

  close() {
    // closePopup
    this.popupSelector.classList.remove('popup_opened');
  }

  setEventListeners() {
    // popupCloseButton
  }

  _handleEscClose() {
    // escape > close()
  }
}

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open() {
    // addImage
  }
}

class PopupWithForm extends Popup {
  constructor(popupSelector /*, callback */) {
    super(popupSelector);
    // this.callback = callback
  }

  close() {
    // closePopup
    // resetForm
  }

  setEventListeners() {
    // submitForm
  }

  _getInputValues() {
    // inputs data
  }
}

// ---------------------------------------------------------------------------
// TEST
const editingForm = document.forms['form-edit'];
const page = document.querySelector('.page');
const editProfilePopup = page.querySelector('.popup_type_edit');

const popup = new Popup('this is a Popup yeah!');
// const popup2 = new PopupWithImage('this is a PopupWithImage yeah!');
popup.open();

function editingFormSubmitHandler(evt) {
  preventDefaultBehavior(evt);
  currentProfileName.textContent = newProfileNameInput.value;
  currentProfileInfo.textContent = newProfileInfoInput.value;
  closePopup(editProfilePopup);
}

editingForm.addEventListener('submit', editingFormSubmitHandler);
