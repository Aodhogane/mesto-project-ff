const cardTemplate = document.querySelector('#card-template').content.querySelector(".card");

function createCard(cardData, deleteCallback, openImagePopupCallback, likeCallback) {
  const cardElement = cardTemplate.cloneNode(true),
        cardImage = cardElement.querySelector('.card__image'),
        cardTitle = cardElement.querySelector('.card__title'),
        likeButton = cardElement.querySelector('.card__like-button');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', () => deleteCallback(cardElement));
  cardImage.addEventListener('click', () => openImagePopupCallback(cardData.link, cardData.name));
  likeButton.addEventListener('click', () => likeCallback(likeButton));
  return cardElement;
}

function deleteCard(cardElement) {cardElement.remove();}

function handleLikeButton(likeButton) {likeButton.classList.toggle('card__like-button_is-active');}

export { createCard, deleteCard, handleLikeButton };