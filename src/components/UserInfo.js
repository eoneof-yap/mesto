export default class UserInfo {
  constructor({ name, about }) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
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
