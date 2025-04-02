const baseUrl = "http://localhost:3001";

function request(url, options) {
  return fetch(url, options).then(handleServerResponse);
}

export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error; ${res.status}`);
};

function getItems() {
  return request(`${baseUrl}/items`);
}

function addItem({ name, imageUrl, weather }) {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  });
}

function deleteItem(itemId) {
  return request(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
  });
}

export { getItems, addItem, deleteItem };
