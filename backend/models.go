package main

// This defines the data shapes and the day-computation logic

import (
	"time"
)

type RawUser struct {
	Name            string
	CreateDate      string
	PasswordChanged string
	LastAccess      string
	MFAEnabled      bool
}

// User is the one we send to the frontend ---> Includes computed day counts

type User struct {
	Name                    string `json:"name"`
	CreateDate              string `json:"createDate"`
	PasswordChangedDate     string `json:"passwordChangedDate"`
	DaysSincePasswordChange int    `json:"daysSincePasswordChange"`
	LastAccessDate          string `json:"lastAccessDate"`
	DaysSinceLastAccess     int    `json:"daysSinceLastAccess"`
	MFAEnabled              bool   `json:"mfaEnabled"`
	// Risk flags — computed here, used by React for highlighting
	StalePassword bool `json:"stalePassword"` // true if > 365 days
	InactiveUser  bool `json:"inactiveUser"`  // true if > 90 days
}

func computeDays(dateStr string) int {
	if dateStr == "" {
		return -1 // sentinel value meaning "no date available"
	}
	t, err := time.Parse("2006-01-02", dateStr)
	if err != nil {
		return -1
	}
	days := int(time.Since(t).Hours() / 24)
	return days
}

// buildUser converts a RawUser into a User with all computed fields
func buildUser(r RawUser) User {
	daysPwd := computeDays(r.PasswordChanged)
	daysAccess := computeDays(r.LastAccess)

	return User{
		Name:                    r.Name,
		CreateDate:              r.CreateDate,
		PasswordChangedDate:     r.PasswordChanged,
		DaysSincePasswordChange: daysPwd,
		LastAccessDate:          r.LastAccess,
		DaysSinceLastAccess:     daysAccess,
		MFAEnabled:              r.MFAEnabled,
		StalePassword:           daysPwd > 365,
		InactiveUser:            daysAccess > 90,
	}
}
