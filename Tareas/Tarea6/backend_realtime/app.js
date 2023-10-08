const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const Redis = require('ioredis'); // Importa la biblioteca ioredis
const cors = require('cors'); // Importa la biblioteca cors

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
      origin: '*', // Reemplaza con la URL de tu frontend
      methods: ['GET', 'POST'], // Métodos permitidos
    },
  });
  
const redis = new Redis(); // Crea una instancia de Redis

// Configura rutas de Express aquí...
// Configura CORS
app.use(cors());

io.on('connection', async (socket) => {
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
  

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Servidor Express en funcionamiento en el puerto ${PORT}`);
});
