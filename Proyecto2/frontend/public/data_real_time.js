// Función para cargar los datos y actualizar la tabla
ramChart = null;
cpuChart = null;
// Datos de ejemplo para las gráficas de barras (puedes reemplazarlos con tus datos reales)
var alumnosData = {
  labels: ["Alumno 1", "Alumno 2", "Alumno 3", "Alumno 4", "Alumno 5"],
  datasets: [{
    label: "Promedio",
    data: [85, 92, 78, 89, 94],
    backgroundColor: ["#FF5733", "#36A2EB", "#FF5733", "#36A2EB", "#FF5733"],
  }],
};

var cursosData = {
  labels: ["Curso 1", "Curso 2", "Curso 3", "Curso 4", "Curso 5"],
  datasets: [{
    label: "Cantidad de Alumnos",
    data: [45, 67, 32, 54, 76],
    backgroundColor: ["#FF5733", "#36A2EB", "#FF5733", "#36A2EB", "#FF5733"],
  }],
};

// Variables globales para llevar un registro de las instancias de gráficas
var alumnosChart;
var cursosChart;

// Configuración de las gráficas de barras
var chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
};

// Función para crear o actualizar las gráficas
function createOrUpdateBarChart(selector, data, chart) {
  if (chart) {
    chart.destroy();
  }

  chart = new Chart(document.getElementById(selector), {
    type: "bar",
    data: data,
    options: chartOptions,
  });

  return chart;
}

const semestreSelect2 = document.getElementById('semestreSelect2'); 
// Evento de cambio en el selector de semestre para la gráfica de Alumnos
document.getElementById("semestreSelect2").addEventListener("change", function () {
  const semestre = semestreSelect2.value;
  console.log("mando semestre:", semestre);
  // Realizar la solicitud Fetch al servidor
  fetch(apiUrl + '/alumnos_mejor_promedio', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ semestre }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Alumnos con mejor promedio:', data);
      // Luego, actualiza la gráfica llamando a la función
      newAlumnosData = {
        labels: [data[0].nombre, data[1].nombre, data[2].nombre, data[3].nombre, data[4].nombre],
        datasets: [{
          label: "Promedio",
          data: [data[0].promedio, data[1].promedio, data[2].promedio, data[3].promedio, data[4].promedio],
          backgroundColor: ["#3386ff", "#3386ff", "#3386ff", "#3386ff", "#3386ff"],
        }],
      };
      alumnosChart = createOrUpdateBarChart("alumnosChart", newAlumnosData, alumnosChart);
    })
    .catch((error) => {
      console.error('Error en la solicitud Fetch:', error);
    });

});

const semestreSelect3 = document.getElementById('semestreSelect3'); 
// Evento de cambio en el selector de semestre para la gráfica de Cursos
document.getElementById("semestreSelect3").addEventListener("change", function () {
  const semestre = semestreSelect3.value;
  console.log("mando semestre:", semestre);
  // Realizar la solicitud Fetch al servidor
  fetch(apiUrl + '/cursos_mayor_cantidad_alumnos', {
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
      newCursosData = {
        labels: [data[0].curso ? data[0].curso : "", data[1].curso ? data[1].curso : "", data[2].curso ? data[2].curso : "", data[3].curso ? data[3].curso : "", data[4].curso ? data[4].curso : ""],
        datasets: [{
          label: "Cantidad de Alumnos",
          data: [data[0].cantidad_alumnos ? data[0].cantidad_alumnos : 0, data[1].cantidad_alumnos ? data[1].cantidad_alumnos : 0, data[2].cantidad_alumnos ? data[2].cantidad_alumnos : 0, data[3].cantidad_alumnos ? data[3].cantidad_alumnos : 0, data[4].cantidad_alumnos ? data[4].cantidad_alumnos : 0],
          backgroundColor: ["#3386ff", "#3386ff", "#3386ff", "#3386ff", "#3386ff"],
        }],
      };
      cursosChart = createOrUpdateBarChart("cursosChart", newCursosData, cursosChart);
    })
    .catch((error) => {
      console.error('Error en la solicitud Fetch:', error);
    });
});

// Llama a la función para crear las gráficas iniciales
alumnosChart = createOrUpdateBarChart("alumnosChart", alumnosData, alumnosChart);
cursosChart = createOrUpdateBarChart("cursosChart", cursosData, cursosChart);

let porcentaje_aprobacion = 50;
let porcentaje_reprobacion = 50;

// Datos de ejemplo para la gráfica de pastel (puedes reemplazarlos con tus datos reales)
let aprobacionData = {
  labels: ["Aprobados", "Reprobados"],
  datasets: [{
    data: [porcentaje_aprobacion, porcentaje_reprobacion],
    backgroundColor: ["#36A2EB", "#FF5733"],
  }],
};

// Variable para llevar un registro de la instancia de la gráfica
var aprobacionChart;

// Función para crear o actualizar la gráfica de pastel
function createOrUpdatePieChart(selector, data) {
  console.log("en createOrUpdatePieChart", data);
  // Destruir la gráfica existente si ya está creada
  if (aprobacionChart) {
    aprobacionChart.destroy();
  }

  aprobacionChart = new Chart(document.getElementById(selector), {
    type: "doughnut",
    data: data,
    options: chartOptions,
  });
}

// Evento de cambio en el selector de curso o semestre
document.getElementById("cursoSelect").addEventListener("change", updatePieChart);
document.getElementById("semestreSelect").addEventListener("change", updatePieChart);

function updatePieChart(p1, p2) {
  // Aquí debes cargar los datos de aprobación y reprobación según el curso y semestre seleccionados
  console.log("en updatePieChart", p1, p2);
  // Luego, actualiza la gráfica llamando a la función
  var newData = {
    labels: ["Aprobados", "Reprobados"],
    datasets: [{
      data: [p1, p2],
      backgroundColor: ["#00ff5d", "#ff1300"],
    }],
  };
  createOrUpdatePieChart("aprobacionChart", newData);
}

// Llama a la función para crear la gráfica inicial
createOrUpdatePieChart("aprobacionChart", aprobacionData);


function loadAllStudents() {
  /*
  /// Obtén el valor seleccionado del select
const selectElement = document.getElementById('maquinaSelect');
const selectedValue = selectElement.value;
console.log("en tabla",selectedValue);


    // Define los datos que deseas enviar en el cuerpo de la solicitud POST
    const postData = {
      maquina: selectedValue
    };*/

  // Configura las opciones de la solicitud POST
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json' // Especifica que estás enviando datos JSON en el cuerpo de la solicitud
    }
    //body: JSON.stringify(postData) // Convierte los datos a formato JSON y colócalos en el cuerpo de la solicitud
  };

  // Obtener los datos de los módulos desde la API utilizando fetch
  console.log('Obteniendo datos de los módulos...');
  // Realiza la solicitud POST a tu API
  fetch(apiUrl + '/getAllRegisters', requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error al enviar los datos: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .then(students => {
      console.log('Todos los students registrados', students);
      // Obtener la tabla HTML
      const tabla = document.querySelector('table tbody');

      // Limpiar la tabla antes de llenarla con los nuevos datos
      tabla.innerHTML = '';

      // Iterar a través de la lista de procesos y llenar la tabla
      students.forEach(student => {
        const fila = tabla.insertRow();
        fila.insertCell(0).textContent = student.carnet;
        fila.insertCell(1).textContent = student.nombre;
        fila.insertCell(2).textContent = student.curso;
        fila.insertCell(3).textContent = student.nota;
        fila.insertCell(4).textContent = student.semestre;
        fila.insertCell(5).textContent = student.year;
      });
    })
    .catch(error => {
      console.error('Error al obtener los datos de los módulos:', error);
    });
}

function loadSelectCurso() {
  // Obtener una referencia al elemento <select> en tu HTML
  const selectCursos = document.getElementById('cursoSelect'); // Asegúrate de que el ID sea correcto

  // Realizar la solicitud Fetch a la API para obtener la lista de cursos
  fetch(apiUrl + '/cursos')
    .then((response) => response.json())
    .then((data) => {
      console.log('Lista de cursos:', data);
      // Limpiar cualquier opción existente en el <select>
      selectCursos.innerHTML = '';

      // Agregar las opciones al <select> basadas en los datos obtenidos de la API
      data.forEach((curso) => {
        const option = document.createElement('option');
        option.value = curso;
        option.textContent = curso;
        selectCursos.appendChild(option);
      });
    })
    .catch((error) => {
      console.error('Error al obtener la lista de cursos:', error);
    });

}

// Obtener una referencia a los elementos HTML select
const cursoSelect = document.getElementById('cursoSelect'); 
const semestreSelect = document.getElementById('semestreSelect'); 

// Función para manejar la solicitud
function realizarSolicitud() {
  const curso = cursoSelect.value;
  const semestre = semestreSelect.value;
  console.log("mando curso:", curso);
  console.log("mando semestre:", semestre);
  // Realizar la solicitud Fetch al servidor
  fetch(apiUrl + '/porcentaje_aprobacion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ curso, semestre }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Porcentajes de aprobación y reprobación:', data);
      updatePieChart(data.porcentajeAprobacion, data.porcentajeReprobacion);
    })
    .catch((error) => {
      console.error('Error en la solicitud Fetch:', error);
    });
}

// Evento para manejar la solicitud cuando cambie el valor del select de curso
cursoSelect.addEventListener('change', realizarSolicitud);

// Evento para manejar la solicitud cuando cambie el valor del select de semestre
semestreSelect.addEventListener('change', realizarSolicitud);

loadSelectCurso();
loadAllStudents(); // Cargar los datos inicialmente
/*
// Función para actualizar los datos cada 3 segundos
function updateDataPeriodically() {
  setInterval(loadData, 3000); // Actualizar cada 3 segundos
}
 
  
// Llamar a la función para actualizar datos automáticamente
updateDataPeriodically();*/

// Obtener el campo de búsqueda
const searchInput = document.getElementById('search-input');

// Agregar un evento de escucha al campo de búsqueda
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase(); // Obtener el término de búsqueda en minúsculas

  // Obtener la tabla HTML
  const tabla = document.querySelector('table tbody');
  // Obtener todas las filas de la tabla después de cada cambio en la entrada
  const filas = tabla.getElementsByTagName('tr');

  // Iterar a través de las filas de la tabla y mostrar/ocultar según el término de búsqueda
  for (let i = 0; i < filas.length; i++) {
    const fila = filas[i];
    const celdas = fila.getElementsByTagName('td');
    let found = false;

    for (let j = 0; j < celdas.length; j++) {
      const celda = celdas[j];
      const textoCelda = celda.textContent.toLowerCase();

      // Si alguna celda contiene el término de búsqueda, mostrar la fila
      if (textoCelda.includes(searchTerm)) {
        found = true;
        break;
      }
    }

    // Mostrar u ocultar la fila según si se encontró el término de búsqueda
    fila.style.display = found ? '' : 'none';
  }
});


