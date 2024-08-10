// Получаем доступ к темплейту карточки
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

// DOM узлы
const placesList = document.querySelector('.places__list');

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

// Вывести карточки на страницу
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData);
  placesList.append(cardElement);
});
