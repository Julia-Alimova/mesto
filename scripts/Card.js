class Card {
  constructor(config, cardSelector, name, link, openPreview) {
    this._config = config;
    this._cardSelector = cardSelector;
    this._name = name;
    this._link = link;
    this._openPreview = openPreview;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content
      .querySelector(this._config.cardElement)
      .cloneNode(true);
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(this._config.likeButton);
    this._likeButton.addEventListener('click', () => this._like());
    this._deleteButton = this._element.querySelector(this._config.deleteButton);
    this._deleteButton.addEventListener('click', () => this._deleteCard())
    this._cardImage.addEventListener('click', () => this._openPreview(this._name, this._link));
  }

  generateCard(sectionWithCards) {
    this._element = this._getTemplate();

    this._cardName = this._element.querySelector(this._config.title);
    this._cardName.textContent = this._name;

    this._cardImage = this._element.querySelector(this._config.image);
    this._cardImage.src = this._link;
    this._cardImage.textContent = this._name;

    this._setEventListeners();

    sectionWithCards.prepend(this._element);
  }

  _like() {
    this._likeButton.classList.toggle('card__like_type_active');
  }

  _deleteCard() {
    this._element.remove();
  }
}
export default Card;
