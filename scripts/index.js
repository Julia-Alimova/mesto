// Карточки
const cards = document.querySelector('.cards');
const cardContent = document.querySelector('.card').content;

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

initialCards.forEach(function(element) {
  const cardElement = cardContent.cloneNode(true);
  cardElement.querySelector('.card__photo').src = element.link;
  cardElement.querySelector('.card__title').textContent = element.name;
  cards.append(cardElement)
});


const editButton = document.querySelector('.profile__edit-button');                       // Форма редактирования
const editPopup = document.querySelector('.popup_type_edit');
const userName = document.querySelector('.profile__name');
const userInfo = document.querySelector('.profile__description');
const editPopupCloseButton = editPopup.querySelector('.form__button_type_exit');
const nameFieldElement = document.querySelector('.form__item_el_name');
const infoFieldElement = document.querySelector('.form__item_el_description');
const editFormElement = document.querySelector('.edit-form');
const addPopup = document.querySelector('.popup_type_add');                              // Форма добавления
const addButton = document.querySelector('.profile__add-button');
const addPopupCloseButton = addPopup.querySelector('.form__button_type_exit')
const addFormElement = document.querySelector('.add-form')

// Открытие попапов
function openPopup(poupElement) {
  poupElement.classList.add('popup_opened')
}

editButton.addEventListener('click', () => {
  openPopup(editPopup);
  nameFieldElement.value = userName.textContent;
  infoFieldElement.value = userInfo.textContent;
});

addButton.addEventListener('click', () => {
  openPopup(addPopup);
});

// Закрытие попапов

function closePopup(poupElement) {
  poupElement.classList.remove('popup_opened')
}

editPopupCloseButton.addEventListener('click', () => {
  closePopup(editPopup)
});

addPopupCloseButton.addEventListener('click', () => {
  closePopup(addPopup)
})

// Сабмиты
function submitPopup(evt) {
  evt.preventDefault()
}

editFormElement.addEventListener('submit', () => {
  submitPopup
  userName.textContent = nameFieldElement.value;
  userInfo.textContent = infoFieldElement.value;
  closePopup(editPopup)
});

// Сабмит для второй формы - нужен?

editFormElement.addEventListener('submit', () => {
  submitPopup
  closePopup(addPopup)
});
