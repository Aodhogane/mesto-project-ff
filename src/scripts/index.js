    
   import '../pages/index.css'; // Импорт CSS файла
   import './cards.js';
   
   // @todo: DOM узлы
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardData, deleteCallback) {
    const cardElement = cardTemplate.cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    deleteButton.addEventListener('click', () => {
        deleteCallback(cardElement);
    });

    return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
    cardElement.remove();
}

// @todo: Вывести карточки на страницу
function renderCards(cardArray) {
    cardArray.forEach(cardData => {
        const cardElement = createCard(cardData, deleteCard);
        placesList.append(cardElement);
    });
}

// Вызов функции для вывода карточек на страницу
renderCards(initialCards);