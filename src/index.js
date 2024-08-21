// index.js

import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard } from './components/card.js';
import { openPopup, closePopup, closeImagePopup } from './components/modal.js';

const placesList = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupEditCloseButton = popupEdit.querySelector('.popup__close');
const popupAddCloseButton = popupAdd.querySelector('.popup__close');
const popupCloseButton = document.querySelector('.popup_type_image .popup__close');

// Функция рендеринга карточек
function renderCards() {
  initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData, deleteCard);
    placesList.appendChild(cardElement);
  });
}
renderCards();

// Обработчики событий
popupCloseButton.addEventListener('click', closeImagePopup);
document.querySelector('.popup_type_image').addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    closeImagePopup();
  }
});
editButton.addEventListener('click', () => openPopup(popupEdit));
addButton.addEventListener('click', () => openPopup(popupAdd));
popupEditCloseButton.addEventListener('click', () => closePopup(popupEdit));
popupAddCloseButton.addEventListener('click', () => closePopup(popupAdd));
[popupEdit, popupAdd].forEach(popup => {
  popup.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
      closePopup(popup);
    }
  });
});