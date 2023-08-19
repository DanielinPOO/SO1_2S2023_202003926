package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type Student struct {
	Carnet string `json:"carnet"`
	Name   string `json:"name"`
}

func main() {
	http.HandleFunc("/data", func(w http.ResponseWriter, r *http.Request) {
		// Supongamos que aquí obtenemos los datos del estudiante de alguna fuente (por ejemplo, una base de datos).
		// En este caso, solo simularemos los datos de un estudiante de ejemplo.
		student := Student{
			Carnet: "202003926",
			Name:   "Josue Daniel Minchez Velasquez",
		}

		// Convertimos los datos del estudiante a formato JSON
		jsonData, err := json.Marshal(student)
		if err != nil {
			http.Error(w, "Error al convertir los datos a JSON", http.StatusInternalServerError)
			return
		}

		// Establecemos las cabeceras de la respuesta HTTP
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)

		// Escribimos los datos del estudiante en el cuerpo de la respuesta
		w.Write(jsonData)
	})

	// Iniciamos el servidor en el puerto 8080
	fmt.Println("Servidor iniciado en http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}
