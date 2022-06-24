export default class UserInfo {
  constructor(profileElements) {
    this._profileElement = profileElements.profileElement;
    this._nameElement = profileElements.nameElement;
    this._aboutElement = profileElements.aboutElement;
    this._photoElement = profileElements.photoElement;
  }

  setUserInfo(userData) {
    this._userName = userData.name;
    this._userAbout = userData.about;

    this._nameElement.textContent = this._userName;
    this._aboutElement.textContent = this._userAbout;

    this._profileElement.setAttribute('data-user-id', userData._id);
    this._profileElement.setAttribute('data-user-cohort', userData.cohort);
    this._photoElement.setAttribute('src', userData.avatar);
  }

  getUserInfo() {
    return {
      name: this._userName,
      about: this._userAbout,
    };
  }

  updateUserProfilePhoto(link) {
    this._photoElement.setAttribute('src', link);
  }
}
