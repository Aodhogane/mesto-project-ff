import './pages/index.css'; // Импорт CSS файла
import { initialCards } from './scripts/cards.js';

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content.querySelector(".card");
const popupImage = document.querySelector('.popup_type_image');
const popupImageContent = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');
const popupCloseButton = popupImage.querySelector('.popup__close');

// Получаем кнопки "Редактировать" и "+"
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// Получаем попапы
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupEditCloseButton = popupEdit.querySelector('.popup__close');
const popupAddCloseButton = popupAdd.querySelector('.popup__close');

// @todo: Функция создания карточки
function createCard(cardData, deleteCallback) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button'); // Добавляем кнопку лайка

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

  // Добавляем обработчик события для кнопки лайка
  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('card__like-button_is-active');
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
  document.addEventListener('keydown', handleEscClose);
}

// @todo: Функция закрытия попапа
function closeImagePopup() {
  popupImage.classList.add('popup_is-animated');
  popupImage.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
}

// @todo: Функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  popup.classList.remove('popup_is-animated');
  document.addEventListener('keydown', handleEscClose);
}

// @todo: Функция закрытия попапа
function closePopup(popup) {
  popup.classList.add('popup_is-animated');
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
}

// @todo: Функция закрытия попапа по нажатию на Esc
function handleEscClose(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
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

// Добавление обработчиков событий для закрытия попапа
popupCloseButton.addEventListener('click', closeImagePopup);

// Закрытие попапа при нажатии на пустое пространство вокруг изображения
popupImage.addEventListener('click', (event) => {
  if (event.target === popupImage) {
    closeImagePopup();
  }
});

// Добавление обработчиков событий для открытия других попапов
editButton.addEventListener('click', () => openPopup(popupEdit));
addButton.addEventListener('click', () => openPopup(popupAdd));

// Добавление обработчиков событий для закрытия других попапов
popupEditCloseButton.addEventListener('click', () => closePopup(popupEdit));
popupAddCloseButton.addEventListener('click', () => closePopup(popupAdd));

popupEdit.addEventListener('click', (event) => {
  if (event.target === popupEdit) {
    closePopup(popupEdit);
  }
});

popupAdd.addEventListener('click', (event) => {
  if (event.target === popupAdd) {
    closePopup(popupAdd);
  }
});