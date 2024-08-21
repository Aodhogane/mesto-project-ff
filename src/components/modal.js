const popupImage = document.querySelector('.popup_type_image');
const popupImageContent = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');

// Функция открытия модального окна
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  popup.classList.remove('popup_is-animated');
  document.addEventListener('keydown', handleEscClose);
}

// Функция закрытия модального окна
function closePopup(popup) {
  popup.classList.add('popup_is-animated');
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
}

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

// Функция закрытия попапа по нажатию Escape
function handleEscClose(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

export { openPopup, closePopup, openImagePopup, closeImagePopup, handleEscClose };