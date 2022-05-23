const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const userName = document.querySelector('.profile__name');
const userInfo = document.querySelector('.profile__description');
const popupCloseButton = document.querySelector('.form__button_type_exit');
const nameFieldElement = document.querySelector('.form__item_el_name');
const infoFieldElement = document.querySelector('.form__item_el_description');
const formElement = document.querySelector('.form');

function openPopup() {
  popup.classList.add('popup_opened')
  nameFieldElement.value = userName.textContent;
  infoFieldElement.value = userInfo.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened')
}

function submitPopup(event) {
  event.preventDefault()
  userName.textContent = nameFieldElement.value;
  userInfo.textContent = infoFieldElement.value;
  closePopup()
}

editButton.addEventListener('click', openPopup)
popupCloseButton.addEventListener('click', closePopup)
formElement.addEventListener('submit', submitPopup)
