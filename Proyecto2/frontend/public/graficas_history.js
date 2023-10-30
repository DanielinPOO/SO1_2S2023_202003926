// Datos de ejemplo para la gráfica de barras
var alumnosData = {
  labels: ["Curso 1", "Curso 2", "Curso 3", "Curso 4", "Curso 5"],
  datasets: [{
    label: "Cantidad de Alumnos",
    data: [45, 67, 32, 54, 76], // Cantidad de alumnos en cada curso (valores de ejemplo)
    backgroundColor: ["#36A2EB", "#FF5733", "#36A2EB", "#FF5733", "#36A2EB"], // Colores de las barras
  }],
};

// Configuración de la gráfica de barras
var chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
};

var alumnosChart; // Variable para almacenar la instancia de la gráfica

// Función para crear o actualizar la gráfica de barras
function createOrUpdateBarChart(data) {
  if (alumnosChart) {
    alumnosChart.data = data;
    alumnosChart.update(); // Actualiza la gráfica existente con los nuevos datos
  } else {
    // Si la gráfica no existe, crea una nueva gráfica
    alumnosChart = new Chart(document.getElementById("alumnosChart"), {
      type: "bar",
      data: data,
      options: chartOptions,
    });
  }
}

// Evento de cambio en el selector de semestre
document.getElementById("semestreSelect").addEventListener("change", function () {
  // Obtén el valor seleccionado del selector de semestre
  var semestre = this.value;
  
});

// Llama a la función para crear la gráfica inicial
createOrUpdateBarChart(alumnosData);
const semestreSelect = document.getElementById('semestreSelect'); 
// Función para consultar la API y actualizar la gráfica
function consultarGrafica() {
  let semestre = semestreSelect.value;
  console.log("mando semestre:", semestre);
  // Realizar la solicitud Fetch al servidor
  fetch('http://localhost:3300/alumnos-en-semestre', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ semestre }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Cantidad de alumnos:', data);
      // Luego, actualiza la gráfica llamando a la función
      var newCursosData = {
        labels: [data[0].curso ? data[0].curso : "", data[1].curso ? data[1].curso : "", data[2].curso ? data[2].curso : "", data[3].curso ? data[3].curso : "", data[4].curso ? data[4].curso : ""],
        datasets: [{
          label: "Cantidad de Alumnos",
          data: [data[0].cantidad_alumnos ? data[0].cantidad_alumnos : 0, data[1].cantidad_alumnos ? data[1].cantidad_alumnos : 0, data[2].cantidad_alumnos ? data[2].cantidad_alumnos : 0, data[3].cantidad_alumnos ? data[3].cantidad_alumnos : 0, data[4].cantidad_alumnos ? data[4].cantidad_alumnos : 0],
          backgroundColor: ["#3386ff", "#3386ff", "#3386ff", "#3386ff", "#3386ff"],
        }],
      };
      createOrUpdateBarChart(newCursosData);
    })
    .catch((error) => {
      console.error('Error en la solicitud Fetch:', error);
    });
  }

function consultarAPI() {
  fetch('http://localhost:3300/count-redis')
    .then((response) => response.json())
    .then((data) => {
      // Hacer algo con los datos recibidos, como actualizar una gráfica
     // Obtén la etiqueta <label> por su id
    const cantidadLabel = document.getElementById('cantidad');

    // Actualiza el contenido de la etiqueta con el nuevo valor
    cantidadLabel.textContent = "Cantidad de registros: " + (data.total_registros_redis - 1).toString();

    })
    .catch((error) => {
      console.error('Error al consultar la API:', error);
    });
}

// Llamar a consultarAPI cada segundo (1000 milisegundos)
setInterval(consultarAPI, 1000);
setInterval(consultarGrafica, 1000);
