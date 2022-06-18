const settings = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active'
}

// включение валидации
const enableValidation = ({formSelector, ...rest}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach(function (formElement) {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    })
    setEventListener(formElement, settings);
  })
};

// создание массива инпутов
function makeArr (el) {
  const inputsArray = Array.from(el.querySelectorAll(settings.inputSelector));
  return inputsArray
}

// Функция, которая добавляет слушатель
const setEventListener = (formElement, settings) => {
  const inputList = makeArr(formElement);
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, settings);
  inputList.forEach(function (inputElement) {
    inputElement.addEventListener('input', function () {
      isValid(formElement, inputElement)
      toggleButtonState(inputList, buttonElement, settings);
    })
  })
};

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};


// Функция, которая находит невалидное поле
const hasInvalidInput = (inputList) => {
  return inputList.some(function (inputElement) {
    return !inputElement.validity.valid;
  })
};

// Функция, которая делает неактивной кнопку
const setDisabledBtn = (btn) => {
  btn.setAttribute('disabled', true)
  btn.classList.add(settings.inactiveButtonClass);
}

// Функция, которая делает кнопку автивной
const removeDisabledBtn = (btn) => {
  btn.removeAttribute('disabled')
  btn.classList.remove(settings.inactiveButtonClass);
}

// Функция, которая переключает кнопку
const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    setDisabledBtn(buttonElement);
  } else {
    removeDisabledBtn(buttonElement);
  }
}

// Функция, которая убирает ошибки
const clearErrors = (formElement, settings) => {
  makeArr(formElement).forEach(function (inputlement) {
    hideInputError(formElement, inputlement, settings)
  })
}

enableValidation(settings);
