export default class UserInfo {
  constructor(
    { profileSelector, nameSelector, aboutSelector, profilePhotoSelector },
    userData,
  ) {
    // debugger;
    this._profileSelector = document.querySelector(profileSelector);
    this._nameSelector = document.querySelector(nameSelector);
    this._aboutSelector = document.querySelector(aboutSelector);
    this._photoSelector = document.querySelector(profilePhotoSelector);
    // this._userData = userData;
    // this._id = userData._id;
    // this._name = userData.name;
    // this._about = userData.abour;
    // this._photo = userData.photo;
    // this._cohort = userData.cohort;
    // debugger;
  }
  getUserInfo() {
    // get from the page the old way
  }

  setUserInfo(data) {
    data.then((user) => {
      const data = {
        _id: user._id,
        photo: user.avatar,
        name: user.name,
        about: user.about,
        cohort: user.cohort,
      };
      this._nameSelector.textContent = data.name;
      this._aboutSelector.textContent = data.about;
      this._profileSelector.setAttribute('data-user-id', data.id);
      this._profileSelector.setAttribute('data-user-cohort', data.cohort);
      this._photoSelector.setAttribute('src', data.photo);
      return data;
    });
  }

  setUserProfilePhoto(data) {
    this._photoSelector.setAttribute('src', data);
  }
}
