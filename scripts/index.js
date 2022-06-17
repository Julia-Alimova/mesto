const userName = document.querySelector('.profile__name');                               // имя пользователя
const userInfo = document.querySelector('.profile__description');                        // описание
const buttonEdit = document.querySelector('.profile__edit-button');                      // кнопка редактирования
const buttonAdd = document.querySelector('.profile__add-button');                        // кнопка добавления

const cards = document.querySelector('.cards');                                          // место для карточек

const cardTemplateElement = document.querySelector('.card').content.querySelector('.card__element'); // темплейт

const popupIsOpenClassName = 'popup_opened';

const popupAdd = document.querySelector('.popup_type_add');                              // Попап добавления
const formElementAdd = document.querySelector('.add-form');                              // форма добавления
const placeInputElement = popupAdd.querySelector('.form__item_el_place');                // инпут место
const linkInputElement = popupAdd.querySelector('.form__item_el_link');                  // инпут ссылка
const popupAddCloseButton = popupAdd.querySelector('.form__exit');                       // крестик форма добавления

const popupEdit = document.querySelector('.popup_type_edit');                            // попап редактирования
const formElementEdit = document.querySelector('.edit-form');                            // форма редактирования

const nameInputElement = document.querySelector('.form__item_el_name');                  // инпут имя
const infoInputlement = document.querySelector('.form__item_el_description');            // инпут описание
const popupEditCloseButton = popupEdit.querySelector('.form__exit');                     // крестик форма редактирования

const imagePopup = document.querySelector('.popup_type_image');                          // попап с картинкой
const imagePopupCloseButton = imagePopup.querySelector('.popup__button');                // крестик попап с картинкой
const previewImage = imagePopup.querySelector('.popup__photo');                          // увеличенная картинка
const previewTitle = imagePopup.querySelector('.popup__title');                          // подпись к увеличенной картинке

const getCardByEvent = evt => evt.currentTarget.closest('.card__element');

// создание карточки по ссылке и имени
function createCard(name, link) {
  const cardElement = cardTemplateElement.cloneNode(true); // карточка
  const deleteItem = cardElement.querySelector('.card__delete');
  const likeItem = cardElement.querySelector('.card__photo');
  const photoItem = cardElement.querySelector('.card__like');
  cardElement.querySelector('.card__photo').src = link;
  cardElement.querySelector('.card__photo').alt = name;
  cardElement.querySelector('.card__title').textContent = name;
  addCardListener(deleteItem, likeItem, photoItem);
  return cardElement;
};

// добавить карточку в конец
function renderCard(name, link) {
  const card = createCard(name, link);
  cards.prepend(card);
};

// перебор элементов массива, добавление на страницу
initialCards.reverse().forEach(function (element) {
  renderCard(element.name, element.link);
});


// Добавление карточки с введенными в формы данными
function handleSubmit(evt) {
  evt.preventDefault();
  elementLink = linkInputElement.value;
  elementName = placeInputElement.value;
  renderCard(elementName, elementLink);
  formElementAdd.reset();
  closePopup(popupAdd);
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
  document.addEventListener('keydown', keyHandler);
};

// Закрытие попапов
function closePopup() {
  const poupElement = document.querySelector('.' + popupIsOpenClassName)
  poupElement.classList.remove('popup_opened')
};

// Сабмит формы редактирования
function submitPopup(evt) {
  evt.preventDefault()
  userName.textContent = nameInputElement.value;
  userInfo.textContent = infoInputlement.value;
  closePopup(popupEdit)
};

// Добавление слушателя события на удаление, открытие картинки, лайк
function addCardListener(deleteItem, photoItem, likeItem) {
  deleteItem.addEventListener('click', deleteCard);
  photoItem.addEventListener('click', openCard);
  likeItem.addEventListener('click', like);
};

// Функция, которая закрывает попап если клик снаружи
function detectClickOutside (evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup()
}
};

// Функция, которая закрывает попап по клику на esc
function keyHandler(evt) {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    closePopup()
  }
};

// открытие формы редактирования
buttonEdit.addEventListener('click', () => {
  openPopup(popupEdit);
  nameInputElement.value = userName.textContent;
  infoInputlement.value = userInfo.textContent;
  removeDisabledBtn(popupEdit.querySelector('.form__submit'));
});

// открытие формы добавления
buttonAdd.addEventListener('click', () => {
  openPopup(popupAdd);
});

// закрытие формы редактирования
popupEditCloseButton.addEventListener('click', () => {
  closePopup(popupEdit)
});

// закрытие формы добавления
popupAddCloseButton.addEventListener('click', () => {
  closePopup(popupAdd)
});

// закрытие попапа с картинкой
imagePopupCloseButton.addEventListener('click', () => {
  closePopup(imagePopup)
});

// Закрытие попапа по клику снаружи
document.body.addEventListener('click', function (evt) {
  detectClickOutside(evt)
  });

// сабмит формы редактирования
formElementEdit.addEventListener('submit', submitPopup);

// сабмит формы добавления
formElementAdd.addEventListener('submit', handleSubmit);
