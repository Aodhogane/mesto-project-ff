document.addEventListener("DOMContentLoaded", function() {
<<<<<<< HEAD
    const form = document.forms['edit-profile'];
    const nameInput = form.elements['name'];
    const descriptionInput = form.elements['description'];
    const imageUrlInput = form.elements['imageUrl'];
    const nameError = document.getElementById('name-error');
    const descriptionError = document.getElementById('description-error');
    const imageUrlError = document.getElementById('imageUrl-error');
    const submitBtn = document.getElementById('submitBtn');

    const namePattern = /^[A-Za-zА-Яа-яЁё\s-]{2,30}$/;
    const descriptionPattern = /^[A-Za-zА-Яа-яЁё\s-]+$/;

    // Проверка на существование элементов
    if (!form || !nameInput || !descriptionInput || !imageUrlInput || !nameError || !descriptionError || !imageUrlError) {
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

    function checkInputValidity(input, errorElement, pattern, lengthMessage, patternMessage, emptyMessage) {
        if (input.value.trim() === '') {
            showInputError(input, errorElement, emptyMessage);
            return false;
        } else if (input.value.length < 2 || input.value.length > 40) {
            showInputError(input, errorElement, lengthMessage);
            return false;
        } else if (!input.value.match(pattern)) {
            showInputError(input, errorElement, patternMessage);
            return false;
        } else {
            hideInputError(input, errorElement);
            return true;
        }
    }

    function checkUrlValidity(input, errorElement) {
        if (!input.validity.valid) {
            showInputError(input, errorElement, 'Ссылка на картинку должна быть действительным URL.');
            return false;
        } else {
            hideInputError(input, errorElement);
            return true;
        }
    }

    function validateForm() {
        const isNameValid = checkInputValidity(nameInput, nameError, namePattern,
            'В поле «Имя» должно быть от 2 до 40 символов.',
            'Поле «Имя» может содержать только латинские и кириллические буквы, знаки дефиса и пробелы.',
            'Поле «Имя» не должно быть пустым.');
        const isDescriptionValid = checkInputValidity(descriptionInput, descriptionError, descriptionPattern,
            'В поле «О себе» должно быть от 2 до 200 символов.',
            'Поле «О себе» может содержать только латинские и кириллические буквы, знаки дефиса и пробелы.',
            'Поле «О себе» не должно быть пустым.');
        const isImageUrlValid = checkUrlValidity(imageUrlInput, imageUrlError);

        const isFormValid = isNameValid && isDescriptionValid && isImageUrlValid;
        submitBtn.disabled = !isFormValid;
        submitBtn.classList.toggle('disabled', !isFormValid);
        return isFormValid;
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        if (validateForm()) {
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
=======
  const formEditProfile = document.forms['edit-profile'];
  const nameInput = formEditProfile.elements['name'];
  const descriptionInput = formEditProfile.elements['description'];
  const nameError = document.getElementById('name-error');
  const descriptionError = document.getElementById('description-error');

  const newPlaceForm = document.forms['new-place'];
  const placeNameInput = newPlaceForm.elements['place-name'];
  const linkInput = newPlaceForm.elements['link'];
  const placeNameError = document.createElement('span');
  placeNameError.className = 'popup__error';
  placeNameError.id = 'place-name-error';
  placeNameInput.after(placeNameError);
  const linkError = document.createElement('span');
  linkError.className = 'popup__error';
  linkError.id = 'link-error';
  linkInput.after(linkError);

  const namePattern = /^[A-Za-zА-Яа-яЁё\s-]+$/;
  const placeNamePattern = /^[A-Za-zА-Яа-яЁё\s-]+$/;
  
  if (!formEditProfile || !nameInput || !descriptionInput || !nameError || !descriptionError || !newPlaceForm || !placeNameInput || !linkInput || !placeNameError || !linkError) {
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

  function checkInputValidity(input, errorElement, pattern, lengthMessage, patternMessage, emptyMessage) {
    if (input.value.trim() === '') {
      showInputError(input, errorElement, emptyMessage);
      return false;
    } else if (input.value.length < 2 || input.value.length > 40) {
      showInputError(input, errorElement, lengthMessage);
      return false;
    } else if (!input.value.match(pattern)) {
      showInputError(input, errorElement, patternMessage);
      return false;
    } else {
      hideInputError(input, errorElement);
      return true;
    }
  }

  function checkUrlValidity(input, errorElement, emptyMessage) {
    if (input.value.trim() === '') {
      showInputError(input, errorElement, emptyMessage);
      return false;
    } else if (!input.validity.valid) {
      showInputError(input, errorElement, 'Поле «Ссылка на картинку» должно быть URL.');
      return false;
    } else {
      hideInputError(input, errorElement);
      return true;
    }
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    const isNameValid = checkInputValidity(nameInput, nameError, namePattern, 
      'В поле «Имя» должно быть от 2 до 40 символов.', 
      'Поле «Имя» может содержать только латинские и кириллические буквы, знаки дефиса и пробелы.', 
      'Поле «Имя» не должно быть пустым.');
    const isDescriptionValid = checkInputValidity(descriptionInput, descriptionError, namePattern, 
      'В поле «О себе» должно быть от 2 до 200 символов.', 
      'Поле «О себе» может содержать только латинские и кириллические буквы, знаки дефиса и пробелы.', 
      'Поле «О себе» не должно быть пустым.');

    if (isNameValid && isDescriptionValid) {
      const profileTitle = document.querySelector('.profile__title');
      const profileDescription = document.querySelector('.profile__description');
      if (profileTitle && profileDescription) {
        profileTitle.textContent = nameInput.value;
        profileDescription.textContent = descriptionInput.value;
        const popupEdit = document.querySelector('.popup_type_edit');
        if (popupEdit) {
          closePopup(popupEdit);
>>>>>>> bf1fbf07d243301db9669afda5e4ab21be01550d
        }
    }
<<<<<<< HEAD

    function resetValidation() {
        hideInputError(nameInput, nameError);
        hideInputError(descriptionInput, descriptionError);
        hideInputError(imageUrlInput, imageUrlError);
        form.reset();
    }

    nameInput.addEventListener('input', validateForm);
    descriptionInput.addEventListener('input', validateForm);
    imageUrlInput.addEventListener('input', validateForm);

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
});
=======
  }

  function handleNewPlaceFormSubmit(event) {
    event.preventDefault();
    const isPlaceNameValid = checkInputValidity(placeNameInput, placeNameError, placeNamePattern, 
      'В поле «Название» должно быть от 2 до 30 символов.', 
      'Поле «Название» может содержать только латинские и кириллические буквы, знаки дефиса и пробелы.', 
      'Поле «Название» не должно быть пустым.');
    const isLinkValid = checkUrlValidity(linkInput, linkError, 'Поле «Ссылка на картинку» не должно быть пустым.');

    if (isPlaceNameValid && isLinkValid) {
      // Здесь можно добавить логику добавления новой карточки
      const popupNewCard = document.querySelector('.popup_type_new-card');
      if (popupNewCard) {
        closePopup(popupNewCard);
      }
    }
  }

  function resetValidation(form) {
    const inputs = form.querySelectorAll('.popup__input');
    const errors = form.querySelectorAll('.popup__error');
    inputs.forEach(input => input.classList.remove('popup__input_invalid'));
    errors.forEach(error => {
      error.textContent = '';
      error.style.display = 'none';
    });
    form.reset();
  }

  nameInput.addEventListener('input', () => checkInputValidity(nameInput, nameError, namePattern, 
      'В поле «Имя» должно быть от 2 до 40 символов.', 
      'Поле «Имя» может содержать только латинские и кириллические буквы, знаки дефиса и пробелы.', 
      'Поле «Имя» не должно быть пустым.'));
  descriptionInput.addEventListener('input', () => checkInputValidity(descriptionInput, descriptionError, 
    namePattern, 'В поле «О себе» должно быть от 2 до 200 символов.', 
    'Поле «О себе» может содержать только латинские и кириллические буквы, знаки дефиса и пробелы.', 
    'Поле «О себе» не должно быть пустым.'));
  formEditProfile.addEventListener('submit', handleFormSubmit);

  placeNameInput.addEventListener('input', () => checkInputValidity(placeNameInput, placeNameError, placeNamePattern, 
    'В поле «Название» должно быть от 2 до 30 символов.', 
    'Поле «Название» может содержать только латинские и кириллические буквы, знаки дефиса и пробелы.', 
    'Поле «Название» не должно быть пустым.'));
  linkInput.addEventListener('input', () => checkUrlValidity(linkInput, linkError, 'Поле «Ссылка на картинку» не должно быть пустым.'));
  newPlaceForm.addEventListener('submit', handleNewPlaceFormSubmit);

  document.querySelectorAll('.popup__close').forEach(button => {
    button.addEventListener('click', () => {
      const popup = button.closest('.popup');
      if (popup) {
        closePopup(popup);
        resetValidation(popup.querySelector('form'));
      }
    });
  });

  document.addEventListener('keydown', handleEscClose);

  document.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('click', (event) => {
      if (event.target === popup) {
        closePopup(popup);
        resetValidation(popup.querySelector('form'));
      }
    });
  });
});

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
}

function handleEscClose(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) closePopup(openedPopup);
  }
}
>>>>>>> bf1fbf07d243301db9669afda5e4ab21be01550d
