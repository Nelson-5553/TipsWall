const API_HOST = import.meta.env.PUBLIC_API_HOST;

const form = document.getElementById('loginForm');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
      name: navigator.userAgent,
    };

    try {
      const response = await fetch(`${API_HOST}api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include', // Esto le indica al navegador que envíe las cookies junto con la solicitud
      });

      const result = await response.json();

      if (response.ok) {
        document.cookie = `token=${result.token}; Path=/; Secure; SameSite=Strict`;
        alert('Login exitoso' + result.user.name);
      } else {
        alert(result.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error al hacer login:', error);
      alert('Error al conectar con el servidor');
    }
  });
}
