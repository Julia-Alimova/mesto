const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const userName = document.querySelector('.profile__name');
const userInfo = document.querySelector('.profile__description');
const popupCloseButton = document.querySelector('.form__button_type_exit');
const nameFieldElement = document.querySelector('.form__item_el_name');
const infoFieldElement = document.querySelector('.form__item_el_description');
const formElement = document.querySelector('.form');


editButton.addEventListener('click', function () {
  popup.classList.add('popup_opened')
  nameFieldElement.value = userName.textContent;
  infoFieldElement.value = userInfo.textContent;
})

popupCloseButton.addEventListener('click', function () {
  popup.classList.remove('popup_opened')
})

formElement.addEventListener('submit', function (event) {
  event.preventDefault()
  userName.textContent = nameFieldElement.value;
  userInfo.textContent = infoFieldElement.value;
  popup.classList.remove('popup_opened')
})
