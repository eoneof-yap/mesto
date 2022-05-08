export default class UserInfo {
  constructor({ name, about }) {
    this._userName = document.querySelector(name);
    this._userInfo = document.querySelector(about);
  }

  getUserInfo() {
    const userInfo = {
      name: this._userName.textContent,
      about: this._userInfo.textContent,
    };
    return userInfo;
  }

  setUserInfo() {}
}
