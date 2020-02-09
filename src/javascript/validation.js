export default class Validation {
  constructor() {
    this.validityForm = this.validityForm.bind(this);
  }

  validityInput(event) {
    const error = document.querySelector(`.popup__error_${event.target.name}`);
    /* Можно лучше: удалите else а внутри условия добавьте return
     например было: 
     if(условие){  
       // ваш код 
     } else if(условие2){ 
       // ваш код 
     } 
     стало : 
     if(условие){  
         // ваш код 
      return; 
    } 
   
     if(условие2){ 
      // ваш код 
      return; 
    } 
    UPD: Исправлено.
  */
    if (event.target.validity.valueMissing) {
      return error.textContent = "Это обязательное поле";
    } 
    if (event.target.validity.tooShort) {
      return error.textContent = "Должно быть от 2 до 30 символов";
    }
    if (event.target.validity.typeMismatch && event.target.type === "url") {
      return error.textContent = "Здесь должна быть ссылка";
    }
    return error.textContent = "";
  }

  toggleButton(event) {
    const inputs = Array.from(event.target.parentElement.querySelectorAll(".popup__input"));
    const button = event.target.parentElement.querySelector(".popup__button");

    if (inputs.every((elem) => elem.checkValidity())) {
      button.removeAttribute("disabled");
      button.classList.add("popup__button_active");
    } else {
      button.setAttribute("disabled", true);
      button.classList.remove("popup__button_active");
    }
  }

  validityForm(event) {
    event.preventDefault();

    this.validityInput(event);
    this.toggleButton(event);
  }
}