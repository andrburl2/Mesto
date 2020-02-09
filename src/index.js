import "./index.css";
import Api from "./javascript/api";
import CardList from "./javascript/card-list";
import Card from "./javascript/card";
import PopupEdit from "./javascript/popup-edit";
import PopupAvatar from "./javascript/popup-avatar";
import PopupImage from "./javascript/popup-image";
import PopupNew from "./javascript/popup-new";
import Validation from "./javascript/validation";


const nameInfo = document.querySelector(".user-info__name");
const info = document.querySelector(".user-info__job");
const avatar = document.querySelector(".user-info__photo");

const cardList = new CardList(document.querySelector(".places-list"));

const api = new Api({adress: NODE_ENV === "development"?"http://praktikum.tk":"https://praktikum.tk", token: "f0c09423-d4a2-4b93-afdb-8736ed815dec", groupId: "cohort6"});

const popupEdit = new PopupEdit(document.querySelector(".popup-edit"), document.querySelector(".user-info__button_type_edit"), document.querySelector(".popup-edit__name-target"), document.querySelector(".popup-edit__info-target"));
const popupNew = new PopupNew(document.querySelector(".popup-new"), document.querySelector(".user-info__button_type_add"));
const popupImage = new PopupImage(document.querySelector(".popup-image"));
const popupAvatar = new PopupAvatar(document.querySelector(".popup-avatar"));

const validation = new Validation;


function changeUserInfo(name, description, link) {
  nameInfo.textContent = name;
  info.textContent = description;
  avatar.style.backgroundImage = link;
}

// Создание карточек и добавление функции создания новых
cardList.handleCard((cardData) => {
  const card = new Card(cardData, "219180ad7f666367f7dd3e0c");

  card.handleOpenCallback(popupImage.changeImage);
  card.handleDeleteCallback(api.deleteCard);

  return card.create();
});

// Передача апи функций создания карточек
api.handleRenderCallback(cardList.render);
api.handleCreateCallback(cardList.addCard);
api.handleChangeCallback(changeUserInfo);

// Передача попапам функций апи
popupEdit.handleChangeCallback(api.changeProfile);
popupNew.handleCreateCallback(api.createCard);
popupAvatar.handleAvatarCallback(api.changeAvatar);

// Обработчики формы редактирования профиля
popupEdit.openButton.addEventListener("click", popupEdit.toggle);
popupEdit.popup.querySelector(".popup__close").addEventListener("click", popupEdit.toggle);
popupEdit.form.addEventListener("submit", popupEdit.editProfile);
popupEdit.form.addEventListener("input", validation.validityForm);

// Обработчики формы добавления карточки
popupNew.openButton.addEventListener("click", popupNew.toggle);
popupNew.popup.querySelector(".popup__close").addEventListener("click", popupNew.toggle);
popupNew.form.addEventListener("submit", popupNew.addCard);
popupNew.form.addEventListener("input", validation.validityForm);

// Обработчики формы смены аватара
avatar.addEventListener("click", popupAvatar.toggle);
popupAvatar.popup.querySelector(".popup__close").addEventListener("click", popupAvatar.toggle);
popupAvatar.form.addEventListener("submit", popupAvatar.changeAvatar);
popupAvatar.form.addEventListener("input", validation.validityForm);

popupImage.popup.querySelector(".popup-image__close").addEventListener("click", popupImage.toggle);

api.getCards();
api.updateProfile();