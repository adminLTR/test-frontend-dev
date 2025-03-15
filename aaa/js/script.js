const API_URL = "https://test-frontend-dev.onrender.com";

document.getElementById('login-form').addEventListener('submit', async function (event) {
    event.preventDefault(); 
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
  
    try {
      const response = await fetch(API_URL + "/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
  
      if (!response.ok) {
        throw new Error('Usuario o contraseña incorrectos');
      }
  
      const data = await response.json();
      const jwt = data.token;
  
      localStorage.setItem('jwt', jwt);
  
      alert('Inicio de sesión exitoso');
      window.location.href = '/dashboard.html'; 
  
    } catch (error) {
      console.error(error);
      errorMessage.textContent = error.message;
    }
});
  