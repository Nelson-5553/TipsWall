

const API_HOST = import.meta.env.PUBLIC_API_HOST;

const form = document.getElementById('loginForm');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
      name: navigator.userAgent
    };

    try {
      const response = await fetch(`${API_HOST}api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok && result.token) {
        localStorage.setItem('token', result.token);
        alert('Login exitoso');
      } else {
        alert(result.menssage || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error al hacer login:', error);
      alert('Error al conectar con el servidor');
    }
  });
}

