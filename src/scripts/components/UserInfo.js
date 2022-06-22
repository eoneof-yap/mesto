export default class UserInfo {
  constructor(profileElements) {
    this._profile = profileElements.profileElement;
    this._name = profileElements.nameElement;
    this._about = profileElements.aboutElement;
    this._photo = profileElements.photoElement;
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
      id: this._profile.getAttribute('data-user-id'),
    };
  }

  updateUserProfilePhoto(link) {
    this._photo.setAttribute('src', link);
  }
}
