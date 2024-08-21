// Функция открытия модального окна
function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscClose);
  }
  
  // Функция закрытия модального окна
  function closePopup(popup) {
    popup.classList.add('popup_is-animated');
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscClose);
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
  
  // Добавление модификатора при загрузке приложения
  document.addEventListener('DOMContentLoaded', () => {
    const popups = document.querySelectorAll('.popup');
    popups.forEach(popup => popup.classList.add('popup_is-animated'));
  });
  
  export { openPopup, closePopup, handleEscClose };