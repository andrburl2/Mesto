export default class Card {
  constructor(cardData, cardOwnerMe) {
    this.cardData = cardData;
    this.cardOwnerMe = cardOwnerMe;

    this.openCallback = null;
    this.deleteCallback = null;

    this._element = null;

    this._remove = this._remove.bind(this);
    this._openImage = this._openImage.bind(this);
  }

  handleOpenCallback(fn) {
    this.openCallback = fn;
  }
  
  initialOpenCallBack(link) {
    return typeof this.openCallback === "function" && this.openCallback(link);
  }

  handleDeleteCallback(fn) {
    this.deleteCallback = fn;
  }
  
  initialDeleteCallback(id) {
    return typeof this.deleteCallback === "function" && this.deleteCallback(id);
  }

  create() {
    let template = `
    <div class="place-card">
            <div class="place-card__image" style="background-image: url();">
            </div>
            <div class="place-card__description">
                <h3 class="place-card__name"></h3>
                <button class="place-card__like-icon"></button>
            </div>
    </div>
    `.trim();

    let createNewTag = document.createElement("div");
    createNewTag.insertAdjacentHTML("beforeend", template);
    this._element = createNewTag.firstChild;

    this._element.querySelector(".place-card__image").style.backgroundImage = `url(${this.cardData.link})`;
    this._element.querySelector(".place-card__name").textContent = this.cardData.name;
    // можно лучше. ключ лучше убрать в отдельный файл, так правильнее
    // UPD: исправлено везде.
    if (this.cardData.owner._id === this.cardOwnerMe) {
      let deleteButton = `<button class="place-card__delete-icon"></button>`;
      this._element.querySelector(".place-card__image").insertAdjacentHTML("beforeend", deleteButton);
    }

    this._setEventListeners();
    return this._element;
  }

  _openImage() {
    this.initialOpenCallBack(this.cardData.link);
  }

  _like() {
    this.classList.toggle("place-card__like-icon_liked");
  }

  _remove() {
    if (window.confirm("Вы действительно хотите удалить эту карточку?")) {
      this._removeEventListeners();

      this.initialDeleteCallback(this.cardData._id);

      this._element.remove();
    } else {
      this._openImage();
    }
  }

  _setEventListeners() {
    // можно лучше. ключ лучше убрать в отдельный файл, так правильнее
    if (this.cardData.owner._id === this.cardOwnerMe) {
      this._element.querySelector(".place-card__delete-icon").addEventListener("click", this._remove);
    }
    this._element.querySelector(".place-card__like-icon").addEventListener("click", this._like);
    this._element.querySelector(".place-card__image").addEventListener("click", this._openImage);
  }

  _removeEventListeners() {
    // можно лучше. ключ лучше убрать в отдельный файл, так правильнее
    if (this.cardData.owner._id === this.cardOwnerMe) {
      this._element.querySelector(".place-card__delete-icon").removeEventListener("click", this._remove);
    }
    this._element.querySelector(".place-card__like-icon").removeEventListener("click", this._like);
    this._element.querySelector(".place-card__image").removeEventListener("click", this._openImage);
  }
}