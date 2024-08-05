// Получение шаблона карточки и контейнера для карточек
const cardTemplate = document.getElementById('card-template').content;
const cardContainer = document.querySelector('.places__list');

// Функция создания карточки
const createCard = (title, imageUrl) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = imageUrl;
  cardImage.alt = title;
  cardTitle.textContent = title;

  // Добавление обработчика для кнопки удаления
  deleteButton.addEventListener('click', () => {
    cardElement.remove();
  });

  return cardElement;
};

// Функция отображения карточек на странице
const displayCards = (cards) => {
  cards.forEach(card => {
    const cardElement = createCard(card.title, card.imageUrl);
    cardContainer.appendChild(cardElement);
  });
};

// Пример использования
const initialCards = [
  { title: 'Карточка 1', imageUrl: './images/card1.jpg' },
  { title: 'Карточка 2', imageUrl: './images/card2.jpg' },
  { title: 'Карточка 3', imageUrl: './images/card3.jpg'},
  { title: 'Карточка 3', imageUrl: './images/card3.jpg'}
];

displayCards(initialCards);
