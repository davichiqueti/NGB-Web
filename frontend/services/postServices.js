const BASE_URL = '/api/posts';

// Obtém todos os posts
export const getAllPosts = async (token) => {
  const response = await fetch(`${BASE_URL}/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch all posts');
  return response.json();
};

// Obtém posts dos usuários seguidos 
export const getFollowingPosts = async (token) => {
  const response = await fetch(`${BASE_URL}/following`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch following posts');
  return response.json();
};