package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/go-redis/redis/v8"
	"github.com/rs/cors"
)

var rdb *redis.Client // Creamos el Redis CLient

// Creamos la Estructura del JSON
type Album struct {
	Album  string `json:"album"`
	Artist string `json:"artist"`
	Year   string `json:"year"`
}

func main() {
	// Configurar la Conexion de Redis
	rdb = redis.NewClient(&redis.Options{
		Addr:     "localhost:6379", // Host de la base de Redis
		Password: "",               // contraseña Redis (Si tiene)
		DB:       0,                // Numero de la DB
	})

	// Integramos CORS
	c := cors.Default()
	corsHandler := c.Handler

	// Contador
	counter := 0

	// Ruta
	http.HandleFunc("/albumes/Add", func(w http.ResponseWriter, r *http.Request) {
		// Decodificar JSON
		decoder := json.NewDecoder(r.Body)
		var album Album
		err := decoder.Decode(&album)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		// Creamos una variable contador, si existe se toma el valor
		counter = int(rdb.Incr(context.Background(), "contador_albumes").Val())

		// Insertamos a Redis
		key := fmt.Sprintf("Album%d", counter)
		albumJson, err := json.Marshal(album)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		err = rdb.Set(context.Background(), key, albumJson, 0).Err()
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		fmt.Println("Album Registrado en Redis: ", album)
		fmt.Fprintf(w, "Se ha Registrado el album en Redis! (%d albums registradas)", counter)
	})

	// Start the HTTP server with CORS
	fmt.Println("Iniciando en el puerto 3300")
	err := http.ListenAndServe(":3300", corsHandler(http.DefaultServeMux))
	if err != nil {
		log.Fatal("Error starting the HTTP server:", err)
	}
}
