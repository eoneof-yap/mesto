export default class UserInfo {
  constructor(profileElements, userData, userDataHandler) {
    this._profile = profileElements.profileContainer;
    this._name = profileElements.nameElement;
    this._about = profileElements.aboutElement;
    this._photo = profileElements.photoElement;
    this._data = userData;
    this._handler = userDataHandler;
    this._handleUserData = this._handleUserData.bind(this);
  }

  _handleUserData(data) {
    this._handler(data);
  }

  getUserInfo() {
    this._handleUserData(this._data);
  }

  setUserInfo() {
    this._name.textContent = this._data.name;
    this._about.textContent = this._data.about;
    this._profile.setAttribute('data-user-id', this._data._id);
    this._profile.setAttribute('data-user-cohort', this._data.cohort);
    this._photo.setAttribute('src', this._data.avatar);
  }

  pickUserInfo() {
    return (userInfo = {
      name: this._name.textContent,
      about: this._about.textContent,
    });
  }

  updateUserInfo() {
    this._handleUserData(data);
  }

  updateUserProfilePhoto(data) {
    this._photo.setAttribute('src', data);
  }
}
