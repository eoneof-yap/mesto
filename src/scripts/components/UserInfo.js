export default class UserInfo {
  constructor({ profileElement, nameElement, aboutElement, photoElement }, userData) {
    // debugger;
    this._profile = profileElement;
    this._name = nameElement;
    this._about = aboutElement;
    this._photo = photoElement;
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
      this._name.textContent = data.name;
      this._about.textContent = data.about;
      this._profile.setAttribute('data-user-id', data.id);
      this._profile.setAttribute('data-user-cohort', data.cohort);
      this._photo.setAttribute('src', data.photo);
      return data;
    });
  }

  setUserProfilePhoto(data) {
    this._photo.setAttribute('src', data);
  }
}
