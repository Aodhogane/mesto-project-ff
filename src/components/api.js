const fetchCards = () => {
    return fetch('https://nomoreparties.co/v1/pwff-cohort-1/cards', {
      headers: {
        authorization: '53eddcf0-49ba-4c02-bfb7-93b2e1be6776'
      }
    })
   .then(res => res.json())
   .then((data) => {
      console.log(data);
      const cardsContainer = document.getElementById('cards-container');
      if (data.length > 0) {
        data.forEach((card) => {
          const cardElement = document.createElement('div');
          cardElement.innerHTML = `
            <h2>${card.name}</h2>
            <img src="${card.link}" alt="${card.name}">
          `;
          cardsContainer.appendChild(cardElement);
        });
      } else {
        console.log('Нет карточек');
      }
    });
  };