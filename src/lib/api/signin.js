const PUBLIC_API_HOST = import.meta.env.PUBLIC_API_HOST
;
document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const form = event.target;
    const formData = new FormData(form);
  
    // Datos que se enviarán al servidor
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    };
  
    try {
      const response = await fetch(`${PUBLIC_API_HOST}api/signin`, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors', // Explícitamente configurado como CORS
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data)
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert('Registrado exitosamente');
        window.location.href = '/login'; // Redirigir a la página de inicio de sesión
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error al enviar:', error);
      alert('Error al conectar con el servidor');
    }
  });