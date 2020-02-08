class PopupAvatar extends PopupEdit {
  constructor (popup) {
    super();

    this.popup = popup;

    this.avatarCallback = null;

    this.form = document.forms.avatar;
    this.avatar = this.form.elements.avatar;

    this.toggle = this.toggle.bind(this);
    this.changeAvatar = this.changeAvatar.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
  }

  handleAvatarCallback(fn) {
    this.avatarCallback = fn;
  }
  
  initialAvatarCallBack(link) {
    return typeof this.avatarCallback === "function" && this.avatarCallback(link);
  }

  toggle() {
    this.popup.classList.toggle("popup_is-opened");

    this.form.reset();

    this.popup.querySelector(".popup__button").setAttribute("disabled", true);
    this.popup.querySelector(".popup__button").classList.remove("popup__button_active");

    super.resetErrors();
  }

  changeAvatar(event) {
    event.preventDefault();
    
    this.renderLoading(true);
    this.initialAvatarCallBack(this.avatar.value)
      .finally(() => this.renderLoading(false));
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this.popup.querySelector(".popup__button").textContent = "Загрузка...";
    } else {
      this.popup.querySelector(".popup__button").textContent = "Сохранить";
      this.toggle(event);
    }
  }
}