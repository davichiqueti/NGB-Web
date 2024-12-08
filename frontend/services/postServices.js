'post server';

import { cookies } from "next/headers";

const BASE_URL = "http://localhost:8000/api/posts";

// Obtém todos os posts 
export async function getAllPosts() {
  const jwt = (await cookies()).get("jwt")?.value;

  const response = await fetch(`${BASE_URL}/all`, {
    method: "GET",
    headers: {
      Cookie: `jwt=${jwt}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Falha ao obter todos os posts");
  }

  return await response.json();
}

// Obtém posts dos usuários seguidos
export async function getFollowingPosts() {
  const jwt = (await cookies()).get("jwt")?.value;

  const response = await fetch(`${BASE_URL}/following`, {
    method: "GET",
    headers: {
      Cookie: `jwt=${jwt}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Falha ao obter posts dos usuários seguidos");
  }

  return await response.json();
}

// Cria um novo post
export async function createPost(postData) {
  const jwt = (await cookies()).get("jwt")?.value;

  const response = await fetch(`${BASE_URL}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `jwt=${jwt}`,
    },
    credentials: "include",
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Falha ao criar o post");
  }

  return await response.json();
}
