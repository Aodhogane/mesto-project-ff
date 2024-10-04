const COHORT_ID = 'pw-cohort-1';
const TOKEN = '53eddcf0-49ba-4c02-bfb7-93b2e1be6776';

const getUserProfile = async () => {
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

const getInitialCards = async () => {
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

const updateUserProfile = async (name, about) => {
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
	
const createNewCard = async (name, link) => {
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

const removeCard = async (cardId) => {
  try {
    const url = `https://nomoreparties.co/v1/${COHORT_ID}/cards/${cardId}`;
    const response = await fetch(url, { method: 'DELETE', headers: { authorization: TOKEN } });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const addLikeToCard = async (cardId) => {
  try {
    const url = `https://nomoreparties.co/v1/${COHORT_ID}/cards/likes/${cardId}`;
    const response = await fetch(url, { method: 'PUT', headers: { authorization: TOKEN } });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const removeLikeFromCard = async (cardId) => {
  try {
    const url = `https://nomoreparties.co/v1/${COHORT_ID}/cards/likes/${cardId}`;
    const response = await fetch(url, { method: 'DELETE', headers: { authorization: TOKEN } });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const updateProfileAvatar = async (avatarUrl) => {
  try {
    const url = `https://nomoreparties.co/v1/${COHORT_ID}/users/me/avatar`;
    const headers = {
      authorization: TOKEN,
      'Content-Type': 'application/json'
    };
    const body = JSON.stringify({ avatar: avatarUrl });
    const response = await fetch(url, { method: 'PATCH', headers, body });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export { 
  getUserProfile, 
  getInitialCards, 
  updateUserProfile, 
  createNewCard, 
  removeCard, 
  addLikeToCard, 
  removeLikeFromCard, 
  updateProfileAvatar 
};
