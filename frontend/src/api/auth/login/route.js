export async function POST(req) {
    const { email, password } = await req.json();
  
    // Verificar credenciais no banco de dados
    if (email === 'test@example.com' && password === '1234') {
      return new Response(JSON.stringify({ message: 'Login successful', token: 'jwt-token' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  
    return new Response(JSON.stringify({ message: 'Invalid credentials' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  