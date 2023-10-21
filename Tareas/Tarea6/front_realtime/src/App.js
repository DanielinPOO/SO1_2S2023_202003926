import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001/'); // Reemplaza con la URL de tu servidor

function App() {
  const [data, setData] = useState([]); // Estado para almacenar los datos recibidos

  useEffect(() => {
    // Maneja la lógica de Socket.IO aquí...
    socket.on('redis-keys', (keys) => {
      console.log('Claves de Redis recibidas:', keys);
      // Cuando se reciben las claves, consulta los datos para cada clave
      const fetchData = async () => {
        const newData = [];
        for (const key of keys) {
          try {
            console.log(`Consultando datos para la clave ${key}...`);
            // Realiza una solicitud al servidor para obtener el valor de la clave
            const response = await fetch(`http://localhost:3001/api/redis-value?key=${key}`);
            console.log(`Datos obtenidos para la clave ${key}`, response);  
            const jsonData = await response.json();

            // Agrega los datos al arreglo newData
            newData.push(jsonData);
          } catch (error) {
            console.error(`Error al obtener datos para la clave ${key}:`, error);
          }
        }
        setData(newData); // Actualiza el estado con los datos obtenidos
      };

      fetchData();
    });

    return () => {
      // Desconecta el socket cuando el componente se desmonta (opcional)
      socket.disconnect();
    };
  }, []);

  return (
    <div className="App">
      <h1>Tabla de Datos de Redis</h1>
      <table>
        <thead>
          <tr>
            <th>Álbum</th>
            <th>Artista</th>
            <th>Año</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.album}</td>
              <td>{item.artist}</td>
              <td>{item.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
