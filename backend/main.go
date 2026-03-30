package main

import (
	"fmt"
	"net/http"
)

func main() {
	// Register the single route, wrapped in CORS middleware
	http.HandleFunc("/api/users", corsMiddleware(handleGetUsers))

	port := ":8080"
	fmt.Println("Server running on http://localhost" + port)

	// Start the server — this blocks forever (until you Ctrl+C)
	if err := http.ListenAndServe(port, nil); err != nil {
		fmt.Println("Server failed:", err)
	}
}

