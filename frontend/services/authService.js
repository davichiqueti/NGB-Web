
export const login = async (username, password) => {
    // login process
    try {
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }
  
      return true; // Login successful
    } catch (error) {
      throw new Error(error.message || 'Failed to login');
    }
  };

  export const signup = async (formData) => {

    const { full_name, username, email, password } = formData
    // signup process
    try {
      const response = await fetch('http://localhost:8000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name, username, email, password }),
        credentials: 'include',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }

      return true;
    } catch (error) {
      throw new Error(error.message || 'Failed to signup');
    }
  }

  // Function to check if the user is authenticated
  export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return Boolean(token);
  };
  