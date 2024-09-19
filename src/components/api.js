const fetchCards = () => {
    const cohortId = 'pw-cohort-1';
    const token = '53eddcf0-49ba-4c02-bfb7-93b2e1be6776';
  
    return fetch(`https://nomoreparties.co/v1/${cohortId}/cards`, {
      headers: {
        authorization: token
      }
    })
 .then(res => res.json())
.then((data) => {
    console.log(data);
    if (Array.isArray(data)) {
      const cardsContainer = document.getElementById('cards-container');
      data.forEach((card) => {
        const cardElement = document.createElement('div');
        cardElement.innerHTML = `
          <h2>${card.name}</h2>
          <img src="${card.link}" alt="${card.name}">
          <span class="likes-count">${card.likes.length} лайков</span>
        `;
        cardsContainer.appendChild(cardElement);
      });
    } else {
      console.error('Данные не являются массивом');
    }
    });
  };
  
  const editProfile = (name, about) => {
    const url = `https://nomoreparties.co/v1/${cohortId}/users/me`;
    const headers = {
      authorization: token,
      'Content-Type': 'application/json'
    };
    const body = JSON.stringify({ name, about });
  
    fetch(url, { method: 'PATCH', headers, body })
   .then(res => res.json())
   .then((data) => console.log(data))
   .catch((error) => console.error(error));
  };
  
  const addCard = (name, link) => {
    const url = `https://nomoreparties.co/v1/${cohortId}/cards`;
    const headers = {
      authorization: token,
      'Content-Type': 'application/json'
    };
    const body = JSON.stringify({ name, link });

    fetch(url, { method: 'POST', headers, body })
  .then(res => res.json())
  .then((data) => {
      const cardsContainer = document.getElementById('cards-container');
      const cardElement = document.createElement('div');
      cardElement.innerHTML = `
        <h2>${data.name}</h2>
        <img src="${data.link}" alt="${data.name}">
        <span class="likes-count">${data.likes.length}</span>
      `;
      cardsContainer.appendChild(cardElement);
    })
  .catch((error) => console.error(error));
  };