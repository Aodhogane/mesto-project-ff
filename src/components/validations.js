document.addEventListener("DOMContentLoaded", function() {
    const form = document.forms['edit-profile'];
    const nameInput = form.elements['name'];
    const descriptionInput = form.elements['description'];
    const nameError = document.getElementById('name-error');
    const descriptionError = document.getElementById('description-error');
    
    const namePattern = /^[A-Za-zА-Яа-яЁё\s-]{2,40}$/;
    const descriptionPattern = /^[A-Za-zА-Яа-яЁё\s-]{2,200}$/;
  
    // Проверка на существование элементов
    if (!form || !nameInput || !descriptionInput || !nameError || !descriptionError) {
      console.error('Не удалось найти один или несколько элементов формы.');
      return;
    }
  
    function showInputError(input, errorElement, message) {
      input.classList.add('popup__input_invalid');
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
  
    function hideInputError(input, errorElement) {
      input.classList.remove('popup__input_invalid');
      errorElement.textContent = '';
      errorElement.style.display = 'none';
    }
  
    function checkInputValidity(input, errorElement, pattern) {
      if (!input.value.match(pattern)) {
        showInputError(input, errorElement, input.validationMessage);
      } else {
        hideInputError(input, errorElement);
      }
    }
  
    function handleFormSubmit(event) {
      event.preventDefault();
      checkInputValidity(nameInput, nameError, namePattern);
      checkInputValidity(descriptionInput, descriptionError, descriptionPattern);
  
      if (nameInput.validity.valid && descriptionInput.validity.valid) {
        const profileTitle = document.querySelector('.profile__title');
        const profileDescription = document.querySelector('.profile__description');
        if (profileTitle && profileDescription) {
          profileTitle.textContent = nameInput.value;
          profileDescription.textContent = descriptionInput.value;
          const popupEdit = document.querySelector('.popup_type_edit');
          if (popupEdit) {
            closePopup(popupEdit);
          }
        }
      }
    }
  
    function resetValidation() {
      hideInputError(nameInput, nameError);
      hideInputError(descriptionInput, descriptionError);
      form.reset();
    }
  
    nameInput.addEventListener('input', () => checkInputValidity(nameInput, nameError, namePattern));
    descriptionInput.addEventListener('input', () => checkInputValidity(descriptionInput, descriptionError, descriptionPattern));
    form.addEventListener('submit', handleFormSubmit);
  
    document.querySelectorAll('.popup__close').forEach(button => {
      button.addEventListener('click', () => {
        const popup = button.closest('.popup');
        if (popup) {
          closePopup(popup);
          resetValidation();
        }
      });
    });
  
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
          closePopup(openedPopup);
          resetValidation();
        }
      }
    });
  
    document.querySelectorAll('.popup').forEach(popup => {
      popup.addEventListener('click', (event) => {
        if (event.target === popup) {
          closePopup(popup);
          resetValidation();
        }
      });
    });
  });
  
  function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscClose);
  }
  
  function handleEscClose(event) {
    if (event.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
      if (openedPopup) closePopup(openedPopup);
    }
  }
  