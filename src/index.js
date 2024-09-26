import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard, handleLikeButton } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { enableValidation, clearValidation } from "./components/validations.js";
import './components/api.js';

const placesList = document.querySelector('.places__list'),
      editButton = document.querySelector('.profile__edit-button'),
      addButton = document.querySelector('.profile__add-button'),
      popupEdit = document.querySelector('.popup_type_edit'),
      popupAdd = document.querySelector('.popup_type_new-card'),
      popupImage = document.querySelector('.popup_type_image'),
      popupEditCloseButton = popupEdit.querySelector('.popup__close'),
      popupAddCloseButton = popupAdd.querySelector('.popup__close'),
      popupImageCloseButton = popupImage.querySelector('.popup__close'),
      popupImageContent = popupImage.querySelector('.popup__image'),
      popupImageCaption = popupImage.querySelector('.popup__caption'),
      profileTitle = document.querySelector('.profile__title'),
      profileDescription = document.querySelector('.profile__description'),
      popupEditForm = popupEdit.querySelector('.popup__form'),
      popupAddForm = popupAdd.querySelector('.popup__form'),
      popupNameInput = popupEdit.querySelector('.popup__input_type_name'),
      popupDescriptionInput = popupEdit.querySelector('.popup__input_type_description'),
      popupCardNameInput = popupAdd.querySelector('.popup__input_type_card-name'),
      popupCardLinkInput = popupAdd.querySelector('.popup__input_type_url'),
      fetchCards = require('./components/api.js');

function renderCards() {
  initialCards.forEach(cardData => {
    const cardElement = createCard(cardData, deleteCard, openImagePopup, handleLikeButton);
    placesList.appendChild(cardElement);
  });
}

renderCards();

function openImagePopup(link, name) {
  popupImageContent.src = link;
  popupImageContent.alt = name;
  popupImageCaption.textContent = name;
  openPopup(popupImage);
}

function openEditPopup() {
  popupNameInput.value = profileTitle.textContent;
  popupDescriptionInput.value = profileDescription.textContent;
  openPopup(popupEdit);
}

function handleEditFormSubmit(event) {
  event.preventDefault();
  
  // Проверка валидности полей
  const isNameValid = checkInputValidity(popupNameInput, document.getElementById('name-error'), /^[A-Za-zА-Яа-яЁё\s-]+$/, 
    'В поле «Имя» должно быть от 2 до 40 символов.', 
    'Поле «Имя» может содержать только латинские и кириллические буквы, знаки дефиса и пробелы.', 
    'Поле «Имя» не должно быть пустым.');

  const isDescriptionValid = checkInputValidity(popupDescriptionInput, document.getElementById('description-error'), /^[A-Za-zА-Яа-яЁё\s-]+$/, 
    'В поле «О себе» должно быть от 2 до 200 символов.', 
    'Поле «О себе» может содержать только латинские и кириллические буквы, знаки дефиса и пробелы.', 
    'Поле «О себе» не должно быть пустым.');

  if (isNameValid && isDescriptionValid) {
    profileTitle.textContent = popupNameInput.value;
    profileDescription.textContent = popupDescriptionInput.value;
    closePopup(popupEdit);
  }
}

function handleAddFormSubmit(event) {
  event.preventDefault();
  const cardData = {
    name: popupCardNameInput.value,
    link: popupCardLinkInput.value
  };
  const cardElement = createCard(cardData, deleteCard, openImagePopup, handleLikeButton);
  placesList.prepend(cardElement);
  popupAddForm.reset();
  closePopup(popupAdd);
}

function handleOverlayClick(event, popup) {
  if (event.target === event.currentTarget) closePopup(popup);
}

popupImageCloseButton.addEventListener('click', () => closePopup(popupImage));
popupImage.addEventListener('click', event => handleOverlayClick(event, popupImage));
editButton.addEventListener('click', openEditPopup);
addButton.addEventListener('click', () => openPopup(popupAdd));
popupEditCloseButton.addEventListener('click', () => closePopup(popupEdit));
popupAddCloseButton.addEventListener('click', () => closePopup(popupAdd));
popupEditForm.addEventListener('submit', handleEditFormSubmit);
popupAddForm.addEventListener('submit', handleAddFormSubmit);
[popupEdit, popupAdd].forEach(popup => popup.addEventListener('click', event => handleOverlayClick(event, popup)));

// Функция валидации
function checkInputValidity(input, errorElement, pattern, lengthMessage, patternMessage, emptyMessage) {
  if (input.value.trim() === '') {
    showInputError(input, errorElement, emptyMessage);
    return false;
  } else if (input.value.length < 2 || input.value.length > 40) {
    showInputError(input, errorElement, lengthMessage);
    return false;
  } else if (!input.value.match(pattern)) {
    showInputError(input, errorElement, patternMessage);
    return false;
  } else {
    hideInputError(input, errorElement);
    return true;
  }
}

// Функции показа и скрытия ошибок
function showInputError(input, errorElement, message) {
  input.classList.add('popup__input_invalid');
  errorElement.textContent = message;
  errorElement.style.display = 'block';
}

function hideInputError(input, errorElement) {
  input.classList.remove('popup__input_invalid');
  errorElement.textContent = '';
  errorElement.style.display = 'none';
}

fetchCards();