document.addEventListener("DOMContentLoaded", function() {
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
        }
    }

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