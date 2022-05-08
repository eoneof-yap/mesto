export default class UserInfo {
  constructor({ name, info }) {
    this._userName = name;
    this._userInfo = info;
  }

  getUserInfo() {
    const info = {
      name: this._userName.textContent,
      info: this._userInfo.textContent,
    };
    console.log(info);
  }

  setUserInfo() {}
}
