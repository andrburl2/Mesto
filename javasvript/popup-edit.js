class PopupEdit {
  constructor(popup, openButton) {
    this.popup = popup;
    this.openButton = openButton;

    this.changeCallback = null;
    
    this.form = document.forms.edit;
    this.editName = this.form.elements.editName;
    this.description = this.form.elements.description; 

    this.toggle = this.toggle.bind(this);
    this.editProfile = this.editProfile.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
  }

  handleChangeCallback(fn) {
    this.changeCallback = fn;
  }
  
  initialChangeCallBack(name, about) {
    return typeof this.changeCallback === "function" && this.changeCallback(name, about);
  }

  toggle() {
    this.popup.classList.toggle("popup_is-opened");

    this.editName.value = nameInfo.textContent;
    this.description.value = info.textContent;
    
    this.popup.querySelector(".popup__button_type_save").removeAttribute("disabled");
    this.popup.querySelector(".popup__button_type_save").classList.add("popup__button_active");
    
    this.resetErrors();
  }

  editProfile(event) {  
    event.preventDefault();

    this.renderLoading(true);
    this.initialChangeCallBack(this.editName.value, this.description.value)
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

  resetErrors() {
    const errors = document.querySelectorAll(".popup__error");
    errors.forEach( (element) => {element.textContent = ""});
  }
}