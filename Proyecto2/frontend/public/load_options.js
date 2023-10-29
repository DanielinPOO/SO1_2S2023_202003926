/*document.addEventListener('DOMContentLoaded', () => {
    // Obtiene una referencia al elemento <select> en tu HTML por su id
    const selectElement = document.getElementById('maquinaSelect');
  
    // Realiza una solicitud GET a la API para obtener los valores únicos de maquina
    fetch(apiUrl + '/maquinas') // Asegúrate de utilizar la URL correcta
      .then((response) => {
        if (!response.ok) {
          throw new Error('No se pudo obtener la lista de máquinas');
        }
        return response.json();
      })
      .then((data) => {
        // Llena el <select> con los valores obtenidos de la API
        data.forEach((maquina) => {
          const option = document.createElement('option');
          option.textContent = maquina;
          selectElement.appendChild(option);
        });
      })
      .catch((error) => {
        console.error(error);
        // Puedes manejar el error de acuerdo a tus necesidades
      });
});*/
