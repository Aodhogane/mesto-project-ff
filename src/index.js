import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';

const placesList = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popupEditCloseButton = popupEdit.querySelector('.popup__close');
const popupAddCloseButton = popupAdd.querySelector('.popup__close');
const popupImageCloseButton = popupImage.querySelector('.popup__close');
const popupImageContent = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');

// Функция рендеринга карточек
function renderCards() {
  initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData, deleteCard, openImagePopup);
    placesList.appendChild(cardElement);
  });
}
renderCards();

// Функция открытия попапа изображения
function openImagePopup(link, name) {
  popupImageContent.src = link;
  popupImageContent.alt = name;
  popupImageCaption.textContent = name;
  openPopup(popupImage);
}

// Функция закрытия попапа изображения
function closeImagePopup() {
  closePopup(popupImage);
}

// Обработчики событий
popupImageCloseButton.addEventListener('click', closeImagePopup);
popupImage.addEventListener('click', (event) => {
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
