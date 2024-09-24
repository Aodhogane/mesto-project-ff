const COHORT_ID = 'pw-cohort-1';
const TOKEN = '53eddcf0-49ba-4c02-bfb7-93b2e1be6776';

const fetchUserInfo = async () => {
  try {
    const response = await fetch(`https://nomoreparties.co/v1/${COHORT_ID}/users/me`, {
      headers: {
        authorization: TOKEN
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const fetchCards = async () => {
  try {
    const response = await fetch(`https://nomoreparties.co/v1/${COHORT_ID}/cards`, {
      headers: {
        authorization: TOKEN
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const editProfile = async (name, about) => {
  try {
    const url = `https://nomoreparties.co/v1/${COHORT_ID}/users/me`;
    const headers = {
      authorization: TOKEN,
      'Content-Type': 'application/json'
    };
    const body = JSON.stringify({ name, about });
    const response = await fetch(url, { method: 'PATCH', headers, body });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
	
const addCard = async (name, link) => {
  try {
    const url = `https://nomoreparties.co/v1/${COHORT_ID}/cards`;
    const headers = {
      authorization: TOKEN,
      'Content-Type': 'application/json'
    };
    const body = JSON.stringify({ name, link });
    const response = await fetch(url, { method: 'POST', headers, body });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const renderCardLikes = (card) => {
  const likesCount = card.likes.length;
  const likesElement = document.createElement('span');
  likesElement.textContent = `${likesCount} лайков`;
  return likesElement;
};

const deleteCard = async (cardId) => {
  try {
    const url = `https://nomoreparties.co/v1/${COHORT_ID}/cards/${cardId}`;
    const response = await fetch(url, { method: 'DELETE', headers: { authorization: TOKEN } });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const likeCard = async (cardId) => {
  try {
    const url = `https://nomoreparties.co/v1/${COHORT_ID}/cards/likes/${cardId}`;
    const response = await fetch(url, { method: 'PUT', headers: { authorization: TOKEN } });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const dislikeCard = async (cardId) => {
  try {
    const url = `https://nomoreparties.co/v1/${COHORT_ID}/cards/likes/${cardId}`;
    const response = await fetch(url, { method: 'DELETE', headers: { authorization: TOKEN } });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const updateAvatar = async (avatar) => {
  try {
    const url = `https://nomoreparties.co/v1/${COHORT_ID}/users/me/avatar`;
    const headers = {
      authorization: TOKEN,
      'Content-Type': 'application/json'
    };
    const body = JSON.stringify({ avatar });
    const response = await fetch(url, { method: 'PATCH', headers, body });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};