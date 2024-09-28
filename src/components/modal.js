export function openPopup(popup) {
  popup.classList.add('popup_is-animated');
  setTimeout(() => popup.classList.add('popup_is-opened'), 100);
  document.addEventListener('keydown', handleEscClose);
  document.addEventListener('click', handleOverlayClose);
};
export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  setTimeout(() => popup.classList.remove('popup_is-animated'), 600);
  document.removeEventListener('keydown', handleEscClose);
  document.removeEventListener('click', handleOverlayClose);
};
export function handleEscClose(evt) {
  if (evt.key === 'Escape') closePopup(document.querySelector('.popup_is-opened'));
};
export function handleOverlayClose(evt) {
  if (evt.target.classList.contains('popup')) closePopup(evt.target);
};