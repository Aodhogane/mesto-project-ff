import './pages/index.css';
import { initialCards } from './scripts/cards.js'; 
import { generateCardElement, removeCardElement, toggleLikeButton } from './components/card.js'; 
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
    const cardElement = generateCardElement(cardData, removeCardElement, openImagePopup, toggleLikeButton);
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
  clearValidation(popupEdit, {
      inputSelector: '.popup__input',
      submitButtonSelector: '.popup__button',
      inactiveButtonClass: 'popup__button_inactive',
      inputErrorClass: 'popup__input_invalid',
      errorClass: 'popup__error_visible'
  });
  openPopup(popupEdit);
}

function handleEditFormSubmit(event) {
  event.preventDefault();
  
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
  const cardElement = generateCardElement(cardData, removeCardElement, openImagePopup, toggleLikeButton);
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
addButton.addEventListener('click', () => {
  clearValidation(popupAdd, {
      inputSelector: '.popup__input',
      submitButtonSelector: '.popup__button',
      inactiveButtonClass: 'popup__button_inactive',
      inputErrorClass: 'popup__input_invalid',
      errorClass: 'popup__error_visible'
  });
  openPopup(popupAdd);
});
popupEditCloseButton.addEventListener('click', () => closePopup(popupEdit));
popupAddCloseButton.addEventListener('click', () => closePopup(popupAdd));
popupEditForm.addEventListener('submit', handleEditFormSubmit);
popupAddForm.addEventListener('submit', handleAddFormSubmit);
[popupEdit, popupAdd].forEach(popup => popup.addEventListener('click', event => handleOverlayClick(event, popup)));

// Включаем валидацию
document.addEventListener('DOMContentLoaded', () => {
    enableValidation({
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_inactive',
        inputErrorClass: 'popup__input_invalid',
        errorClass: 'popup__error_visible'
    });
});

fetchCards();
