export default class UserInfo {
  constructor(
    { profileSelector, nameSelector, aboutSelector, profilePhotoSelector },
    { userData },
    userDataHandler,
  ) {
    this._profileElement = document.querySelector(profileSelector);
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._photoElement = document.querySelector(profilePhotoSelector);
    this._userData = userData;
    // this._id = userData.id;
    // this._name = userData.name;
    // this._about = userData.about;
    // this._photo = userData.photo;
    // this._cohort = userData.cohort;
    this._userDataHandler = userDataHandler;
    this._handleUserData = this._handleUserData.bind(this);
  }

  _handleUserData(data) {
    this._userDataHandler(data);
  }

  getUserInfo() {
    this._handleUserData(this._userData);
  }

  setUserInfo() {
    console.log('👉this._userData:', this._userData.name);
    this._nameElement.textContent = this._userData.name;
    this._aboutElement.textContent = this._userData.about;
    this._profileElement.setAttribute('data-user-id', this._userData._id);
    this._profileElement.setAttribute('data-user-cohort', this._userData.cohort);
    this._photoElement.setAttribute('src', this._userData.photo);
    // return this._userData;
  }

  pickUserInfo() {
    const userInfo = {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
    };
    return userInfo;
  }

  updateUserInfo() {
    this._handleUserData(data);
  }

  updateUserProfilePhoto(data) {
    this._photoElement.setAttribute('src', data);
  }
}
