
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
  