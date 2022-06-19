export default class UserInfo {
  constructor(profileElements, userDataHandler) {
    this._profile = profileElements.profileContainer;
    this._name = profileElements.nameElement;
    this._about = profileElements.aboutElement;
    this._photo = profileElements.photoElement;
    this._handler = userDataHandler;
    this._handleUserData = this._handleUserData.bind(this);
  }

  _handleUserData(data) {
    this._handler(data);
  }

  getUserInfo() {
    this._handleUserData(this._data);
  }

  setUserInfo(userData) {
    this._name.textContent = userData.name;
    this._about.textContent = userData.about;
    this._profile.setAttribute('data-user-id', userData._id);
    this._profile.setAttribute('data-user-cohort', userData.cohort);
    this._photo.setAttribute('src', userData.avatar);
  }

  pickUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
    };
  }

  updateUserInfo() {
    this._handleUserData(data);
  }

  updateUserProfilePhoto(data) {
    this._photo.setAttribute('src', data);
  }
}
