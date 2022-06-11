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
    this._userData = userData;
    // this._id = userData._id;
    // this._name = userData.name;
    // this._about = userData.abour;
    // this._photo = userData.photo;
    // this._cohort = userData.cohort;
    // debugger;
  }
  getUserInfo() {
    this._userData.then((user) => {
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
    // this._userData
    //   .then((user) => {
    //     const data = {
    //       _id: user._id,
    //       photo: user.avatar,
    //       name: user.name,
    //       about: user.about,
    //       cohort: user.cohort,
    //     };
    //     return data;
    //   })
    //   .catch((err) => alert(err));
    // const userInfo = {
    //   id: this._id,
    //   name: this._name,
    //   about: this._about,
    //   photo: this._photo,
    //   cohort: this._cohort,
    // };
    // return userInfo;
    // => index.js => hanldeEditButton() => PopupWithForm.setInputvalues()
  }

  setUserInfo({ id, name, about, photo, cohort }) {
    // from form to page
    this._nameSelector.textContent = name;
    this._aboutSelector.textContent = about;
    this._profileSelector.setAttribute('data-user-id', id);
    this._profileSelector.setAttribute('data-user-cohort', cohort);
    this._photoSelector.setAttribute('src', photo);
  }

  setUserProfilePhoto({ link }) {
    // TODO перевести на API
    this._photoSelector.setAttribute('src', photo);
  }
}
