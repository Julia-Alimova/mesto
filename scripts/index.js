const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const userName = document.querySelector('.profile__name');
const userInfo = document.querySelector('.profile__description');
const popupCloseButton = document.querySelector('.form__button_type_exit');
const nameFieldElement = document.querySelector('.form__item_el_name');
const infoFieldElement = document.querySelector('.form__item_el_description');
const formElement = document.querySelector('.form');

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened')
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened')
}

function submitPopup(popupElement) {
  userName.textContent = nameFieldElement.value;
  userInfo.textContent = infoFieldElement.value;
  closePopup(popup)
}

editButton.addEventListener('click', function () {
  openPopup(popup)
  nameFieldElement.value = userName.textContent;
  infoFieldElement.value = userInfo.textContent;
})

popupCloseButton.addEventListener('click', function () {
  closePopup(popup)
})

formElement.addEventListener('submit', function (event) {
  event.preventDefault()
  submitPopup(popup)
})
