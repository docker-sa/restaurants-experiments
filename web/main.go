// Package main : a simple web app
package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
)

type Restaurant struct {
	ID      string `json:"id"`
	Name    string `json:"name"`
	Address string `json:"address"`
	Website string `json:"website"`
	Phone   string `json:"phone"`
	Tags    string `json:"tags"`
}

func main() {

	var apiServer = os.Getenv("API_URL")

	var httpPort = os.Getenv("HTTP_PORT")
	if httpPort == "" {
		httpPort = "8080"
	}

	log.Println("🚀 starting web server on port: " + httpPort)

	mux := http.NewServeMux()

	fileServerHtml := http.FileServer(http.Dir("public"))
	mux.Handle("/", fileServerHtml)

	mux.HandleFunc("/api/url", func(response http.ResponseWriter, request *http.Request) {

		variables := map[string]interface{}{
			"url": apiServer,
		}

		jsonString, err := json.Marshal(variables)

		if err != nil {
			response.WriteHeader(http.StatusNoContent)
		}

		response.Header().Set("Content-Type", "application/json; charset=utf-8")
		response.WriteHeader(http.StatusOK)
		response.Write(jsonString)
	})

	var errListening error
	log.Println("🌍 http server is listening on: " + httpPort)
	errListening = http.ListenAndServe(":"+httpPort, mux)

	log.Fatal(errListening)
}
