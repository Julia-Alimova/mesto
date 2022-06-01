// массив с карточками
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const userName = document.querySelector('.profile__name');                               // имя пользователя
const userInfo = document.querySelector('.profile__description');                        // описание
const editButton = document.querySelector('.profile__edit-button');                      // кнопка редактирования
const addButton = document.querySelector('.profile__add-button');                        // кнопка добавления

const cards = document.querySelector('.cards');                                          // место для карточек
const cardTemplateElement = document.querySelector('.card').content;                     // темплейт
const deleteButton = document.querySelector('.card__delete');                            // кнопка удаления ?????
const getCardByEvent = evt => evt.currentTarget.closest('.card__element');

const addPopup = document.querySelector('.popup_type_add');                              // Попап добавления
const addFormElement = document.querySelector('.add-form');                              // форма добавления
const placeInputElement = addPopup.querySelector('.form__item_el_place');                 // инпут место
const linkInputElement = addPopup.querySelector('.form__item_el_link');                  // инпут ссылка
const addPopupCloseButton = addPopup.querySelector('.form__button_type_exit');            // крестик форма добавления

const editPopup = document.querySelector('.popup_type_edit');                            // попап редактирования
const editFormElement = document.querySelector('.edit-form');                            // форма редактирования

const nameInputElement = document.querySelector('.form__item_el_name');                  // инпут имя
const infoInputlement = document.querySelector('.form__item_el_description');            // инпут описание
const editPopupCloseButton = editPopup.querySelector('.form__button_type_exit');         // крестик форма редактирования

// перебор элементов массива, добавление на страницу
initialCards.forEach(function (element) {
  const cardElement = cardTemplateElement
  .querySelector('.card__element')
  .cloneNode(true);
  cardElement.querySelector('.card__photo').src = element.link;
  cardElement.querySelector('.card__title').textContent = element.name;
  like(cardElement);
  cards.append(cardElement);
  addCardListener(cardElement);
});

// Добавление карточки
function addCard(elementName, elementLink) {
  const cardElement = cardTemplateElement.querySelector('.card__element').cloneNode(true);
  cardElement.querySelector('.card__photo').src = elementLink;
  cardElement.querySelector('.card__title').textContent = elementName;
  like(cardElement);
  cards.prepend(cardElement);
  addCardListener(cardElement);
};

// Добавление карточки с введенными в формы данными
function handleSubmit(evt) {
  evt.preventDefault();
  elementLink = linkInputElement.value;
  elementName = placeInputElement.value;
  addCard(elementName, elementLink);
  addFormElement.reset();
  closePopup(addPopup);
};

// лайк
function like(cardElement) {
  cardElement.querySelector('.card__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like_type_active');
  })
}

// Удаление карточки
function deleteCard (evt) {
  const cardElement = getCardByEvent(evt)
  cardElement.remove();
}

// Добавление слушателя события на удаление
function addCardListener(cardElement) {
  cardElement.querySelector('.card__delete').addEventListener('click', deleteCard);
};

// Открытие попапов
function openPopup(poupElement) {
  poupElement.classList.add('popup_opened')
};

// Закрытие попапов
function closePopup(poupElement) {
  poupElement.classList.remove('popup_opened')
};

// Сабмит формы редактирования
function submitPopup(evt) {
  evt.preventDefault()
  userName.textContent = nameInputElement.value;
  userInfo.textContent = infoInputlement.value;
  closePopup(editPopup)
};

// открытие формы редактирования
editButton.addEventListener('click', () => {
  openPopup(editPopup);
  nameInputElement.value = userName.textContent;
  infoInputlement.value = userInfo.textContent;
});

// открытие формы добавления
addButton.addEventListener('click', () => {
  openPopup(addPopup);
});

// закрытие формы редактирования
editPopupCloseButton.addEventListener('click', () => {
  closePopup(editPopup)
});

// закрытие формы добавления
addPopupCloseButton.addEventListener('click', () => {
  closePopup(addPopup)
});

// сабмит формы редактирования
editFormElement.addEventListener('submit', submitPopup);

// сабмит формы добавления
addFormElement.addEventListener('submit', handleSubmit);
