const userName = document.querySelector('.profile__name');                               // имя пользователя
const userInfo = document.querySelector('.profile__description');                        // описание
const editButton = document.querySelector('.profile__edit-button');                      // кнопка редактирования
const addButton = document.querySelector('.profile__add-button');                        // кнопка добавления

const cards = document.querySelector('.cards');                                          // место для карточек

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

const imagePopup = document.querySelector('.popup_type_image');                          // попап с картинкой
const imagePopupCloseButton = imagePopup.querySelector('.popup__button');                // крестик попап с картинкой
const previewImage = imagePopup.querySelector('.popup__photo');                          // увеличенная картинка
const previewTitle = imagePopup.querySelector('.popup__title');                          // подпись к увеличенной картинке

const getCardByEvent = evt => evt.currentTarget.closest('.card__element');

// создание карточки по ссылке и имени
function createCard(name, link) {
  const cardTemplateElement = document.querySelector('.card').content;                     // темплейт
  const cardElement = cardTemplateElement.querySelector('.card__element').cloneNode(true); // карточка
  const deleteItem = cardElement.querySelector('.card__delete');
  const likeItem = cardElement.querySelector('.card__photo');
  const photoItem = cardElement.querySelector('.card__like');
  cardElement.querySelector('.card__photo').src = link;
  cardElement.querySelector('.card__title').textContent = name;
  addCardListener(deleteItem, likeItem, photoItem);
  cards.append(cardElement);
  return cardElement;
};

// добавить карточку в начало
function addCard(name, link) {
  const card = createCard(name, link);
  cards.prepend(card);
};

// перебор элементов массива, добавление на страницу
initialCards.forEach(function (element) {
  createCard(element.name, element.link);
});


// Добавление карточки с введенными в формы данными
function handleSubmit(evt) {
  evt.preventDefault();
  elementLink = linkInputElement.value;
  elementName = placeInputElement.value;
  addCard(elementName, elementLink);
  addFormElement.reset();
  closePopup(addPopup);
};

// открытие попапа с карточкой
function openCard(evt) {
  const cardItem = getCardByEvent(evt);
  const duplicateCard = cardItem.cloneNode(true);
  previewImage.src = duplicateCard.querySelector('.card__photo').src;
  previewImage.alt = duplicateCard.querySelector('.card__title').textContent;
  previewTitle.textContent = duplicateCard.querySelector('.card__title').textContent;
  openPopup(imagePopup);
};

// лайк
function like(evt) {
  evt.target.classList.toggle('card__like_type_active');
};

// Удаление карточки
function deleteCard(evt) {
  const cardElement = getCardByEvent(evt)
  cardElement.remove();
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

// Добавление слушателя события на удаление, открытие картинки, лайк
function addCardListener(deleteItem, photoItem, likeItem) {
  deleteItem.addEventListener('click', deleteCard);
  photoItem.addEventListener('click', openCard);
  likeItem.addEventListener('click', like);
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

// закрытие попапа с картинкой
imagePopupCloseButton.addEventListener('click', () => {
  closePopup(imagePopup)
});

// сабмит формы редактирования
editFormElement.addEventListener('submit', submitPopup);

// сабмит формы добавления
addFormElement.addEventListener('submit', handleSubmit);
