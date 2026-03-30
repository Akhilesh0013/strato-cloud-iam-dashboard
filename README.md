# IAM User Dashboard

A full-stack app I built using Go in the backend, React and Tailwind CSS for the front-end. It displays IAM user records with security metrics that are computed live on every request, things like days since last password change and days since last access, which need to stay current rather than being hardcoded.



---

## What it does

- Fetches user data from a Go API endpoint (`GET /api/users`)
- Computes "days since" values server-side on every request using `time.Since()` so the numbers are always accurate
- Highlights users who haven't changed their password in over a year or haven't logged in for 90+ days
- Lets you filter by MFA status and search by name
- Shows a summary header with counts for stale passwords, inactive users, and MFA disabled

---

## Tech stack

| Layer | Tech |
|---|---|
| Backend | Go 1.22, standard library only |
| Frontend | React 18, Vite, TailwindCSS |
| Testing | Go `net/http/httptest`, React Testing Library |

---

## Project structure

```
iam-user-dashboard/
├── backend/
│   ├── main.go            # starts the HTTP server on :8080
│   ├── handlers.go        # GET /api/users endpoint
│   ├── handlers_test.go   # unit tests
│   ├── models.go          # User structs + computeDays() + buildUser()
│   ├── data.go            # hardcoded user dataset
│   ├── middleware.go      # CORS middleware
│   └── go.mod
├── frontend/
│   ├── src/
│   │   ├── App.jsx               # root component, stats header, layout
│   │   ├── main.jsx              # React entry point
│   │   ├── index.css             # Tailwind directives
│   │   ├── hooks/
│   │   │   └── useUsers.js       # data fetching with loading/error state
│   │   └── components/
│   │       ├── UsersTable.jsx    # table with row highlighting
│   │       ├── Filters.jsx       # search bar + MFA filter buttons
│   │       └── StatusBadge.jsx   # MFA badge and risk tag chips
│   ├── vite.config.js            # API proxy config
│   └── package.json
└── README.md
```

---

## Running it locally

### Prerequisites

- Go 1.22 or higher — [download](https://go.dev/dl/)
- Node.js 18 or higher — [download](https://nodejs.org/)

### 1. Start the backend

```bash
cd backend
go run .
```

The API will be running at `http://localhost:8080`. You can verify it by opening `http://localhost:8080/api/users` in your browser — you should see a JSON array of users.

### 2. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## API

### `GET /api/users`

Returns all users with computed fields.

**Example response:**

```json
[
  {
    "name": "Foo Bar1",
    "createDate": "2020-10-01",
    "passwordChangedDate": "2021-10-01",
    "daysSincePasswordChange": 1641,
    "lastAccessDate": "2025-01-04",
    "daysSinceLastAccess": 449,
    "mfaEnabled": true,
    "stalePassword": true,
    "inactiveUser": true
  }
]
```

A `daysSince` value of `-1` means no date was recorded for that field (e.g. a user who has never logged in). The frontend renders this as a dash.

---

## Design decisions and tradeoffs
** `stalePassword` and `inactiveUser` flags on the API response?**
I could have had React check `daysSincePasswordChange > 365` itself, but that would spread the threshold logic across both the frontend and backend. Keeping it in `buildUser()` means if the thresholds ever change, there's only one place to update.

**CORS middleware vs Vite proxy**
During development the Vite proxy handles cross-origin requests, so the CORS middleware technically isn't needed. I kept it in anyway because if you ever serve the built frontend separately from the API (which is common in production), the middleware is already there.

**Sentinel value for missing dates**
`computeDays("")` returns `-1` instead of `0` to make it clear the distinction between "this user changed their password today" and "we have no record of this user ever changing their password."

---

## Running the tests

### Go

```bash
cd backend
go test -v ./...
```

Tests cover: handler returns 200 with valid JSON, handler rejects non-GET methods, `computeDays` with an empty string, `computeDays` with a valid past date.

### React

```bash
cd frontend
npm test
```

---

## Author

[Akhilesh0013](https://github.com/Akhilesh0013)
