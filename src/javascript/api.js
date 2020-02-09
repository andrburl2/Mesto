export default class Api {
  constructor({ adress, token, groupId }) {
    this.adress = adress;
    this.token = token;
    this.groupId = groupId;

    this.renderCallback = null;
    this.createCallback = null;
    this.changeCallback = null;

    this.updateProfile = this.updateProfile.bind(this);
    this.getCards = this.getCards.bind(this);
    this.changeProfile = this.changeProfile.bind(this);
    this.createCard = this.createCard.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.changeAvatar = this.changeAvatar.bind(this);
  }

  handleRenderCallback(fn) {
    this.renderCallback = fn;
  }
  
  initialRenderCallBack(array) {
    return typeof this.renderCallback === "function" && this.renderCallback(array);
  }

  handleCreateCallback(fn) {
    this.createCallback = fn;
  }
  
  initialCreateCallBack(cardData) {
    return typeof this.createCallback === "function" && this.createCallback(cardData);
  }

  handleChangeCallback(fn) {
    this.changeCallback = fn;
  }
  
  initialChangeCallBack(name, description, avatar) {
    return typeof this.changeCallback === "function" && this.changeCallback(name, description, avatar);
  }

  updateProfile() {
    fetch(`${this.adress}/${this.groupId}/users/me`, {
      headers: {
        authorization: this.token
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        this.initialChangeCallBack(result.name, result.about, `url(${result.avatar})`);
      })
      .catch((result) => {
        console.log(`Не получилось загрузить профиль. ${result}`);
      })
  }

  getCards() {
    fetch(`${this.adress}/${this.groupId}/cards`, {
      headers: {
        authorization: this.token
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        this.initialRenderCallBack(result);
      })
      .catch((result) => {
        console.log(`Не получилось загрузить карточки. ${result}`);
      })
  }

  changeProfile(name, about) {
    return fetch(`${this.adress}/${this.groupId}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(() => {
        this.updateProfile();
      })
      .catch((result) => {
        console.log(`Не получилось обновить профиль. ${result}`);
      })
  }

  createCard(name, link) {
    return fetch(`${this.adress}/${this.groupId}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        this.initialCreateCallBack(result);
      })
      .catch((result) => {
        console.log(`Не получилось создать новую карточку. ${result}`);
      })
  }

  deleteCard(id) {
    fetch(`${this.adress}/${this.groupId}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((result) => {
        console.log(`Не получилось удалить карточку. ${result}`);
      })
  }

  changeAvatar(link) {
    return fetch(`${this.adress}/${this.groupId}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(() => {
        this.updateProfile();
      })
      .catch((result) => {
        console.log(`Не получилось обновить аватар. ${result}`);
      })
  }
}