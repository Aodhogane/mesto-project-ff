import './pages/index.css'; // Импорт CSS файла
import { initialCards } from './scripts/cards.js';

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content.querySelector(".card");
const popupImage = document.querySelector('.popup_type_image');
const popupImageContent = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');
const popupCloseButton = popupImage.querySelector('.popup__close');

// @todo: Функция создания карточки
function createCard(cardData, deleteCallback) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  const deleteIcon = cardElement.querySelector('.card__delete-button');
  deleteIcon.addEventListener('click', function () {
    deleteCallback(cardElement);
  });

  cardImage.addEventListener('click', function () {
    openImagePopup(cardData.link, cardData.name);
  });

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
    cardElement.remove();
}

// @todo: Функция открытия попапа с изображением
function openImagePopup(link, name) {
  popupImageContent.src = link;
  popupImageContent.alt = name;
  popupImageCaption.textContent = name;
  popupImage.classList.add('popup_is-opened');
  popupImage.classList.remove('popup_is-animated');
}

// @todo: Функция закрытия попапа
function closeImagePopup() {
  popupImage.classList.add('popup_is-animated');
  popupImage.classList.remove('popup_is-opened');
}

// @todo: Вывести карточки на страницу
function renderCards() {
  initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData, deleteCard);
    placesList.appendChild(cardElement);
  });
}

// Вызов функции для вывода карточек на страницу
renderCards();

// Добавление обработчика события для закрытия попапа
popupCloseButton.addEventListener('click', closeImagePopup);

// Закрытие попапа при нажатии на пустое пространство вокруг изображения
popupImage.addEventListener('click', (event) => {
  if (event.target === popupImage) {
    closeImagePopup();
  }
});
