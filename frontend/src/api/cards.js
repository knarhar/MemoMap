import { API_URL, headers } from './api.js';


export async function getCard(id) {
  const url = id ? `${API_URL}/cards/?id=${id}` : `${API_URL}/cards`;

  const response = await fetch(url, { headers });

  if (!response.ok) {
    // throw new Error(`Request error: ${response.status}`);
    console.log(response.json());
  }

  return await response.json();
}

export async function deleteCard(id) {
  const url = `${API_URL}/cards/`;

  const response = await fetch(url, 
    {
      method: 'DELETE',
      headers: headers,
      body: JSON.stringify({ id }), // backend expects { id }
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Delete failed:', errorData);
    throw new Error(errorData.message || 'Failed to delete card');
  }

  return await response.json();
}

export async function updateCard(id) {
  const url = `${API_URL}/cards/`;

  const response = await fetch(url,
    {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify({ id })
    }
  )

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Update failed:', errorData);
    throw new Error(errorData.message || 'Failed to update card');
  }

  return await response.json();
}

export async function createCard(data) {
  const url = `${API_URL}/cards/`;

  const response = await fetch(url, 
    {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    }
  )

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Failed to create card:', errorData);
    throw new Error(errorData.message || 'Failed to create card');
  }

  return await response.json();
}