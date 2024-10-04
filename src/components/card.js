const cardTemplate = document.querySelector('#card-template').content.querySelector(".card");

function generateCardElement(cardData, handleCardDelete, handleImageClick, handleLikeToggle) {
  const cardElement = cardTemplate.cloneNode(true),
        cardImage = cardElement.querySelector('.card__image'), 
        cardTitle = cardElement.querySelector('.card__title'), 
        likeButton = cardElement.querySelector('.card__like-button');
  
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  
  cardElement.querySelector('.card__delete-button').addEventListener('click', () => handleCardDelete(cardElement));
  cardImage.addEventListener('click', () => handleImageClick(cardData.link, cardData.name));
  likeButton.addEventListener('click', () => handleLikeToggle(likeButton));
  
  return cardElement;
}

function removeCardElement(cardElement) {
  cardElement.remove();
}

function toggleLikeButton(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

export { generateCardElement, removeCardElement, toggleLikeButton };
