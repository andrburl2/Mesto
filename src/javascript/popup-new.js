export default class PopupNew{
  constructor(popup, openButton) {

    this.popup = popup;
    this.openButton = openButton;

    this.createCallback = null;
       
    this.form = document.forms.new;
    this.newName = this.form.elements.newName;
    this.link = this.form.elements.link;
    
    this.toggle = this.toggle.bind(this);
    this.addCard = this.addCard.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
  }

  handleCreateCallback(fn) {
    this.createCallback = fn;
  }
  
  initialCreateCallBack(name, link) {
    return typeof this.createCallback === "function" && this.createCallback(name, link);
  }

  toggle() {
    this.popup.classList.toggle("popup_is-opened");

    this.form.reset();

    this.popup.querySelector(".popup__button_type_add").setAttribute("disabled", true);
    this.popup.querySelector(".popup__button_type_add").classList.remove("popup__button_active");

    this.resetErrors();
  }

  addCard(event) {
    event.preventDefault();
    
    this.renderLoading(true);
    this.initialCreateCallBack(this.newName.value, this.link.value)
      .finally(() => this.renderLoading(false));
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this.popup.querySelector(".popup__button_type_add").textContent = "Загрузка...";
    } else {
      this.popup.querySelector(".popup__button_type_add").textContent = "+";
      this.toggle();
    }
  }

  resetErrors() {
    const errors = document.querySelectorAll(".popup__error");
    errors.forEach( (element) => {element.textContent = ""});
  }
}