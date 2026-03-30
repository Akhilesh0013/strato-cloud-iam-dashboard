package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestHandleGetUsers_ReturnsJSON(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/api/users", nil)
	rec := httptest.NewRecorder()

	handleGetUsers(rec, req)

	if rec.Code != http.StatusOK {
		t.Errorf("expected 200, got %d", rec.Code)
	}

	contentType := rec.Header().Get("Content-Type")
	if contentType != "application/json" {
		t.Errorf("expected application/json, got %s", contentType)
	}

	var users []User
	if err := json.NewDecoder(rec.Body).Decode(&users); err != nil {
		t.Fatalf("could not decode response: %v", err)
	}

	if len(users) != 8 {
		t.Errorf("expected 8 users, got %d", len(users))
	}
}

func TestHandleGetUsers_MethodNotAllowed(t *testing.T) {
	req := httptest.NewRequest(http.MethodPost, "/api/users", nil)
	rec := httptest.NewRecorder()

	handleGetUsers(rec, req)

	if rec.Code != http.StatusMethodNotAllowed {
		t.Errorf("expected 405, got %d", rec.Code)
	}
}

func TestComputeDays_EmptyString(t *testing.T) {
	result := computeDays("")
	if result != -1 {
		t.Errorf("expected -1 for empty date, got %d", result)
	}
}

func TestComputeDays_ValidDate(t *testing.T) {
	result := computeDays("2020-01-01")
	if result <= 0 {
		t.Errorf("expected positive days for past date, got %d", result)
	}
}
