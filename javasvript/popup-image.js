class PopupImage {
  constructor (popup) {
    this.popup = popup;

    this.toggle = this.toggle.bind(this);
    this.changeImage = this.changeImage.bind(this);
  }

  toggle() {
      this.popup.classList.toggle("popup-image__is-openned");
  }
  
  changeImage(link) {
    this.popup.querySelector(".popup-image__img").src = link;
    this.toggle();
  }
}