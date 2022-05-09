export default class UserInfo {
  constructor({ nameSelector, aboutSelector }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      about: this._about.textContent,
    };
    return userInfo;

    // => index.js => hanldeEditButton() => PopupWithForm.setInputvalues()
  }

  setUserInfo({ name, about }) {
    // from form to page
    this._name.textContent = name;
    this._about.textContent = about;
  }
}
