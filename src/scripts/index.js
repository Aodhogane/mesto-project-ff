// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

// DOM узлы
const placesList = document.querySelector('.places__list');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupImage = document.querySelector('.popup_type_image');

// Функция создания карточки
function createCard(name, link) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  // Удаление карточки
  deleteButton.addEventListener('click', () => {
    cardElement.remove();
  });

  // Лайк карточки
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('card__like-button_active');
  });

  // Открытие попапа с изображением
  cardImage.addEventListener('click', () => {
    const popupImageImg = popupImage.querySelector('.popup__image');
    const popupImageCaption = popupImage.querySelector('.popup__caption');

    popupImageImg.src = link;
    popupImageImg.alt = name;
    popupImageCaption.textContent = name;

    openPopup(popupImage);
  });

  return cardElement;
}

// Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// Вывести карточки на страницу
function renderInitialCards() {
  initialCards.forEach((item) => {
    const cardElement = createCard(item.name, item.link);
    placesList.append(cardElement);
  });
}

// Открытие и закрытие попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Закрытие попапов по клику на крестик
document.querySelectorAll('.popup__close').forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

// Инициализация карточек
renderInitialCards();