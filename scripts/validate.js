const dataElement = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active'
}

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach(function (formElement) {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    })
    setEventListener(formElement);
  })
};

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__item_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__item-error_active');
  console.log(123);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__item_type_error');
  errorElement.classList.remove('form__item-error_active');
  errorElement.textContent = '';
  console.log(321);
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
    console.log(456);
  }
};

// Функция, которая добавляет слушатель
const setEventListener = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__item'));
  const buttonElement = formElement.querySelector('.form__submit');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach(function (inputElement) {
    inputElement.addEventListener('input', function () {
      isValid(formElement, inputElement)
      toggleButtonState(inputList, buttonElement);
    })
  })
};

// Функция, которая находит невалидное поле
const hasInvalidInput = (inputList) => {
  return inputList.some(function (inputElement) {
    return !inputElement.validity.valid;
  })
};

// Функция, которая переключает кнопку
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('form__submit_inactive');
    setDisableBtn(buttonElement);
  } else {
    buttonElement.classList.remove('form__submit_inactive');
    removeDisabledBtn(buttonElement);
  }
}

// Функция, которая делает неактивной кнопку
const setDisableBtn = (btn) => {
  btn.setAttribute('disabled', true)
}

// Функция, которая делает кнопку автивной
const removeDisabledBtn = (btn) => {
  btn.removeAttribute('disabled')
}

enableValidation();


