import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const userName = document.querySelector('.profile__name');                               // имя пользователя
const userInfo = document.querySelector('.profile__description');                        // описание
const buttonEdit = document.querySelector('.profile__edit-button');                      // кнопка редактирования
const buttonAdd = document.querySelector('.profile__add-button');                        // кнопка добавления

const sectionWithCards = document.querySelector('.cards');                               // место для карточек

const popups = document.querySelectorAll('.popup')                                       // попапы

const popupIsOpenClassName = 'popup_opened';

const popupAdd = document.querySelector('.popup_type_add');                              // Попап добавления
const formElementAdd = document.querySelector('.add-form');                              // форма добавления
const placeInputElement = popupAdd.querySelector('.form__item_el_place');                // инпут место
const linkInputElement = popupAdd.querySelector('.form__item_el_link');                  // инпут ссылка

const popupEdit = document.querySelector('.popup_type_edit');                            // попап редактирования
const formElementEdit = document.querySelector('.edit-form');                            // форма редактирования

const nameInputElement = document.querySelector('.form__item_el_name');                  // инпут имя
const infoInputlement = document.querySelector('.form__item_el_description');            // инпут описание

const imagePopup = document.querySelector('.popup_type_image');                          // попап с картинкой
const previewImage = imagePopup.querySelector('.popup__photo');                          // увеличенная картинка
const previewTitle = imagePopup.querySelector('.popup__title');                          // подпись к увеличенной картинке

const config = {
  sectionCards: '.cards',
  template: '.card',
  cardElement: '.card__element',
  image: '.card__photo',
  title: '.card__title',
  likeButton: '.card__like',
  deleteButton: '.card__delete'
}

const settings = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active'
}

// создание карточки
function createCard(name, link) {
  const card = new Card(config, '.card', name, link, openPreview);
  return card.generateCard(sectionWithCards)
}

// вывод карточек из массива
initialCards.reverse().forEach((item) => {
  createCard(item.name, item.link);
})

// добавление карточки из формы
function handleSubmit(evt) {
  evt.preventDefault();
  const elementName = placeInputElement.value;
  const elementLink = linkInputElement.value;
  createCard(elementName, elementLink);
  formElementAdd.reset();
  closePopup(popupAdd);
};

// открытие попапа с карточкой
function openPreview(name, link) {
  previewImage.src = link;
  previewImage.alt = name;
  previewTitle.textContent = name;
  openPopup(imagePopup);
};

// Открытие попапов
function openPopup(poupElement) {
  poupElement.classList.add('popup_opened')
  document.addEventListener('keydown', closeByEscape);
};

// Закрытие попапов
function closePopup() {
  const poupElement = document.querySelector('.' + popupIsOpenClassName)
  document.removeEventListener('keydown', closeByEscape);
  poupElement.classList.remove('popup_opened')
};

// закрытие всех попапов через перебор массива
popups.forEach((popupElement) => {
  popupElement.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popupElement);
    }
    if (evt.target.classList.contains('exit-button')) {
      closePopup(popupElement);
    }
  })
})

// Сабмит формы редактирования
function submitPopup(evt) {
  evt.preventDefault()
  userName.textContent = nameInputElement.value;
  userInfo.textContent = infoInputlement.value;
  closePopup()
};

// Функция, которая закрывает попап если клик снаружи
function detectClickOutside(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup()
  }
};

// Функция, которая закрывает попап по клику на esc
function closeByEscape(evt) {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    closePopup()
  }
};

// открытие формы редактирования
buttonEdit.addEventListener('click', () => {
  openPopup(popupEdit);
  nameInputElement.value = userName.textContent;
  infoInputlement.value = userInfo.textContent;
  formEditValidator.clearErrors();
});

// открытие формы добавления
buttonAdd.addEventListener('click', () => {
  formElementAdd.reset()
  openPopup(popupAdd);
  formAddValidator.clearErrors();
});

// Закрытие попапа по клику снаружи
document.body.addEventListener('click', function (evt) {
  detectClickOutside(evt)
});

// сабмит формы редактирования
formElementEdit.addEventListener('submit', submitPopup);

// сабмит формы добавления
formElementAdd.addEventListener('submit', handleSubmit);

  const formAddValidator = new FormValidator(settings, formElementAdd);
  formAddValidator.enableValidation();
  const formEditValidator = new FormValidator(settings, formElementEdit);
  formEditValidator.enableValidation();
