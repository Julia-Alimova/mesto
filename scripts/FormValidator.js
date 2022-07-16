class FormValidator {
  constructor(settings, formElement) {
    this._formElement = formElement;
    this._inputsList = Array.from(this._formElement.querySelectorAll(settings.inputSelector));
    this._submitButton = this._formElement.querySelector(settings.submitButtonSelector);
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
  }

  _setEventListener() {
    const inputList = this._inputsList;
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      })
    })
  }

  // Функция, которая добавляет класс с ошибкой
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  // Функция, которая удаляет класс с ошибкой
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  // Функция, которая проверяет валидность поля
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };


  // Функция, которая находит невалидное поле
  _hasInvalidInput() {
    return this._inputsList.some((inputElement) => !inputElement.validity.valid)
  };

  // Функция, которая делает неактивной кнопку
  _setDisabledBtn() {
    console.log('giraffe')
    this._submitButton.setAttribute('disabled', true)
    this._submitButton.classList.add(this._inactiveButtonClass);
  }

  // Функция, которая делает кнопку автивной
  _removeDisabledBtn() {
    this._submitButton.removeAttribute('disabled')
    this._submitButton.classList.remove(this._inactiveButtonClass);
  }

  // Функция, которая переключает кнопку
  _toggleButtonState() {

    // console.log(this._hasInvalidInput()+'2'+this)
    if (this._hasInvalidInput()) {
      console.log(123)
      this._setDisabledBtn();
    } else {
      console.log(3)
      this._removeDisabledBtn();
    }
  }

  // Функция, которая убирает ошибки
  clearErrors() {
    this._toggleButtonState(this._submitButton);
    this._inputsList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    })
  }

  enableValidation() {
    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    })
    this._setEventListener();
  };
}

export default FormValidator;
