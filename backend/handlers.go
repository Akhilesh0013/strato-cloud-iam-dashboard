package main

import (
	"encoding/json"
	"net/http"
)

func handleGetUsers(w http.ResponseWriter, r *http.Request) {
	// Only allow GET
	if r.Method != http.MethodGet {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Build the computed user list from raw data
	users := make([]User, len(rawUsers))
	for i, raw := range rawUsers {
		users[i] = buildUser(raw)
	}

	// Tell the browser this is JSON
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	// Encode and write — if this fails there's nothing useful we can do
	if err := json.NewEncoder(w).Encode(users); err != nil {
		http.Error(w, "failed to encode response", http.StatusInternalServerError)
	}
}