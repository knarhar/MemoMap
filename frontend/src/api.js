const API_URL = import.meta.env.VITE_API_URL;

const headers = {
  "Content-Type": "application/json",
};

export default async function getCard(id) {
  const url = id ? `${API_URL}/cards/?id=${id}` : `${API_URL}/cards`;

  const response = await fetch(url, { headers });
  
  if (!response.ok) {
    // throw new Error(`Request error: ${response.status}`);
    console.log(response.json());
  }
  
  return await response.json();
}
