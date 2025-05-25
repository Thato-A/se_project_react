const baseUrl = "http://localhost:3001";
const token = localStorage.getItem("jwt");

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return res.json().then((err) => {
      console.error("Error response:", err); // log the error message from the server
      return Promise.reject(
        `Error ${res.status}: ${err.message || "Unknown error"}`
      );
    });
  }
}

function request(url, options) {
  return fetch(url, options).then(handleServerResponse);
}

export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error; ${res.status}`);
};

function getItems() {
  return request(`${baseUrl}/items`);
}

function addItem({ itemName, imageUrl, weather, token }) {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ "item-name": itemName, imageUrl, weather }),
  });
}

function deleteItem(itemId, token) {
  return request(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

function addCardLike(itemId, token) {
  return request(`${baseUrl}/items/${itemId}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

function removeCardLike(itemId, token) {
  return request(`${baseUrl}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

function register({ email, password, name, avatar }) {
  return request(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name, avatar }),
  });
}

function login({ email, password }) {
  return request(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

function checkToken(token) {
  return request(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

function updateProfile({ name, avatar, token }) {
  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      avatar,
    }),
  });
}

export {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
  register,
  login,
  checkToken,
  updateProfile,
};
