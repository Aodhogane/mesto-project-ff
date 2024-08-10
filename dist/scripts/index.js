// Получаем доступ к темплейту карточки
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

// DOM узлы
const placesList = document.querySelector('.places__list');
const addButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_type_new-card');
const addCardForm = addCardPopup.querySelector('.popup__form');
const addCardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
const addCardLinkInput = addCardForm.querySelector('.popup__input_type_url');
const closeButtons = document.querySelectorAll('.popup__close');

// Функция создания карточки
function createCard(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  
  // Добавляем обработчик удаления карточки
  cardDeleteButton.addEventListener('click', deleteCard);
  
  return cardElement;
}

// Функция удаления карточки
function deleteCard(event) {
  const cardElement = event.target.closest('.card');
  cardElement.remove();
}

// Функция добавления карточки на страницу
function addCard(name, link) {
  const cardData = { name, link };
  const cardElement = createCard(cardData);
  placesList.prepend(cardElement); // Добавляем в начало списка
}

// Функции открытия и закрытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Обработчик открытия попапа добавления карточки
addButton.addEventListener('click', () => {
  openPopup(addCardPopup);
});

// Обработчик закрытия попапов
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

// Обработчик добавления новой карточки
addCardForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = addCardNameInput.value;
  const link = addCardLinkInput.value;
  addCard(name, link);
  closePopup(addCardPopup);
  addCardForm.reset();
});

// Вывести карточки на страницу
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData);
  placesList.append(cardElement);
});
