const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const socketIo = require('socket.io');
const Redis = require('ioredis'); // Importa la biblioteca ioredis
const cors = require('cors'); // Importa la biblioteca cors
const mysql = require('mysql');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
      origin: '*', // Reemplaza con la URL de tu frontend
      methods: ['GET', 'POST'], // Métodos permitidos
    },
  });
  
//const redis = new Redis(); // Crea una instancia de Redis

// Configura rutas de Express aquí...
// Configura CORS
app.use(cors());
// Configura body-parser
app.use(bodyParser.json());

/*io.on('connection', async (socket) => {
    console.log('Cliente conectado');
  
    // Función para consultar las claves en Redis y enviarlas al cliente
    const sendRedisKeys = async () => {
      try {
        // Consulta todas las claves en la base de datos 0
        const keys = await redis.keys('*');
        console.log('Claves de Redis:', keys);
        // Envía las claves al cliente a través del socket
        socket.emit('redis-keys', keys);
      } catch (error) {
        console.error('Error al consultar las claves de Redis:', error);
      }
    };
  
    // Llama a sendRedisKeys al conectar y luego cada 10 segundos
    sendRedisKeys(); // Llama a la función al conectar
  
    const redisUpdateInterval = setInterval(() => {
      sendRedisKeys(); // Llama a la función cada 10 segundos
    }, 10000); // 10 segundos en milisegundos
  
    // Maneja eventos de Socket.IO aquí...
  
    socket.on('disconnect', () => {
      console.log('Cliente desconectado');
      clearInterval(redisUpdateInterval); // Detiene la actualización cuando el cliente se desconecta
    });
  });
*/

// Ruta para consultar el valor de una clave en Redis y devolverlo como JSON
app.get('/api/redis-value', async (req, res) => {
    const key = req.query.key; // Obtiene la clave desde la consulta
  
    try {
      // Consulta el valor correspondiente a la clave en Redis
      const value = await redis.get(key);
  
      if (value === null) {
        res.status(404).json({ error: 'Clave no encontrada en Redis' });
      } else {
        try {
          // Intenta analizar el valor como JSON
          const parsedValue = JSON.parse(value);
          res.json(parsedValue);
        } catch (jsonError) {
          res.status(500).json({ error: 'Valor no es JSON válido en Redis' });
        }
      }
    } catch (error) {
      console.error(`Error al consultar el valor de la clave ${key} en Redis:`, error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  
  
  // Configuración de la conexión a la base de datos
  const connection = mysql.createConnection({
    host: 'aqui va la ip de la base de datos',
    user: 'root',
    password: 'aqui va la contraseña',
    database: 'proyecto2',
  });
  
  // Establecer la conexión
  connection.connect((err) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err);
    } else {
      console.log('Conexión a la base de datos MySQL establecida');
      // Puedes realizar consultas o ejecutar otras operaciones aquí
    }
  });
  

  app.get('/api/getAllRegisters', async (req, res) => {
    try {
      // Realizar la consulta a la base de datos
      const query = 'SELECT * FROM calificacion'; // Modifica esto según tus necesidades
  
      connection.query(query, (error, results) => {
        if (error) {
          // Si hay un error en la consulta, lanzar una excepción
          throw error;
        }
  
        // Enviar los resultados de la consulta al cliente
        res.json(results);
      });
    } catch (error) {
      // Manejo de errores
      console.error('Error en la consulta a la base de datos:', error);
      res.status(500).json({ error: 'Error en la consulta a la base de datos' });
    }
  });

  app.get('/api/cursos', (req, res) => {
    const sql = 'SELECT DISTINCT curso FROM calificacion';
  
    connection.query(sql, (err, result) => {
      if (err) {
        console.error('Error al ejecutar la consulta:', err);
        res.status(500).json({ error: 'Error al obtener valores únicos de calificacion' });
      } else {
        const cursos = result.map((row) => row.curso);
        res.json(cursos);
      }
    });
  });

  app.post('/api/porcentaje_aprobacion', (req, res) => {
    const { curso, semestre } = req.body;
    console.log('Curso:', curso);
    console.log('Semestre:', semestre);
    // Consulta SQL para obtener todas las notas de un curso y semestre
    const sql = `SELECT nota FROM calificacion WHERE curso = ? AND semestre = ?`;
  
    connection.query(sql, [curso, semestre], (err, result) => {
      if (err) {
        console.error('Error al ejecutar la consulta:', err);
        res.status(500).json({ error: 'Error al obtener las notas' });
      } else {
        // Obtener todas las notas como una matriz de resultados
        const notas = result.map((row) => row.nota);
        console.log('Notas:', notas);
        // Realizar la conversión y lógica en JavaScript
        const aprobados = notas.filter(nota => parseInt(nota, 10) >= 60).length;
        const reprobados = notas.filter(nota => parseInt(nota, 10) < 60).length;
  
        // Calcular los porcentajes
        const totalEstudiantes = aprobados + reprobados;
        const porcentajeAprobacion = (aprobados / totalEstudiantes) * 100;
        const porcentajeReprobacion = (reprobados / totalEstudiantes) * 100;
  
        res.json({ porcentajeAprobacion, porcentajeReprobacion });
      }
    });
  });
  
  app.post('/api/alumnos_mejor_promedio', (req, res) => {
    // Obtener el semestre de la solicitud
    const { semestre } = req.body;
  
    // Consulta SQL para obtener el nombre y la nota de los estudiantes para un semestre específico
    const sql = `
      SELECT nombre, nota
      FROM calificacion
      WHERE semestre = ?
    `;
  
    connection.query(sql, [semestre], (err, result) => {
      if (err) {
        console.error('Error al ejecutar la consulta:', err);
        res.status(500).json({ error: 'Error al obtener los datos de calificación' });
      } else {
        // Obtén los datos de calificación (nombre y nota) para el semestre
  
        // Realiza el cálculo de promedio para cada estudiante
        const promedios = {};
  
        result.forEach((row) => {
          const nombre = row.nombre;
          const nota = parseInt(row.nota, 10);
  
          if (!promedios[nombre]) {
            promedios[nombre] = { total: 0, count: 0 };
          }
  
          promedios[nombre].total += nota;
          promedios[nombre].count++;
        });
  
        // Calcula los promedios de los estudiantes
        const promediosArray = [];
  
        for (const nombre in promedios) {
          if (promedios.hasOwnProperty(nombre)) {
            const promedio = promedios[nombre].total / promedios[nombre].count;
            promediosArray.push({ nombre, promedio });
          }
        }
  
        // Ordena los promedios en orden descendente y toma los mejores 5
        const mejoresPromedios = promediosArray.sort((a, b) => b.promedio - a.promedio).slice(0, 5);
        
        while (mejoresPromedios.length < 5) {
          mejoresPromedios.push({ nombre: 'Relleno', promedio: 0 });
        }
        res.json(mejoresPromedios);
      }
    });
  });

  app.post('/api/cursos_mayor_cantidad_alumnos', (req, res) => {
    // Obtener el semestre de la solicitud
    const { semestre } = req.body;
  
    // Consulta SQL para obtener los cursos con la mayor cantidad de alumnos en el semestre
    const sql = `
      SELECT curso, COUNT(*) AS cantidad_alumnos
      FROM calificacion
      WHERE semestre = ?
      GROUP BY curso
      ORDER BY cantidad_alumnos DESC
      LIMIT 5
    `;
  
    connection.query(sql, [semestre], (err, result) => {
      if (err) {
        console.error('Error al ejecutar la consulta:', err);
        res.status(500).json({ error: 'Error al obtener los cursos con mayor cantidad de alumnos' });
      } else {
        // Obtén los 5 cursos con la mayor cantidad de alumnos
        const cursos = result;
  
        // Si hay menos de 5 cursos en el resultado, agrega cursos adicionales
        while (cursos.length < 5) {
          cursos.push({ curso: 'Relleno', cantidad_alumnos: 0 });
        }
  
        res.json(cursos);
      }
    });
  });
  
  

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Servidor Express en funcionamiento en el puerto ${PORT}`);
});
