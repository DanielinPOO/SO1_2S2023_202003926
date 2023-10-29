ramLineChart = null;
cpuLineChart = null;

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
  var selectedSemester = this.value;

  // Aquí debes cargar los datos de cantidad de alumnos en los cursos para el semestre seleccionado
  // Puedes hacer una petición AJAX para obtener los datos y luego actualizar la gráfica

  // Luego, actualiza la gráfica llamando a la función
  createOrUpdateBarChart(alumnosData);
});

// Llama a la función para crear la gráfica inicial
createOrUpdateBarChart(alumnosData);


  function loadGraphHistory(){
// Obtener los datos de los módulos desde la API utilizando fetch
// Obtén el valor seleccionado del select
const selectElement = document.getElementById('maquinaSelect');
const selectedValue = selectElement.value;
console.log("en historia",selectedValue);

 // Define los datos que deseas enviar en el cuerpo de la solicitud POST
 const postData = {
   maquina: selectedValue
 };

 // Configura las opciones de la solicitud POST
 const requestOptions = {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json' // Especifica que estás enviando datos JSON en el cuerpo de la solicitud
   },
   body: JSON.stringify(postData) // Convierte los datos a formato JSON y colócalos en el cuerpo de la solicitud
 };

console.log('Obteniendo datos de los módulos...');
fetch(apiUrl + '/modulos_history', requestOptions)
.then(response => {
  if (!response.ok) {
    throw new Error(`Error al enviar los datos: ${response.status} - ${response.statusText}`);
  }
  return response.json();
})
.then(data => {
    console.log('Datos de los módulos para gráficas:', data);

    // Obtener las últimas 10 entradas de la API
    const ultimosDatos = data;

    // Calcular el porcentaje de uso de la RAM y CPU en cada registro
    const porcentajesUsoRAM = [];
    const porcentajesDesusoRAM = [];
    const porcentajesUsoCPU = [];
    const porcentajesDesusoCPU = [];

    ultimosDatos.forEach(registro => {
      const moduloCPU = registro.modulo_cpu;
      const moduloRAM = registro.modulo_ram;

      //const moduloCPUParsed = JSON.parse(moduloCPU);
      //const moduloRAMParsed = JSON.parse(moduloRAM);
      const moduloCPUParsed = moduloCPU;
      const moduloRAMParsed = moduloRAM;

      const porcentajeUsoRAM = (moduloRAMParsed.ram_en_uso / moduloRAMParsed.total_ram) * 100;
      const porcentajeDesusoRAM = 100 - porcentajeUsoRAM;
      porcentajesUsoRAM.push(porcentajeUsoRAM);
      porcentajesDesusoRAM.push(porcentajeDesusoRAM);

      const porcentajeUsoCPU = (moduloCPUParsed.cpu_porcentaje / moduloCPUParsed.cpu_total) * 100;
      const porcentajeDesusoCPU = 100 - porcentajeUsoCPU;
      porcentajesUsoCPU.push(porcentajeUsoCPU);
      porcentajesDesusoCPU.push(porcentajeDesusoCPU);
    });

    console.log('Porcentajes de uso de RAM:', porcentajesUsoRAM);
    console.log('Porcentajes de desuso de RAM:', porcentajesDesusoRAM);
    console.log('Porcentajes de uso de CPU:', porcentajesUsoCPU);
    console.log('Porcentajes de desuso de CPU:', porcentajesDesusoCPU);


    // Crear un array de números de registro para las etiquetas en el eje X
    const numerosDeRegistro = ultimosDatos.map((registro, index) => index + 1);

    // Configuración de la gráfica de línea para RAM
    const ramChartData = {
      labels: numerosDeRegistro, 
      datasets: [
        {
          label: 'Porcentaje de Uso de RAM',
          data: porcentajesUsoRAM,
          fill: false,
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
        },
        {
          label: 'Porcentaje de Desuso de RAM',
          data: porcentajesDesusoRAM,
          fill: false,
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2,
        },
      ],
    };

    // Configuración de opciones de la gráfica de línea para RAM
    const ramChartOptions = {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        y: {
          beginAtZero: true, // Comenzar desde 0 en el eje Y
          stepSize: 10, // Incremento específico (10 en 10 para RAM)
        },
      },
    };

    // Crear la gráfica de línea de RAM en el elemento con el id "line-chart-ram"
  if (ramLineChart) {
    ramLineChart.destroy(); // Destruir la gráfica existente si existe
  }
  ramLineChart = new Chart(document.getElementById('line-chart-ram'), {
    type: 'line',
    data: ramChartData,
    options: ramChartOptions,
  });
    // Configuración de la gráfica de línea para CPU
    const cpuChartData = {
      labels: numerosDeRegistro, 
      datasets: [
        {
          label: 'Porcentaje de Uso de CPU',
          data: porcentajesUsoCPU,
          fill: false,
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
        },
        {
          label: 'Porcentaje de Desuso de CPU',
          data: porcentajesDesusoCPU,
          fill: false,
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2,
        },
      ],
    };

    // Configuración de opciones de la gráfica de línea para CPU
    const cpuChartOptions = {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        y: {
          beginAtZero: true, // Comenzar desde 0 en el eje Y
          stepSize: 10, // Incremento específico (10 en 10 para RAM)
        },
      },
    };

    // Crear la gráfica de línea de CPU en el elemento con el id "line-chart-cpu"
    if (cpuLineChart) {
      cpuLineChart.destroy(); // Destruir la gráfica existente si existe
    }
    cpuLineChart = new Chart(document.getElementById('line-chart-cpu'), {
      type: 'line',
      data: cpuChartData,
      options: cpuChartOptions,
    });
  })
  .catch(error => {
    console.error('Error al obtener los datos de los módulos:', error);
  });

    }
    
    // Función para actualizar los datos cada 3 segundos
    function updateDataPeriodicallyGraphHistory() {
      loadGraphHistory(); // Cargar los datos inicialmente
      setInterval(loadGraphHistory, 3000); // Actualizar cada 3 segundos
    }
    
    // Llamar a la función para actualizar datos automáticamente
    updateDataPeriodicallyGraphHistory();