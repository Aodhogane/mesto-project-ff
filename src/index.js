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
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupEditForm = popupEdit.querySelector('.popup__form');
const popupNameInput = popupEdit.querySelector('.popup__input_type_name');
const popupDescriptionInput = popupEdit.querySelector('.popup__input_type_description');

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

// Функция открытия попапа редактирования профиля
function openEditPopup() {
  popupNameInput.value = profileTitle.textContent;
  popupDescriptionInput.value = profileDescription.textContent;
  openPopup(popupEdit);
}

// Функция сохранения изменений профиля
function handleEditFormSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = popupNameInput.value;
  profileDescription.textContent = popupDescriptionInput.value;
  closePopup(popupEdit);
}

// Обработчики событий
popupImageCloseButton.addEventListener('click', closeImagePopup);
popupImage.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    closeImagePopup();
  }
});

editButton.addEventListener('click', openEditPopup);
addButton.addEventListener('click', () => openPopup(popupAdd));

popupEditCloseButton.addEventListener('click', () => closePopup(popupEdit));
popupAddCloseButton.addEventListener('click', () => closePopup(popupAdd));

popupEditForm.addEventListener('submit', handleEditFormSubmit);

[popupEdit, popupAdd].forEach(popup => {
  popup.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
      closePopup(popup);
    }
  });
});