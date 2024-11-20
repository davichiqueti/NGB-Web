
export async function getUserData(jwt) {
    const response = await fetch(`http://localhost:8000/api/auth/authcheck`, {
      method: 'GET',
      headers: {
        Cookie: `jwt=${jwt}`,
      },
    });
  
    if (!response.ok) {
      throw new Error('Falha ao obter os dados do usuário');
    }
  
    const data = await response.json();
    return data.user;
  }
  

export async function logoutUser() {
  const response = await fetch('/api/auth/logout', {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Falha ao fazer logout');
  }

  return response.json();
}


export async function updateUser(formData) {
  const response = await fetch('http://localhost:8000/api/users/update', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    try {
      const errorData = JSON.parse(errorText);
      throw new Error(errorData.error || 'Falha ao atualizar informações');
    } catch {
      console.error('Resposta não JSON recebida:', errorText);
      throw new Error('Falha ao atualizar informações');
    }
  }

  return response.json();
}
