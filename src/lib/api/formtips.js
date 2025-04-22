document.getElementById('crudForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const form = event.target;
    const formData = new FormData(form);
  
    // Datos que se enviarán al servidor
    const data = {
      title: formData.get('title'),
      description: formData.get('description'),
      game: formData.get('game'),
    };
  
    try {
      const apiUrl = import.meta.env.PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/crud`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      const responseMessage = document.getElementById('responseMessage');
      if (response.ok) {
        responseMessage.textContent = 'Comentario guardado con éxito';
  
        // Llama a la función para renderizar el nuevo comentario
        addCommentToDOM(result);
      } else {
        responseMessage.textContent = `Error: ${result.message}`;
      }
    } catch (error) {
      document.getElementById('responseMessage').textContent = `Error: ${error.message}`;
    }
  });