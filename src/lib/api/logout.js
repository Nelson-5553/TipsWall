const API_HOST = import.meta.env.PUBLIC_API_HOST;

async function logout() {
  // Obtener el token desde la cookie
  const cookies = document.cookie;
  const token = cookies.match(/token=([^;]+)/)?.[1];

  if (!token) {
    alert('No se encontró token. Ya estás desconectado.');
    window.location.href = '/login';
    return;
  }

  try {
    const response = await fetch(`${API_HOST}api/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });

    if (response.ok) {
      // Borrar cookie del token
      document.cookie = 'token=; Path=/; Max-Age=0';
      alert('Sesión cerrada correctamente');
      window.location.href = '/login';
    } else {
      console.error('Error cerrando sesión');
      alert('Error cerrando sesión');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error al conectar con el servidor');
  }
}
document.getElementById('logoutButton').addEventListener('click', logout);