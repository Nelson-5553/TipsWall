const PUBLIC_API_HOST = import.meta.env.PUBLIC_API_HOST
;
document.getElementById('TipForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const form = event.target;
    const formData = new FormData(form);
  
    // Datos que se enviarán al servidor
    const data = {
      title: formData.get('post_name'),
      content: formData.get('content'),
      category_id: formData.get('category_id'),
    };
  
    try {
      const response = await fetch(`${PUBLIC_API_HOST}api/posts`, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors', // Explícitamente configurado como CORS
        headers: {
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + document.cookie.split('token=')[1].split(';')[0], // Obtener el token de la cookie
          'Accept': 'application/json',
        },
        body: JSON.stringify(data)
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert('Guardado exitosamente');
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error al enviar:', error);
      alert('Error al conectar con el servidor');
    }
  });