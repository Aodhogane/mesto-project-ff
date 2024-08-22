const cardTemplate = document.querySelector('#card-template').content.querySelector(".card");

// Функция создания карточки
function createCard(cardData, deleteCallback, openImagePopupCallback, likeCallback) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  const deleteIcon = cardElement.querySelector('.card__delete-button');
  deleteIcon.addEventListener('click', function () {
    deleteCallback(cardElement);
  });

  cardImage.addEventListener('click', function () {
    openImagePopupCallback(cardData.link, cardData.name);
  });

  likeButton.addEventListener('click', function () {
    likeCallback(likeButton);
  });

  return cardElement;
}

// Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

export { createCard, deleteCard };
